# Template Screenshots

Place template screenshot images in this directory and update `screenshotSrc` in `content.json`.

## Specifications
- **Width**: 1280px
- **Aspect ratio**: 16:10 (1280×800)
- **Format**: PNG or JPEG
- **Naming**: match the template `id` from content.json (e.g., `single-page.png`, `multi-page.png`)

## How to capture
1. Open each template demo in a browser at 1280px wide
2. Take a full-viewport screenshot (browser DevTools → device toolbar → 1280×800)
3. Save as `{template-id}.png` in this directory
4. Update `content.json` → `templates[n].screenshotSrc` to `"images/{template-id}.png"`
