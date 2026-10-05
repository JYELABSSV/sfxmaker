# JYE SOUNDS · SFX Studio

## Development

Install dependencies with npm install. Run npm run dev.

## Build and validation

Run npm run lint and npm run build. The build produces the app, directly accessible bilingual policy and guide pages, robots.txt, sitemap.xml and a real 404.html in dist. Deploy the dist directory using the existing Cloudflare Pages Git integration.

Site descriptions and policy pages are in content/site-pages.json; update the modal summaries at the same time. Statements about rights, privacy, analytics and availability must match actual operation.

## Operational checks

- Confirm the AdSense publisher ID against the actual account (main library only).
- Check Privacy & messaging / Google-certified CMP settings before serving personalized ads in applicable regions.
- Review Cloudflare bot/firewall rules for crawler access.
- Keep source and permission records for distributed audio; these are not proven by application code.
- Validate download, playback, direct page URLs, mobile layout and the generated sitemap after deployment.
