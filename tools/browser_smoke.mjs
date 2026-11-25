import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { chromium, webkit } from 'playwright';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:8765/';
await mkdir('test-output', {recursive:true});
for (const [engine,launcher] of Object.entries({chromium,webkit})) {
    const browser = await launcher.launch({headless:true});
    try {
        for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
            const page = await browser.newPage({viewport,acceptDownloads:true,locale:'en-US'});
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
                const search=page.locator('[data-market-search]');
                await search.waitFor({state:'visible'});
                assert.equal(await page.locator('[data-market-skill]').count(),46);
                await search.fill('PCR');
                const count=await page.locator('[data-market-skill]:not([hidden])').count();
                assert.ok(count>0 && count<46,'Search must filter skills');
                await page.locator('[data-market-reset]').click();
                assert.equal(await page.locator('[data-market-skill]:not([hidden])').count(),46);
                await page.locator('#recruitment-hub').scrollIntoViewIfNeeded();
                assert.equal(await page.locator('[data-application-package] input[type=checkbox]').count(),7);
                if(viewport.width===1440) {
                    const downloaded=page.waitForEvent('download',{timeout:30000});
                    await page.locator('[data-package-download]').click();
                    const download=await downloaded;
                    const file=`test-output/${engine}-${lang}.zip`;
                    await download.saveAs(file);
                    assert.equal((await readFile(file)).subarray(0,2).toString(),'PK');
                    execFileSync('python3',['-c','import sys,zipfile; z=zipfile.ZipFile(sys.argv[1]); assert z.testzip() is None; assert len(z.namelist())==1; assert z.read(z.namelist()[0]).startswith(b"%PDF-")',file]);
                }
                await page.goto(base+path+'workbench/#scientific-library',{waitUntil:'domcontentloaded'});
                assert.equal(await page.locator('#scientific-library article[id^="note-"]').count(),10);
                assert.equal(await page.locator('#scientific-library .science-flow').count(),4);
                assert.equal(await page.locator('html').getAttribute('lang'),lang);
                await page.locator('#scientific-library-title').scrollIntoViewIfNeeded();
                await page.screenshot({path:`test-output/${engine}-${viewport.width}-${lang}-library.png`});
            }
            // Verify real navigation through the country dropdown.
            await page.goto(base,{waitUntil:'domcontentloaded'});
            await page.locator('[data-market-selector] summary').click();
            await page.locator('[data-market-selector] a[href="./de/"]').click();
            await page.waitForURL('**/de/');
            assert.equal(await page.locator('[data-current-market]').getAttribute('data-current-market'),'de');
            await page.close();
        }
    } finally { await browser.close(); }
}
console.log('Browser smoke checks passed in Chromium and WebKit.');
