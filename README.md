# resume

JSON Resume powered website with a sample `resume.json`.

## Live site

GitHub Pages: https://jjst.github.io/resume/

## Local build

```bash
npm install
npm run build
npm run generate-pdf
```

This generates `dist/index.html`.
`npm run generate-pdf` first renders `dist/pdf.html` with the `consultant-polished` theme, then exports `dist/resume.pdf`.
This keeps the website theme unchanged while using a print-optimized consultant style specifically for the PDF artifact.

## GitHub Actions pipeline

The workflow at `.github/workflows/build-and-deploy.yml`:

1. Builds the resume website from `resume.json`
2. Generates `dist/resume.pdf` with Playwright
3. Publishes the `dist/` folder to GitHub Pages
