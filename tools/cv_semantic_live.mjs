// Real model smoke test. Run with CV_SEMANTIC_LIVE=1 and a local portfolio server.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 await page.goto((process.env.PORTFOLIO_URL||'http://127.0.0.1:8765/')+'cv-builder/?lang=en');
 await page.locator('#cv-advanced>summary').click();
 await page.locator('#cv-offer').fill('Prepare liquid reagents and laboratory solutions. Assist with science lessons, organise apparatus and teaching materials. Maintain inventory.');
 await page.locator('#cv-semantic-run').click();
 await page.waitForFunction(()=>!document.querySelector('#cv-semantic-run')?.disabled,{},{timeout:310000});
 const status=await page.locator('#cv-semantic-status').innerText();
 console.log(status);assert.match(status,/Semantic analysis complete/);
 assert(await page.locator('[data-semantic-skill]').count()>0);
 await page.locator('#cv-semantic-run').click();await page.locator('#cv-semantic-cancel').click();assert.equal(await page.locator('#cv-download-pdf').isEnabled(),true);
}finally{await browser.close();}
