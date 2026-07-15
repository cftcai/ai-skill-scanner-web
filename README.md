# ai-skill-scanner-web

Minimal static web frontend for the ai-skill-scanner project.

- URL input form with instant demo using the mock malicious skill fixture
- Clean results viewer showing severity summary and findings table
- Direct links to the main CLI repository and the Performance section in the signatures repository

## Demo

Open index.html or deploy to GitHub Pages / Vercel.
Click **Demo** to load the canonical malicious skill fixture and see high-severity findings immediately.

For custom public GitHub URLs the full backend (workflow dispatch or serverless container) is planned.

## Links
- Main scanner: https://github.com/cftcai/ai-skill-scanner
- Signatures & Performance benchmarks: https://github.com/cftcai/ai-skill-signatures#performance
- Mock malicious skill fixture (canonical test case): https://github.com/cftcai/ai-skill-scanner/blob/main/tests/malicious_skill.py

## Hosting

GitHub Pages (from /docs or root) or Vercel (recommended for future serverless API).

This repository is intentionally separate to keep the core CLI and signatures clean.