import { Vec2 } from "./types"

export default class Renderer {

  ctx: CanvasRenderingContext2D
  pixelRatio: number
  zoom: number
  angle: number
  renderFunc: (ctx: CanvasRenderingContext2D) => void = () => { }
  
  constructor(canvas: HTMLCanvasElement, pixelRatio: number) {
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('can not aquire canvas context.')
    }
    this.ctx = context
    this.pixelRatio = pixelRatio
    this.zoom = 1
    this.angle = 0
  }

  render() {
    this.renderFunc(this.ctx)
    requestAnimationFrame(this.render)
  }

  private world2canvas(pos: Vec2): Vec2 {
    const x = pos.x * this.zoom * this.pixelRatio + this.ctx.canvas.width / 2
    const y = pos.y * this.zoom * this.pixelRatio + this.ctx.canvas.height / 2
    return { x, y }
  }
}