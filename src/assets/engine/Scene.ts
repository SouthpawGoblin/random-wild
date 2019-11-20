import { Vec2 } from "./types";
import Tile from "./Tile";

export default class Scene {

  private size: Vec2
  private tiles: { [key: number]: Tile }[][]

  constructor(size: Vec2) {
    this.size = size
    this.tiles = []
  }

  getSize(): Vec2 {
    return this.size
  }

  addTile(tile: Tile) {
    const indexY = this.size.y / 2 - tile.position.y
    const indexX = this.size.x / 2 + tile.position.x
    if (indexX < 0 || indexX >= this.size.x || indexY < 0 || indexY >= this.size.y) {
      throw new Error('tile position out of boundary.')
    }
    this.tiles[indexY][indexX][tile.position.z] = tile
  }
}