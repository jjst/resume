const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const resumePath = path.join(rootDir, 'resume.json');
const distDir = path.join(rootDir, 'dist');
const outputPath = path.join(distDir, 'index.html');

let resume;
try {
  resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
} catch (error) {
  console.error('Failed to parse resume.json. Please fix invalid JSON syntax.');
  throw error;
}
const basics = resume.basics || {};
const work = Array.isArray(resume.work) ? resume.work : [];
const education = Array.isArray(resume.education) ? resume.education : [];
const skills = Array.isArray(resume.skills) ? resume.skills : [];

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const list = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(basics.name || 'Resume')}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2rem auto; max-width: 900px; color: #1f2937; line-height: 1.5; }
      h1, h2, h3 { margin-bottom: 0.3rem; color: #111827; }
      section { margin-top: 1.5rem; }
      .meta { color: #4b5563; margin: 0.25rem 0; }
      .item { margin-bottom: 1rem; }
      a { color: #1d4ed8; text-decoration: none; }
      a:hover { text-decoration: underline; }
      ul { margin-top: 0.25rem; }
    </style>
  </head>
  <body>
    <header>
      <h1>${escapeHtml(basics.name || '')}</h1>
      <p class="meta">${escapeHtml(basics.label || '')}</p>
      <p class="meta">${escapeHtml(basics.email || '')} ${basics.url ? `• <a href="${escapeHtml(basics.url)}">${escapeHtml(basics.url)}</a>` : ''}</p>
      <p><a href="./resume.pdf">Download PDF</a></p>
      <p>${escapeHtml(basics.summary || '')}</p>
    </header>

    <section>
      <h2>Work Experience</h2>
      ${work.map((item) => `<article class="item"><h3>${escapeHtml(item.position || '')} • ${escapeHtml(item.name || '')}</h3><p class="meta">${escapeHtml(item.startDate || '')} - ${escapeHtml(item.endDate || 'Present')}</p><p>${escapeHtml(item.summary || '')}</p>${Array.isArray(item.highlights) && item.highlights.length ? `<ul>${list(item.highlights)}</ul>` : ''}</article>`).join('')}
    </section>

    <section>
      <h2>Education</h2>
      ${education.map((item) => `<article class="item"><h3>${escapeHtml(item.institution || '')}</h3><p class="meta">${escapeHtml(item.studyType || '')} in ${escapeHtml(item.area || '')} (${escapeHtml(item.startDate || '')} - ${escapeHtml(item.endDate || '')})</p></article>`).join('')}
    </section>

    <section>
      <h2>Skills</h2>
      ${skills.map((item) => `<article class="item"><h3>${escapeHtml(item.name || '')}</h3>${Array.isArray(item.keywords) && item.keywords.length ? `<p>${escapeHtml(item.keywords.join(', '))}</p>` : ''}</article>`).join('')}
    </section>
  </body>
</html>`;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(outputPath, html);

console.log(`Generated ${outputPath}`);
