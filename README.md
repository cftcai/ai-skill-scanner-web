# ai-skill-scanner-web

[![Deploy static site to GitHub Pages](https://github.com/cftcai/ai-skill-scanner-web/actions/workflows/pages.yml/badge.svg)](https://github.com/cftcai/ai-skill-scanner-web/actions/workflows/pages.yml)

Static web interface for the ai-skill-scanner project.

- Clean URL input form (empty by default)
- Dedicated "Load Demo Fixture" button that shows sample output for the canonical mock malicious_skill.py
- Results viewer with severity summary and findings table
- Dynamic latest commit SHAs from both scanner and signatures repositories
- Direct links to Performance benchmarks and main CLI repo

### Security

Fully self-contained: no third-party CDNs. `index.html`, `styles.css`, and `app.js` are served from the same origin, and a strict Content-Security-Policy (`default-src 'none'; script-src 'self'; style-src 'self'; connect-src https://api.github.com`) blocks external scripts, inline scripts, and inline event handlers. The DOM is built with `textContent`/`createElement`, so findings cannot inject markup.

## Live Site

https://cftcai.github.io/ai-skill-scanner-web

## Deployment (GitHub Pages)

1. The repository already contains `.github/workflows/pages.yml`.
2. Go to repository **Settings → Pages**.
3. Under "Build and deployment" set **Source** to **GitHub Actions**.
4. Save. The workflow will deploy automatically on push to main.

The workflow is intentionally lightweight (no Node.js build step). The site is plain HTML/CSS/JS with no dependencies to install or bundle.

## Links
- Main scanner + CLI: https://github.com/cftcai/ai-skill-scanner
- Signatures & Performance: https://github.com/cftcai/ai-skill-signatures#performance
- Mock malicious skill fixture (canonical test case): https://github.com/cftcai/ai-skill-scanner/blob/main/tests/malicious_skill.py

This repository is intentionally separate to keep the core CLI and signatures clean and focused.