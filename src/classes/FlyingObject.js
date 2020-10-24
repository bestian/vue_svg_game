import BaseObject from './BaseObject'

export default class FlyingObject extends BaseObject {
  constructor (x, y, createdAt, type) {
    super(x, y)
    this.createdAt = createdAt
    this.type = type
    if (type === 'boss') {
      this.life = 4
    } else {
      this.life = 1
    }
  }
}
