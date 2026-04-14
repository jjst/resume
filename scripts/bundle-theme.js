import esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['node_modules/jsonresume-theme-bold-header-statement/src/index.js'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  outfile: '.theme-bundle.js',
  mainFields: ['module', 'main'],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
