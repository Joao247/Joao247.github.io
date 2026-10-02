# joao247.github.io

Source for [joao247.github.io](https://joao247.github.io), the personal site of João Cunha Pereira: enterprise software engineer working on SAP BTP, building AI-enabled products.

Static site built with [Astro](https://astro.build), no client-side JavaScript, deployed to GitHub Pages by GitHub Actions.

## Structure

```
src/data/profile.ts        Homepage content: hero, experience, capabilities, certifications
src/content/work/*.mdx     Case studies (frontmatter drives the homepage cards)
src/components/cs/         Case-study building blocks and architecture diagrams (inline SVG)
src/layouts/Base.astro     <head>, SEO and Open Graph tags, header and footer
src/styles/global.css      Design tokens (light and dark) and all styles
cv/cv.html                 CV source, printed to PDF by scripts/build-cv.mjs
scripts/                   CV build, social image generation and link checking
```

## Common edits

| To change | Edit |
| --- | --- |
| Experience, skills, certifications, languages | `src/data/profile.ts` |
| A case study | `src/content/work/<slug>.mdx` |
| Add a case study | New `.mdx` in `src/content/work/` with the same frontmatter fields; `order` sets its position |
| Portrait | Add `src/assets/portrait.jpg` (4:5, at least 1200×1500). It appears automatically. |
| CV | Edit `cv/cv.html`, then `npm run cv` (first time: `npx playwright install chromium`). It writes `public/cv/Joao-Cunha-Pereira-CV.pdf` and fails if the CV is longer than one page. |
| Social preview image and icons | Edit `scripts/generate-images.mjs` or `public/favicon.svg`, then `npm run og` |

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run verify     # type check, production build, internal link check
npm run check:links -- --external   # also checks external URLs
```

Every push and pull request runs the same checks in CI. Pushes to `main` deploy to GitHub Pages.

## License

Code is MIT-licensed (see `LICENSE`). Written content and images are © João Cunha Pereira.
