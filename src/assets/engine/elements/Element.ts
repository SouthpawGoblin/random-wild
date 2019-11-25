export default abstract class Element {

  name: string

  constructor(name: string) {
    this.name = name
  }

  // react with another element, return a result element
  abstract react(other: Element): Element
}