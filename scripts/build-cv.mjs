// Builds public/cv/Joao-Cunha-Pereira-CV.pdf from cv/cv.html with headless Chromium.
// First run: `npx playwright install chromium`. Then `npm run cv`.
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const fontDir = new URL('node_modules/@fontsource/ibm-plex-sans/files', root).href;
const source = new URL('cv/cv.html', root);
const tmp = new URL('cv/.cv.build.html', root);
const out = new URL('public/cv/Joao-Cunha-Pereira-CV.pdf', root);

writeFileSync(tmp, readFileSync(source, 'utf8').replaceAll('FONTDIR', fontDir));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(tmp.href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const raw = await page.pdf({ format: 'A4', preferCSSPageSize: true, printBackground: true, tagged: true });
await browser.close();
rmSync(tmp);

const doc = await PDFDocument.load(raw);
if (doc.getPageCount() !== 1) throw new Error(`CV must be one page, got ${doc.getPageCount()}`);
doc.setTitle('João Cunha Pereira – CV', { showInWindowTitleBar: true });
doc.setAuthor('João Cunha Pereira');
doc.setSubject('Curriculum vitae: enterprise software engineer, SAP BTP, AI-enabled products');
doc.setKeywords(['SAP BTP', 'CAP', 'SAPUI5', 'Solution Architecture', 'Enterprise AI']);
doc.setCreator('joao247.github.io');
doc.setProducer('joao247.github.io');
doc.setLanguage('en');
mkdirSync(new URL('public/cv/', root), { recursive: true });
writeFileSync(out, await doc.save());
console.log('Wrote public/cv/Joao-Cunha-Pereira-CV.pdf (1 page)');
