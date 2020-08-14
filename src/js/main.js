import { init, GameLoop, Text, initKeys, bindKeys } from 'kontra'
import { author } from '../../package.json'
const { canvas } = init('c')

const WIDTH = canvas.width = innerWidth
const HEIGHT = canvas.height = innerHeight

const credits = Text({
  text: `js13k submission by ${author}`,
  y: HEIGHT - 16,
  x: 8
})

const loop = GameLoop({
  update () {

  },

  render () {
    credits.render()
  }
})

loop.start()
