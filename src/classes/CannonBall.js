import BaseObject from './BaseObject'
import { radiansToDegrees, degreesToRadian } from '../utils/formula'

export default class CannonBall extends BaseObject {
  constructor (x, y, angle) {
    super(x, y)
    this.angle = angle
    this.speed = 10 // 50 is 10x slower
  }

  move () {
    const realAngle = (this.angle * -1) + 90
    const stepsX = radiansToDegrees(Math.cos(degreesToRadian(realAngle))) / this.speed
    const stepsY = radiansToDegrees(Math.sin(degreesToRadian(realAngle))) / this.speed
    this.x = this.x + stepsX
    this.y = this.y - stepsY
  }
}
