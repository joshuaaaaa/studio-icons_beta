import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src-v2/index.ts',
  output: [
    {
      file: 'dist/studio-icons.js',
      format: 'iife',
      name: 'StudioIcons',
      sourcemap: !production
    },
    {
      file: 'dist/studio-icons.esm.js',
      format: 'es',
      sourcemap: !production
    }
  ],
  plugins: [
    resolve({
      browser: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist/types'
    }),
    production && terser({
      format: {
        comments: false
      }
    })
  ].filter(Boolean),
  watch: {
    clearScreen: false
  }
};
