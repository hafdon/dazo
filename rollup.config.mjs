import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import typescript from '@rollup/plugin-typescript';

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
   {
      // just messing around
      input: './src/CrosslingualModule.ts',
      output: {
         file: `./dest/ts/CrosslingualModule.mjs`,
         format: 'es'
      },
      plugins: [typescript()]
   },
   {
      // just messing around
      input: './src/dazo-dictionary.ts',
      output: {
         file: `./dest/ts/dazo-dictionary.mjs`,
         format: 'es'
      },
      plugins: [typescript()]
   }

];
