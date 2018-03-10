import BaseObject from './BaseObject'

export default class FlyingObject extends BaseObject {
  constructor(x, y, createdAt) {
    super(x, y)
    this.createdAt = createdAt
  }
}
