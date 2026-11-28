import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765/',browser=await chromium.launch(),report=[];
mkdirSync('test-output',{recursive:true});
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
try{for(const path of ['','es/','de/','technical/','documents/','es/technical/','es/documents/','de/technical/','de/documents/']){
 const page=await context.newPage();
 await page.goto(base+path);await page.waitForLoadState('networkidle');
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 report.push({path,violations:result.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)})),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
 assert.equal(await page.locator('h1').count(),1);
 if(path.endsWith('technical/'))assert.equal(await page.locator('[data-market-skill]').count(),81);
 await page.close();
}}finally{await context.close();await browser.close();writeFileSync('test-output/accessibility.json',JSON.stringify(report,null,2)+'\n');}
console.log('Accessibility audit:',JSON.stringify(report));
