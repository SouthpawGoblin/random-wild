import { Vec3 } from "./types";

export default class Tile {
  position: Vec3

  constructor(pos: Vec3) {
    this.position = pos
  }
}