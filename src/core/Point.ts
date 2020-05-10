export class Point {
  readonly x: number
  readonly y: number
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add (p: Point) {
    return new Point(this.x + p.x, this.y + p.y)
  }

  sub (p: Point) {
    return new Point(this.x - p.x, this.y - p.y)
  }

  clone () {
    return new Point(this.x, this.y)
  }
}
