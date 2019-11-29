import Tile from "../Tiles/Tile";

export default class Scene {

  private tiles: { [key: string]: Tile }

  constructor() {
    this.tiles = { }
  }

  getTiles() {
    return this.tiles
  }

  addTile(tile: Tile) {
    const key = `${tile.position.x}_${tile.position.y}_${tile.position.z}`
    this.tiles[key] = tile
  }
}