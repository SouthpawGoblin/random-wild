import { Vec2, Rect } from "./types"
import Scene from "./Scene"
import Tile from "./Tile"

export default class Renderer {

  ctx: CanvasRenderingContext2D
  scene: Scene
  zoom: number
  translation: Vec2
  rotation: number
  pixelRatio: number
  
  constructor(canvas: HTMLCanvasElement, scene: Scene, pixelRatio: number) {
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('can not aquire canvas context.')
    }
    this.ctx = context
    this.scene = scene
    this.zoom = 1
    this.translation = {
      x: 0, 
      y: 0
    }
    this.rotation = 0
    this.pixelRatio = pixelRatio
  }

  render() {
    this.clear()
    
    // translate and rotate the canvas
    this.ctx.translate(this.ctx.canvas.width / 2 + this.translation.x, this.ctx.canvas.height / 2 + this.translation.y)
    this.ctx.rotate(this.rotation)

    // render scene
    Object.values(this.scene.getTiles()).forEach(tile => {
      this.ctx.fillStyle = tile.color
      const rect = this.getTileRenderRect(tile)
      this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
  }

  private clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  private getTileRenderRect(tile: Tile): Rect {
    const size = this.zoom * this.pixelRatio
    const x = tile.position.x * size
    const y = -(tile.position.y + 1) * size 
    return {
      x,
      y,
      w: size,
      h: size
    }
  }
}