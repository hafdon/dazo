import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

const DEST_DIR = '../collection.media'

export default [
   {
      input: './src/components/LexemeItem.mjs',
      output: [
         {
            file: `${DEST_DIR}/_LexemeItem.js`,
            // do not write in IIFE
            format: 'es',
            // minify output
            plugins: [terser()],
         },
      ],
      plugins: [resolve(), babel({ babelHelpers: 'bundled' })]
   },
   {
      input: './src/script.js',
      output: [
         {
            file: `${DEST_DIR}/_script.js`,
            // do not write in IIFE
            format: 'es',
            // minify output
            plugins: [terser()],
         },
      ],
      plugins: [css({ output: '_style.css' }), resolve(), babel({ babelHelpers: 'bundled' })]
      // 
   },

];
