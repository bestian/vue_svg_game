import BaseObject from './BaseObject'

export default class FlyingObject extends BaseObject {
  constructor (x, y, createdAt, type) {
    super(x, y)
    this.createdAt = createdAt
    this.type = type
  }
}
