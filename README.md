# resume

JSON Resume powered website with a sample `resume.json`.

## Local build

```bash
npm install
npm run build
```

This generates `dist/index.html`.

## GitHub Actions pipeline

The workflow at `.github/workflows/build-and-deploy.yml`:

1. Builds the resume website from `resume.json`
2. Generates `dist/resume.pdf` with Playwright
3. Publishes the `dist/` folder to GitHub Pages
