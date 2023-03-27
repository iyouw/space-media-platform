import { build } from 'esbuild';

const bundle = async (format) => {
  const ext = format === 'esm' ? '.mjs' : '.js';
  const outfile = `dist/index${ext}`;
  await build({
    bundle: true,
    format,
    charset: 'utf8',
    target: ['chrome58', 'node14'],
    outfile,
    entryPoints: ['src/index.ts'],
  });
};

await bundle('cjs');
await bundle('esm');
