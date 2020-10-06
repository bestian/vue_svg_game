import { uuid } from '../utils/util'
export default class BaseObject {
  constructor (x, y) {
    this.id = uuid()
    this.x = x
    this.y = y
  }
}
