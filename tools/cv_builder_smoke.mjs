import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765/';
for(const [engine,launcher] of Object.entries({chromium,webkit})){
 const browser=await launcher.launch({headless:true});
 try{for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900},acceptDownloads:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [lang,path] of [['es','es/'],['en',''],['de','de/']]){
  await page.goto(base+path,{waitUntil:'domcontentloaded'});await page.locator('#cv-download-pdf').waitFor({state:'attached'});await page.locator('#home-cv').waitFor({state:'attached'});assert.equal(await page.locator('#home-cv').getAttribute('open'),null);
  assert.equal(await page.locator('#cv-builder').count(),1);assert.equal(await page.locator('#cv-language').inputValue(),lang);
  assert.equal(await page.locator('#cv-builder [data-skill-id]:checked').count(),8);assert.equal(await page.locator('#cv-download-pdf').isEnabled(),true);
  assert.equal(await page.locator('#cv-advanced').getAttribute('open'),null);assert.equal(await page.locator('#cv-extra').getAttribute('open'),null);
  await page.locator('.opening-actions a[href="#cv-builder"]').click();await page.locator('#cv-builder').scrollIntoViewIfNeeded();
  const bounds=await page.locator('#cv-builder').boundingBox();assert(bounds&&bounds.x>=-1&&bounds.x+bounds.width<=width+1);
  await page.locator('#cv-role').selectOption('pharma');assert.equal(await page.locator('[data-skill-id="microbial-environmental-sampling"]').isChecked(),true);
  await page.locator('#cv-all').check();assert.equal(await page.locator('#cv-skill-list [data-skill-id]').count(),81);
  await page.locator('#cv-skill-search').fill('PCR');assert(await page.locator('#cv-skill-list [data-skill-id]').count()<81);await page.locator('#cv-skill-search').fill('');
  if(lang==='es'){
   await page.locator('#cv-advanced>summary').click();await page.locator('#cv-offer').fill('RODAC UFC autoclave SOP GMP LAL');
   await page.locator('#cv-second-offer').evaluate(n=>n.closest('details').open=true);await page.locator('#cv-second-offer').fill('PCR ELISA PBMC');await page.locator('#cv-analyse').click();
   assert.match(await page.locator('#cv-analysis-results').innerText(),/GMP/);assert.match(await page.locator('#cv-analysis-results').innerText(),/LAL/);
   await page.locator('#cv-use-suggestions').click();assert.match(await page.locator('#cv-summary').innerText(),/Recuento microbiol/);
   await page.locator('#cv-language').selectOption('en');assert.equal(await page.locator('html').getAttribute('lang'),'es');assert.equal(await page.locator('#cv-builder').getAttribute('lang'),'en');assert.match(await page.locator('#cv-summary').innerText(),/Microbial enumeration/);
   await page.locator('#cv-pdf-preview>summary').click();await page.waitForFunction(()=>document.querySelector('#cv-pdf-frame')?.getAttribute('data')?.startsWith('blob:'));await page.locator('#cv-pdf-preview>summary').click();
   const pending=page.waitForEvent('download');await page.locator('#cv-download-pdf').click();const dl=await pending;assert.equal((await readFile(await dl.path())).subarray(0,8).toString(),'%PDF-1.4');
   await page.locator('#cv-extra>summary').click();assert.equal(await page.locator('#cv-personal-mode,#cv-contact-input').count(),0);
   const z=page.waitForEvent('download');await page.locator('#cv-download-zip').click();assert.equal((await readFile(await (await z).path())).subarray(0,2).toString(),'PK');
   assert.equal(await page.locator('#cv-offer').getAttribute('spellcheck'),'false');assert.equal(await page.locator('#cv-offer').getAttribute('autocomplete'),'off');
   await page.locator('#cv-second-offer').fill('Haematology');assert.equal(await page.locator('#cv-use-suggestions').count(),0);
   await page.locator('#cv-analyse').click();assert.equal(await page.locator('#cv-use-suggestions').count(),1);
   await page.locator('#cv-offer').fill('PCR');assert.equal(await page.locator('#cv-use-suggestions').count(),0);
   await page.locator('#cv-analyse').click();await page.locator('#cv-clear-offers').click();assert.equal(await page.locator('#cv-offer').inputValue(),'');assert.equal(await page.locator('#cv-second-offer').inputValue(),'');assert.equal(await page.locator('#cv-use-suggestions').count(),0);
  }
  await page.locator('#cv-builder').screenshot({path:'test-output/'+engine+'-'+width+'-'+lang+'-inline-cv-builder.png'});assert.deepEqual(errors,[]);
 }
 await page.goto(base+'cv-builder/?lang=es');await page.locator('#cv-download-pdf').waitFor();assert.equal(await page.locator('#cv-language').inputValue(),'es');assert.equal(await page.locator('#cv-personal-mode,#cv-contact-input').count(),0);assert.equal(await page.locator('#cv-builder [data-skill-id]:checked').count(),8);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);assert.deepEqual(errors,[]);await page.close();
 }}finally{await browser.close();}
}
