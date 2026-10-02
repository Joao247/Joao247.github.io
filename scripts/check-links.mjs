// Checks every internal link and #anchor in the built site (dist/).
// Pass --external to also request external URLs (slower, network-dependent).
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const checkExternal = process.argv.includes('--external');

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
})(root);

const ids = new Map(pages.map((p) => [p, new Set([...readFileSync(p, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const resolvePage = (path) => {
  const target = join(root, decodeURIComponent(path));
  if (existsSync(target) && statSync(target).isFile()) return target;
  const index = join(target, 'index.html');
  return existsSync(index) ? index : null;
};

const errors = [];
const external = new Set();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const from = '/' + relative(root, page);
  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(mailto:|tel:|data:)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) { external.add(url); continue; }
    const [path, hash] = url.split('#');
    const abs = path === '' ? page : resolvePage(path.startsWith('/') ? path : join(dirname(from), path));
    if (!abs) { errors.push(`${from}: missing ${url}`); continue; }
    if (hash && abs.endsWith('.html') && !ids.get(abs)?.has(hash)) errors.push(`${from}: missing anchor ${url}`);
  }
}

if (checkExternal) {
  for (const url of external) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link-check' } });
      // LinkedIn answers bots with 999; treat it as reachable.
      if (!res.ok && res.status !== 999) errors.push(`external ${res.status}: ${url}`);
    } catch (e) {
      errors.push(`external error: ${url} (${e.message})`);
    }
  }
}

console.log(`Checked ${pages.length} pages${checkExternal ? ` and ${external.size} external URLs` : ''}.`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('No broken links.');
