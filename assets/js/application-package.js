/* Build an uncompressed ZIP from selected, same-origin public PDFs. No uploads. */
(() => {
    'use strict';
    const table=Uint32Array.from({length:256},(_,n)=>{let c=n;for(let j=0;j<8;j++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);return c>>>0;});
    const crc=bytes=>{let c=0xffffffff;for(const b of bytes)c=table[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
    const put=(v,o,n,s)=>s===2?v.setUint16(o,n,true):v.setUint32(o,n,true);
    function zip(files){
        const encoder=new TextEncoder(),parts=[],central=[];let offset=0,centralSize=0;
        for(const file of files){
            const name=encoder.encode(file.name),bytes=file.bytes,sum=crc(bytes);
            const h=new Uint8Array(30+name.length),v=new DataView(h.buffer);
            put(v,0,0x04034b50,4);put(v,4,20,2);put(v,6,0x800,2);put(v,12,33,2);put(v,14,sum,4);put(v,18,bytes.length,4);put(v,22,bytes.length,4);put(v,26,name.length,2);h.set(name,30);
            const c=new Uint8Array(46+name.length),w=new DataView(c.buffer);
            put(w,0,0x02014b50,4);put(w,4,20,2);put(w,6,20,2);put(w,8,0x800,2);put(w,14,33,2);put(w,16,sum,4);put(w,20,bytes.length,4);put(w,24,bytes.length,4);put(w,28,name.length,2);put(w,42,offset,4);c.set(name,46);
            parts.push(h,bytes);central.push(c);offset+=h.length+bytes.length;centralSize+=c.length;
        }
        const end=new Uint8Array(22),z=new DataView(end.buffer);put(z,0,0x06054b50,4);put(z,8,files.length,2);put(z,10,files.length,2);put(z,12,centralSize,4);put(z,16,offset,4);
        return new Blob([...parts,...central,end],{type:"application/zip"});
    }
    for(const panel of document.querySelectorAll('[data-application-package]')){
        const button=panel.querySelector('[data-package-download]'),status=panel.querySelector('[data-package-status]');
        button.hidden=false;
        button.addEventListener('click',async()=>{
            const items=[...panel.querySelectorAll('input[type=checkbox]:checked')];
            if(!items.length){status.textContent=panel.dataset.none;return;}
            button.disabled=true;status.textContent=panel.dataset.loading;
            try{
                const files=await Promise.all(items.map(async item=>{
                    const url=new URL(item.value,document.baseURI);
                    if(url.origin!==location.origin||!url.pathname.includes('/assets/documents/')||!url.pathname.endsWith('.pdf'))throw Error('Invalid document');
                    const response=await fetch(url);if(!response.ok)throw Error('Download failed');
                    const bytes=new Uint8Array(await response.arrayBuffer());
                    if(bytes.length<5||String.fromCharCode(...bytes.slice(0,5))!=='%PDF-')throw Error('Invalid PDF');
                    return {name:url.pathname.split('/').pop(),bytes};
                }));
                const href=URL.createObjectURL(zip(files)),a=document.createElement('a');
                a.href=href;a.download='JMC-application-'+document.documentElement.lang+'.zip';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),1000);status.textContent='';
            }catch(error){console.warn('[APPLICATION PACKAGE]',error);status.textContent=panel.dataset.error;}
            finally{button.disabled=false;}
        });
    }
})();
