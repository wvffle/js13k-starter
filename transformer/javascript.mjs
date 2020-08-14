import pug from './pug.mjs'
import esbuild from 'esbuild'
import { promises as fs } from 'fs'
import { minify } from 'terser'

export default async (PRODUCTION) => {
  const { outputFiles: [{ contents: bytes }]} = await esbuild.build({
    bundle: true,
    target: 'es2019',

    minify: true,
    write: false,

    entryPoints: ['src/js/main.js'],

    sourcefile: 'src/js/main.js',
    sourcemap: PRODUCTION ? false : 'inline'
  })


  const js = Buffer.from(bytes).toString()

  if (PRODUCTION) {
    const { code } = await minify(js, {
      ecma: 'es2019',
      compress: {
        drop_console: true,
        passes: 3
      }
    })

    await fs.writeFile('public/main.js', code)
    return pug(PRODUCTION)
  }


  await fs.writeFile('public/main.js', js)
  return pug(PRODUCTION)
}
