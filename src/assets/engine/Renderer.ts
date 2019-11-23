import { Vec2, Rect, Vec3 } from "./types"
import Scene from "./Scene"
import Tile from "./Tile"

export default class Renderer {

  ctx: CanvasRenderingContext2D
  scene: Scene
  showGrid: boolean
  
  private _zoom: number
  private _translation: Vec2
  private _rotation: number
  private _pixelRatio: number
  private _totalTranslation: Vec2
  private _tileSize: number
  
  constructor(canvas: HTMLCanvasElement, scene: Scene, pixelRatio: number) {
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('can not aquire canvas context.')
    }
    this.ctx = context
    this.scene = scene
    this.showGrid = true

    this._zoom = 1
    this._translation = {
      x: 0, 
      y: 0
    }
    this._rotation = 0
    this._pixelRatio = pixelRatio
    this._totalTranslation = {
      x: this.ctx.canvas.width / 2 + this._translation.x,
      y: this.ctx.canvas.height / 2 + this._translation.y
    }
    this._tileSize = this._zoom * this._pixelRatio
  }

  get zoom(): number {
    return this._zoom
  }
  set zoom(val: number) {
    this._zoom = val
    this._tileSize = this._zoom * this._pixelRatio
  }

  get translation(): Vec2 {
    return this._translation
  }
  set translation(val: Vec2) {
    this._translation = val
    this._totalTranslation = {
      x: this.ctx.canvas.width / 2 + this._translation.x,
      y: this.ctx.canvas.height / 2 + this._translation.y
    }
  }

  get rotation(): number {
    return this._rotation
  }
  set rotation(val: number) {
    this._rotation = val
  }

  get pixelRatio(): number {
    return this._pixelRatio
  }
  set pixelRatio(val: number) {
    this._pixelRatio = val
    this._tileSize = this._zoom * this._pixelRatio
  }

  render() {
    this.clear()
    
    this.renderGrid()

    // translate and rotate the canvas
    this.ctx.translate(this._totalTranslation.x, this._totalTranslation.y)
    this.ctx.rotate(this._rotation)

    // render grid
    this.showGrid && this.renderGrid()

    // render scene
    Object.values(this.scene.getTiles()).forEach(tile => {
      this.ctx.fillStyle = tile.color
      const rect = this.getTileRenderRect(tile)
      this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
  }

  private clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.fillStyle = '#eeeeee'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  private getTileRenderRect(tile: Tile): Rect {
    const x = tile.position.x * this._tileSize
    const y = -(tile.position.y + 1) * this._tileSize
    return {
      x,
      y,
      w: this._tileSize,
      h: this._tileSize
    }
  }

  private renderGrid() {
    const halfDiagonal = Math.sqrt(Math.pow(this.ctx.canvas.width, 2) + Math.pow(this.ctx.canvas.height, 2)) / 2
    const startX = this.ctx.canvas.width / 2 - halfDiagonal -halfDiagonal % this._tileSize
    const endX = -startX
    const startY = startX
    const endY = -startY
    const ctx = this.ctx
    ctx.strokeStyle = '#111111'
    let y = startY
    while (y <= endY) {
      ctx.beginPath()
      ctx.moveTo(startX, y)
      ctx.lineTo(endX, y)
      ctx.stroke()
      y += this._tileSize
    }
    let x = startX
    while (x <= endX) {
      ctx.beginPath()
      ctx.moveTo(x, startY)
      ctx.lineTo(x, endY)
      ctx.stroke()
      x += this._tileSize
    }
  }
}