import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {chromium,webkit} from 'playwright';
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765/';
for(const [engine,launcher] of Object.entries({chromium,webkit})){
 const browser=await launcher.launch({headless:true});
 try{for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:900},acceptDownloads:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'cv-builder/?lang=es');await page.locator('#offer').waitFor();
 await page.locator('#offer').fill('RODAC UFC autoclave SOP GMP LAL');await page.locator('#second-offer').evaluate(n=>n.closest('details').open=true);await page.locator('#second-offer').fill('PCR ELISA PBMC');await page.locator('#analyse').click();assert.match(await page.locator('#analysis-results').innerText(),/GMP/);assert.match(await page.locator('#analysis-results').innerText(),/LAL/);
 await page.locator('#use-suggestions').click();assert.match(await page.locator('#content-preview').innerText(),/Recuento microbiol/);
 await page.locator('#language').selectOption('en');assert.equal(await page.locator('html').getAttribute('lang'),'en');assert.match(await page.locator('#content-preview').innerText(),/Microbial enumeration/);
 const pending=page.waitForEvent('download');await page.locator('#download-pdf').click();const dl=await pending;assert.equal((await readFile(await dl.path())).subarray(0,8).toString(),'%PDF-1.4');
 await page.locator('#personal-mode').check();await page.locator('#contact-input').fill('test@example.invalid');assert.match(await page.locator('#content-preview').innerText(),/test@example.invalid/);await page.locator('#personal-mode').uncheck();assert.doesNotMatch(await page.locator('#content-preview').innerText(),/test@example.invalid/);
 const z=page.waitForEvent('download');await page.locator('#download-zip').click();assert.equal((await readFile(await (await z).path())).subarray(0,2).toString(),'PK');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);await page.screenshot({path:'test-output/'+engine+'-'+width+'-cv-builder.png',fullPage:true});assert.deepEqual(errors,[]);await page.close();
 }}finally{await browser.close();}
}
