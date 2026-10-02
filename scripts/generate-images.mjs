// Generates the social preview image and PNG icons into public/.
// Run with `npm run og` after changing the name, role or favicon. Needs network
// access the first time to download TTF fonts into scripts/.fonts (git-ignored).
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const here = new URL('.', import.meta.url);
const pub = new URL('../public/', import.meta.url);
const fontDir = new URL('.fonts/', here);
mkdirSync(fontDir, { recursive: true });

// Without a browser user agent, Google Fonts serves TrueType, which resvg can read.
const css = await (await fetch(
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,650&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@500',
)).text();
const fontFiles = [];
for (const [i, [, url]] of [...css.matchAll(/url\((https:[^)]+\.ttf)\)/g)].entries()) {
  const file = new URL(`font-${i}.ttf`, fontDir);
  if (!existsSync(file)) writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
  fontFiles.push(file.pathname);
}

const render = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { fontFiles, loadSystemFonts: false } }).render().asPng();

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f3f4f6"/>
  <text x="80" y="104" font-family="IBM Plex Mono Medium" font-weight="500" font-size="22" letter-spacing="1.5" fill="#7b8190">JOAO247.GITHUB.IO</text>
  <text x="76" y="300" font-family="Bricolage Grotesque 96pt" font-weight="650" font-size="112" letter-spacing="-4" fill="#14161b">João Cunha</text>
  <text x="76" y="410" font-family="Bricolage Grotesque 96pt" font-weight="650" font-size="112" letter-spacing="-4" fill="#14161b">Pereira</text>
  <text x="80" y="484" font-family="IBM Plex Mono Medium" font-weight="500" font-size="26" fill="#4c5260">Enterprise software engineer · SAP BTP · AI-enabled products</text>
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#dadde3" stroke-width="2"/>
  <circle cx="88" cy="568" r="7" fill="#2545d3"/>
  <text x="108" y="576" font-family="IBM Plex Sans" font-weight="400" font-size="24" fill="#4c5260">Wienerberger · Vienna · about 25 SAP BTP applications · building SayMacros</text>
</svg>`;

writeFileSync(new URL('og.png', pub), render(og, 1200));

const favicon = readFileSync(new URL('favicon.svg', pub), 'utf8');
writeFileSync(new URL('favicon-32.png', pub), render(favicon, 32));
writeFileSync(new URL('apple-touch-icon.png', pub), render(favicon.replace('rx="7"', 'rx="0"'), 180));

console.log('Wrote public/og.png, public/favicon-32.png, public/apple-touch-icon.png');
