import Renderer from "./Renderer";

export default class Controller {

  renderer: Renderer

  private dragging: boolean

  constructor(renderer: Renderer) {
    this.renderer = renderer
    this.dragging = false
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
  }

  unregister() {
    const can = this.renderer.ctx.canvas
    // zooming
    can.removeEventListener('wheel', this.handleWheel)
    // panning
    can.removeEventListener('mousedown', this.handleMouseDown)
    can.removeEventListener('mouseup', this.handleMouseUp)
    can.removeEventListener('mouseleave', this.handleMouseLeave)
    can.removeEventListener('mousemove', this.handleMouseMove)
  }

  private handleWheel = (ev: WheelEvent) => {
    this.renderer.zoom += ev.deltaY > 0 ? -0.1 : 0.1
    this.renderer.zoom = this.renderer.zoom < 0.1 ? 0.1 : this.renderer.zoom
  }

  private handleMouseDown = () => {
    this.dragging = true
  }

  private handleMouseUp = () => {
    this.dragging = false
  }

  private handleMouseLeave = () => {
    this.dragging = false
  }

  private handleMouseMove = (ev: MouseEvent) => {
    if (this.dragging) {
      this.renderer.translation.x += ev.movementX
      this.renderer.translation.y += ev.movementY
    }
  }
}