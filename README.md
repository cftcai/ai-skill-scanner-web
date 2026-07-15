# ai-skill-scanner-web

Minimal static web frontend for the ai-skill-scanner project.

- Clean URL input form (empty by default)
- Dedicated "Load Demo Fixture" button that instantly tests with the canonical mock malicious_skill.py
- Results viewer with severity summary and findings table
- Dynamic latest commit SHAs from both scanner and signatures repositories
- Direct links to Performance benchmarks and main CLI repo

## Demo

Open index.html locally or deploy via GitHub Pages / Vercel.
Click **Load Demo Fixture** then **Scan Repository** to see high-severity findings from the mock malicious skill.

## Deployment (GitHub Pages)

1. The repository already contains `.github/workflows/pages.yml`.
2. Go to repository **Settings → Pages**.
3. Under "Build and deployment" set **Source** to **GitHub Actions**.
4. Save. The workflow will deploy automatically on push to main.
5. The live site will be available at https://cftcai.github.io/ai-skill-scanner-web

Caching: The workflow is intentionally lightweight (no Node.js build step). No additional caching is required for the current static HTML + CDN setup. If you expand to a full Next.js build in the future, add `actions/cache` for node_modules and build cache.

## Links
- Main scanner + CLI: https://github.com/cftcai/ai-skill-scanner
- Signatures & Performance: https://github.com/cftcai/ai-skill-signatures#performance
- Mock malicious skill fixture (canonical test case): https://github.com/cftcai/ai-skill-scanner/blob/main/tests/malicious_skill.py

This repository is intentionally separate to keep the core CLI and signatures clean and focused.