const path = require('node:path');
const { chromium } = require('playwright');

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const htmlPath = path.join(rootDir, 'dist', 'pdf.html');
  const pdfPath = path.join(rootDir, 'dist', 'resume.pdf');
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true
    });
    console.log(`Generated ${pdfPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Failed to generate PDF from dist/pdf.html');
  console.error(error);
  process.exit(1);
});
