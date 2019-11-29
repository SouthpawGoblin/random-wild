import { Vec3 } from "../types";

export default class Tile {

  position: Vec3
  color: string

  constructor(pos: Vec3, color: string) {
    this.position = pos
    this.color = color
  }
}