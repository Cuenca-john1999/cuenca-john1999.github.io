import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:8765/',browser=await chromium.launch(),report=[];
const expectedSkills=JSON.parse(readFileSync(new URL('../data/market/common-evidence.json',import.meta.url),'utf8')).skills.length;
mkdirSync('test-output',{recursive:true});
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const pages=['','es/','de/','technical/','documents/','es/technical/','es/documents/','de/technical/','de/documents/','workbench/','es/workbench/','de/workbench/','privacy.html?lang=en','privacy.html?lang=es','privacy.html?lang=de','cv-builder/?lang=en','cv-builder/?lang=es','cv-builder/?lang=de'];
async function settled(page){await page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});}
async function audit(page,path,theme,scope='page'){await settled(page);let axe=new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']);if(scope==='expanded-cv')axe=axe.include('[data-cv-builder]');const result=await axe.analyze();report.push({path,theme,scope,violations:result.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)})),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});}
try{
 for(const path of pages){
  const page=await context.newPage();
  try{
   await page.goto(base+path);await page.waitForLoadState('networkidle');
   if(path.startsWith('privacy.html')){const lang=new URL(base+path).searchParams.get('lang');await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);assert.equal(await page.locator('#local-analysis').count(),1);}
   const hasCV=await page.locator('[data-cv-builder]').count()>0;if(hasCV)await page.locator('#cv-download-pdf').waitFor({state:'attached'});
   assert.equal(await page.locator('h1').count(),1);
   if(path.endsWith('technical/'))assert.equal(await page.locator('[data-market-skill]').count(),expectedSkills);
   const supportsTheme=await page.evaluate(()=>typeof window.Theme?.set==='function');
   const themes=supportsTheme?['light','dark']:[await page.locator('html').getAttribute('data-theme')||'default'];
   for(const theme of themes){
    if(supportsTheme){await page.evaluate(theme=>window.Theme.set(theme),theme);assert.equal(await page.locator('html').getAttribute('data-theme'),theme);}
    await audit(page,path,theme);
    if(hasCV){await page.evaluate(()=>{for(const id of ['home-cv','cv-advanced','cv-extra','cv-preview-details']){const d=document.getElementById(id);if(d)d.open=true;}});await audit(page,path,theme,'expanded-cv');await page.evaluate(()=>{for(const id of ['home-cv','cv-advanced','cv-extra','cv-preview-details']){const d=document.getElementById(id);if(d)d.open=false;}});}
   }
  }finally{await page.close();}
 }
}finally{await context.close();await browser.close();writeFileSync('test-output/accessibility.json',JSON.stringify(report,null,2)+'\n');}
const blocking=report.flatMap(r=>[...(r.overflow?[{path:r.path,theme:r.theme,id:'horizontal-overflow'}]:[]),...r.violations.filter(v=>v.impact==='critical'||v.impact==='serious').map(v=>({path:r.path,theme:r.theme,id:v.id,targets:v.targets}))]);
console.log('Accessibility audit:',JSON.stringify(report));
assert.equal(blocking.length,0,'Blocking accessibility findings: '+JSON.stringify(blocking));
