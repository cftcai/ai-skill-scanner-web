# TODO - ai-skill-scanner-web

## High Priority (after repos go public)

- [ ] Update all messaging and version references to reflect scanner v1.1.0 + dynamic signature loading + SHA verification
- [ ] Improve UI clarity: clearly distinguish what works in the web demo vs what requires the `Scan URL` workflow or CLI
- [ ] Add a visible status indicator showing that signatures are dynamically loaded from `ai-skill-signatures` and SHA-verified
- [ ] Enhance the "Load Demo Fixture" experience (add more varied test cases or a small malicious skill selector)

## Medium Priority

- [ ] Improve error handling and user feedback when a custom URL is entered
- [ ] Add a small note or link explaining the SHA verification process for transparency
- [ ] Consider adding a "View latest signatures" link that opens the signatures repo
- [ ] Polish mobile responsiveness and dark mode consistency

## Future / Nice to Have

- [ ] Explore lightweight backend (Cloudflare Worker / Vercel Edge Function) to allow real `workflow_dispatch` calls from the web UI (with rate limiting)
- [ ] Add ability to upload a small local skill file for scanning (client-side only)
- [ ] Create a shareable result link (store minimal report in URL or short-lived gist)

## Notes

- Keep the site fully static / GitHub Pages friendly for now.
- All real scanning should still go through the validated `scan-url` workflow or the CLI for security and reproducibility.
