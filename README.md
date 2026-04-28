# Motion Spec Sheet

A living reference of GSAP animation primitives — 30 demos across eases, springs, staggers, and playback controls. Each card shows a live looping animation, the configuration object driving it, and a copy button for the snippet.

## Sections

| Category     | Count | What it covers                                                                                                                          |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Eases**    | 14    | none, power1–4 (in/out/inOut variants), expo, circ, back, elastic, bounce, steps, CustomEase                                            |
| **Springs**  | 4     | Elastic ease configured as named spring presets (balanced, snappy, gentle, bouncy); cross-referenced with the CSS `spring()` equivalent |
| **Staggers** | 6     | `amount`, `each`, `from: "center"`, `from: "edges"`, `from: "random"`, grid 3×3                                                         |
| **Playback** | 6     | `repeat: -1`, yoyo, `repeatDelay`, timeline sequential, position offset (`+=`), `delay`                                                 |

## Tech stack

- **Vanilla HTML/CSS/JS** — no framework, no bundler, no build step
- **GSAP 3.12.5** via jsDelivr CDN — ScrollTrigger and CustomEase plugins included
- **Google Fonts** — Space Mono (headings), Inter (UI), JetBrains Mono (code)
- **Inline SVG sprite** — icon system with zero extra network requests

The JS layer is data-driven: each section exports an array of demo config objects from `src/js/demos/*.js`. `main.js` generates DOM cards, wires replay and copy buttons, and runs the page-load entry sequence (ScrollTrigger batch reveals, character-split title animation).

## Dev setup

```sh
npm install          # installs devDependencies only — no runtime deps
npx serve src -p 4321
```

Open `http://localhost:4321`. `src/` is served directly with no compilation.

## Pre-commit tooling

Husky + lint-staged run on every `git commit`:

| Tool         | Targets                   | Action                                          |
| ------------ | ------------------------- | ----------------------------------------------- |
| Prettier 3   | `*.{html,css,js,json,md}` | format                                          |
| ESLint 8     | `*.js`                    | lint + fix                                      |
| Stylelint 16 | `*.css`                   | lint + fix (property order, logical properties) |

`.gitattributes` enforces LF line endings (`* text=auto eol=lf`) across all platforms.

## Deployment

Static site on Netlify — no build command, publish directory: `src/`. `netlify.toml` sets security headers and 1-year cache headers for versioned static assets.

## Accessibility

- `prefers-reduced-motion` is detected at page load; animations are paused and a status banner is shown if active
- Skip-navigation link for keyboard users
- `<noscript>` notice in each section grid (demos require JS)

## License

MIT — see [LICENSE](LICENSE).
