import yazl from 'yazl'
import { createWriteStream, promises as fs } from 'fs'

export default async () => {
  const zip = new yazl.ZipFile()
  zip.addFile(`${process.cwd()}/public/index.html`, 'index.html')

  zip.outputStream.pipe(createWriteStream(`${process.cwd()}/public/game-build.zip`))
    .on('close', async () => {
      const { size } = await fs.stat(`${process.cwd()}/public/game-build.zip`)
      console.log(`Current game size: ${size} bytes`)
      console.log(`${(size / 13312 * 100).toFixed(2) }% of total game size used`)
    })

  zip.end()
}
