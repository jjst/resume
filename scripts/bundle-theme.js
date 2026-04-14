import esbuild from 'esbuild';

const themeEntry =
  process.env.THEME_ENTRY ||
  'node_modules/jsonresume-theme-bold-header-statement/src/index.js';

await esbuild.build({
  entryPoints: [themeEntry],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  outfile: '.theme-bundle.js',
  mainFields: ['module', 'main'],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
