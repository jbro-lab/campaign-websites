# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A collection of 5 campaign website templates for down-ballot political candidates. No frameworks, no build tools — pure HTML, CSS, and vanilla JavaScript. All content is loaded dynamically from a `content.json` file per template.

## Templates

| Template | Directory | Type | Visual Identity |
|----------|-----------|------|-----------------|
| Single Page | `single-page/` | Single page | Standard campaign, smooth scroll nav |
| Multi Page | `multi-page/` | 6 HTML pages | Traditional multi-page with separate issue/endorsement/event pages |
| Bold Hero | `template-3-bold-hero/` | Single page | Split hero (60/40), transparent-to-solid nav, horizontal scroll endorsements, timeline events |
| Clean & Minimal | `template-4-clean-minimal/` | 6 HTML pages | Minimal whitespace-heavy design, non-sticky nav, single-column layouts |
| Community Focus | `template-5-community-focus/` | Single page | Gradient hero with circular photo, masonry endorsements, accordion issues, sticky rounded nav |

## Architecture

Each template folder follows the same structure:
```
template-folder/
├── index.html          ← HTML shell with IDs (no content text)
├── content.json        ← ALL content, theme config, candidate info
├── css/styles.css      ← Styles with CSS custom properties for theming
├── js/main.js          ← Fetches content.json, renders everything, applies theme
└── images/             ← Candidate photos (see images/README.md for sizes)
```

### Content Loading Pattern
- HTML files are empty shells with `id` attributes and structural markup
- `main.js` fetches `content.json` on DOMContentLoaded, then calls `renderContent(data)`
- All user-facing text is injected via JS — never edit HTML for content changes
- XSS protection: all text is escaped via the `esc()` helper (creates a text node, reads innerHTML)

### Multi-Page Detection (multi-page and template-4)
- Each HTML page has `data-page="pagename"` on `<html>`
- JS reads `document.documentElement.getAttribute('data-page')` and dispatches to `PAGE_RENDERERS[page](data)`
- Nav/footer are rendered on every page; page-specific content only renders on its page

### Theme System
All templates share the same theming approach:
- 4 preset palettes defined in a `PALETTES` object in JS: `navy-red`, `blue-gold`, `green-cream`, `slate-teal`
- `content.json` `theme.palette` selects a preset or `"custom"` with a `colors` object
- `applyTheme()` sets `--color-*` CSS custom properties on `document.documentElement`
- Fonts: `theme.headingFont`/`theme.bodyFont` set `--font-heading`/`--font-body` variables; `theme.googleFontsUrl` swaps the `<link id="google-fonts">` href

### CSS Custom Properties Used
```
--color-primary, --color-primary-dark, --color-primary-light
--color-secondary, --color-secondary-dark
--color-text, --color-text-light
--color-bg, --color-bg-alt, --color-white
--font-heading, --font-body
```

### Font Pairings Per Template
- single-page, multi-page: Merriweather + Inter
- template-3: Oswald + Source Sans Pro
- template-4: Libre Baskerville + Inter
- template-5: Nunito + Open Sans

## Key Patterns

- **Social icons**: SVG strings in a `SOCIAL_ICONS` object, rendered by `buildSocialLinks()`
- **Fade-in animations**: IntersectionObserver on `.fade-in` elements, adds `.visible` class
- **Active nav on scroll**: Scroll listener matches `window.scrollY` to section offsets; includes bottom-of-page detection for the last section (important for footer/contact sections)
- **Template-specific features**:
  - Template 3: scroll listener toggles `.navbar.scrolled` class at `scrollY > 80` for transparent-to-solid nav
  - Template 5: `initAccordion()` toggles `.open` class and sets `maxHeight` on accordion bodies

## Testing

No build step or test suite. To verify changes:
1. Open `index.html` in a browser (requires a local server for `fetch()` to work with `content.json`)
2. Use `python3 -m http.server` or VS Code Live Server from within the template directory
3. Check: content loads, theme applies, responsive layout works, nav highlighting works, animations fire

## Common Tasks

- **Change content**: Edit `content.json` only — never hardcode text in HTML
- **Add a new palette**: Add an entry to the `PALETTES` object in `main.js`
- **Add a new section**: Add HTML shell with IDs to `index.html`, add rendering logic in `renderContent()` in `main.js`, add corresponding data to `content.json`
- **Template-specific JSON fields**: Template 3 has `priorities` array; Template 5 has `candidate.location`, `about.whyRunning`/`whyRunningText`, and `volunteer.actions` array
