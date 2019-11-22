import Renderer from "./Renderer";

export default class Controller {

  renderer: Renderer

  private leftDragging: boolean
  private rightDragging: boolean

  constructor(renderer: Renderer) {
    this.renderer = renderer
    this.leftDragging = false
    this.rightDragging = false
  }

  register() {
    const can = this.renderer.ctx.canvas
    // zooming
    can.addEventListener('wheel', this.handleWheel)
    // panning
    can.addEventListener('mousedown', this.handleMouseDown)
    can.addEventListener('mouseup', this.handleMouseUp)
    can.addEventListener('mouseleave', this.handleMouseLeave)
    can.addEventListener('mousemove', this.handleMouseMove)
    // prevent default context menu when rotating
    can.addEventListener('contextmenu', this.handleContextMenu)
  }

  unregister() {
    const can = this.renderer.ctx.canvas
    // zooming
    can.removeEventListener('wheel', this.handleWheel)
    // panning and rotation
    can.removeEventListener('mousedown', this.handleMouseDown)
    can.removeEventListener('mouseup', this.handleMouseUp)
    can.removeEventListener('mouseleave', this.handleMouseLeave)
    can.removeEventListener('mousemove', this.handleMouseMove)
    // prevent default context menu when rotating
    can.removeEventListener('contextmenu', this.handleContextMenu)
  }

  private handleWheel = (ev: WheelEvent) => {
    this.renderer.zoom += ev.deltaY > 0 ? -0.1 : 0.1
    this.renderer.zoom = this.renderer.zoom < 0.1 ? 0.1 : this.renderer.zoom
  }

  private handleMouseDown = (ev: MouseEvent) => {
    if (ev.button === 0) {
      this.leftDragging = true
    } else if (ev.button === 2) {
      this.rightDragging = true
    }
  }

  private handleMouseUp = (ev: MouseEvent) => {
    if (ev.button === 0) {
      this.leftDragging = false
    } else if (ev.button === 2) {
      this.rightDragging = false
    }
  }

  private handleMouseLeave = () => {
    this.leftDragging = false
    this.rightDragging = false
  }

  private handleMouseMove = (ev: MouseEvent) => {
    if (this.leftDragging) {
      this.renderer.translation = {
        x: this.renderer.translation.x + ev.movementX,
        y: this.renderer.translation.y + ev.movementY
      }
    } else if (this.rightDragging) {
      const degree = -ev.movementX / this.renderer.ctx.canvas.width * 180
      const currentDegree = this.renderer.rotation / Math.PI * 180
      const finalDegree = (currentDegree + degree) % 360
      this.renderer.rotation = finalDegree / 180 * Math.PI
    }
  }

  private handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault()
  }
}