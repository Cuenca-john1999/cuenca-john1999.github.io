import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { chromium, webkit } from 'playwright';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:8765/';
const catalogue = JSON.parse(await readFile(new URL('../data/market/common-evidence.json',import.meta.url),'utf8'));
const library = JSON.parse(await readFile(new URL('../data/market/scientific-library.json',import.meta.url),'utf8'));
const expectedSkills = catalogue.skills.length;
const expectedNotes = library.notes.length;
const expectedFlows = library.flows.length;
const expectedProjects = library.projects.length;
const expectedCases = library.cases.length;
await mkdir('test-output', {recursive:true});
for (const [engine,launcher] of Object.entries({chromium,webkit})) {
    const browser = await launcher.launch({headless:true});
    try {
        for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
            const page = await browser.newPage({viewport,acceptDownloads:true,locale:'en-US'});
            const pageErrors=[];
            page.on('pageerror',error=>pageErrors.push(error.message));
            for (const [lang,path] of [['en',''],['es','es/'],['de','de/']]) {
                await page.goto(base+path,{waitUntil:'domcontentloaded'});
                const selector=page.locator('[data-market-selector]');
                await selector.locator('summary').waitFor({state:'visible'});
                assert.equal(await selector.getAttribute('data-current-market'),lang);
                await selector.locator('summary').click();
                assert.equal(await selector.locator('.market-menu a:visible').count(),3);
                const bounds=await selector.locator('summary').boundingBox();
                assert.ok(bounds && bounds.x>=-1 && bounds.x+bounds.width<=viewport.width+1,'Country selector must fit viewport');
                await page.screenshot({path:`test-output/${engine}-${viewport.width}-${lang}-selector.png`});
                await selector.locator('summary').click();
                await page.locator('.home-compact').waitFor({state:'attached'});
                assert.equal(await page.locator('details[data-home-disclosure][open]').count(),0);
                assert.equal(await page.locator('[data-market-skill]:visible').count(),0);
                await page.screenshot({path:`test-output/${engine}-${viewport.width}-${lang}-compact-home.png`,fullPage:true});
                await page.locator('#home-technical>summary').click();
                await page.locator('#home-catalogue>summary').click();
                assert.equal(await page.locator('[data-market-skill]:visible').count(),expectedSkills);
                await page.locator('#home-equipment>summary').click();
                await page.locator('#home-documents>summary').click();
                await page.locator('#home-static-cvs>summary').click();
                await page.locator('#home-package>summary').click();
                // Scroll directly to each new section; contrast and layout must
                // be restored even for very tall sections and direct anchor visits.
                const marketSections=page.locator('.sequence-section.market-section');
                for(let i=0;i<await marketSections.count();i++){
                    const section=marketSections.nth(i),heading=section.locator('h2').first();
                    await heading.scrollIntoViewIfNeeded();
                    await page.waitForFunction(id=>document.getElementById(id).classList.contains('is-sequence-revealed'),await section.getAttribute('id'));
                    await page.waitForFunction(id=>{
                        const s=document.getElementById(id),h=s.querySelector('h2'),p=s.querySelector('.market-intro'),g=s.querySelector('.market-grid,.market-filters');
                        if(!h||!p||!g)return false;
                        const css=n=>getComputedStyle(n),pr=p.getBoundingClientRect(),gr=g.getBoundingClientRect();
                        return Number(css(s).opacity)>.99&&Number(css(h).opacity)>.99&&Number(css(p).opacity)>.99&&gr.top-pr.bottom>=12;
                    },await section.getAttribute('id'));
                    const id=await section.getAttribute('id');
                    await page.screenshot({path:`test-output/${engine}-${viewport.width}-${lang}-${id}.png`});
                }
                const search=page.locator('[data-market-search]');
                await search.waitFor({state:'visible'});
                const controlHeights=await page.locator('[data-market-filters] input,[data-market-filters] select,[data-market-filters] button').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().height));
                assert.ok(Math.max(...controlHeights)-Math.min(...controlHeights)<2,'Filter controls must have a consistent height');
                assert.equal(await page.locator('[data-market-skill]').count(),expectedSkills);
                await page.locator('[data-market-route]').selectOption('pharma');
                assert.equal(await page.locator('[data-market-skill]:not([hidden])').count(),catalogue.routes.pharma.skills.length);
                await page.locator('[data-market-reset]').click();
                await page.locator('[data-market-topic]').selectOption('metrology');
                assert.equal(await page.locator('[data-market-skill]:not([hidden])').count(),catalogue.skills.filter(s=>s.topic==='metrology').length);
                await page.locator('[data-market-reset]').click();
                await search.fill('PCR');
                const count=await page.locator('[data-market-skill]:not([hidden])').count();
                assert.ok(count>0 && count<expectedSkills,'Search must filter skills');
                await page.locator('[data-market-reset]').click();
                assert.equal(await page.locator('[data-market-skill]:not([hidden])').count(),expectedSkills);
                await page.locator('#recruitment-hub').scrollIntoViewIfNeeded();
                assert.equal(await page.locator('[data-application-package] input[type=checkbox]').count(),7);
                assert.equal(await page.locator('#recruitment-hub a[href*="/cv-"][download]').count(),4);
                if(viewport.width===1440) {
                    const downloaded=page.waitForEvent('download',{timeout:30000});
                    await page.locator('[data-package-download]').click();
                    const download=await downloaded;
                    const file=`test-output/${engine}-${lang}.zip`;
                    await download.saveAs(file);
                    assert.equal((await readFile(file)).subarray(0,2).toString(),'PK');
                    execFileSync('python3',['-c','import sys,zipfile; z=zipfile.ZipFile(sys.argv[1]); assert z.testzip() is None; assert len(z.namelist())==1; assert z.read(z.namelist()[0]).startswith(b"%PDF-")',file]);
                }
                const catalogueId=({en:'technical-catalogue',es:'catalogo-tecnico',de:'fachkatalog'})[lang];
                await page.goto(base+path+'?focus=pharma#'+catalogueId,{waitUntil:'domcontentloaded'});
                await page.locator('#home-catalogue[open]').waitFor({state:'attached'});
                assert.equal(await page.locator('#home-technical').getAttribute('open'),'');
                await page.goto(base+path+'workbench/#scientific-library',{waitUntil:'domcontentloaded'});
                assert.equal(await page.locator('#scientific-library article[id^="note-"]').count(),expectedNotes);
                assert.equal(await page.locator('#scientific-library .science-flow').count(),expectedFlows);
                assert.equal(await page.locator('html').getAttribute('lang'),lang);
                await page.locator('#scientific-library-title').scrollIntoViewIfNeeded();
                await page.waitForFunction(()=>document.getElementById('scientific-library-title').classList.contains('is-visible'));
                assert.equal(await page.locator('#scientific-library article[data-reveal]').count(),expectedNotes+expectedFlows+expectedProjects+expectedCases);
                assert.equal(await page.locator('#scientific-library article[id^="case-"]').count(),expectedCases);
                assert.equal(await page.locator('#evidence-ir-peaks tbody tr').count(),library.exhibit.values.length);
                assert.equal(await page.locator('#evidence-gallery svg[role=img]').count(),2);
                assert.equal(await page.locator('#evidence-gallery tbody tr').count(),library.gallery.bradford.values.length);
                assert.equal(await page.locator('#scientific-library article[id^="academic-"]').count(),expectedProjects);
                await page.screenshot({path:`test-output/${engine}-${viewport.width}-${lang}-library.png`});
            }
            // Verify real navigation through the country dropdown.
            await page.goto(base,{waitUntil:'domcontentloaded'});
            await page.locator('[data-market-selector] summary').click();
            await page.locator('[data-market-selector] a[href="./de/"]').click();
            await page.waitForURL('**/de/');
            assert.equal(await page.locator('[data-current-market]').getAttribute('data-current-market'),'de');
            assert.deepEqual(pageErrors,[],'Unexpected page errors');
            await page.close();
        }
    } finally { await browser.close(); }
}
console.log('Browser smoke checks passed in Chromium and WebKit.');
