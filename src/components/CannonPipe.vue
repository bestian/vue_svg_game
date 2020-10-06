<template>
  <g :transform="transform" class="cannon-pipe">
    <path
      :style="styleObj"
      :d="path"
    />
    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :style="styleObj"
    />
  </g>
</template>

<script>
import { pathFromBezierCurve } from '../utils/formula'

const muzzleWidth = 40
const halfMuzzle = muzzleWidth / 2
const height = 100
const yBasis = 70

const cubicBezierCurve = {
  initialAxis: {
    x: -halfMuzzle,
    y: -yBasis
  },
  initialControlPoint: {
    x: -40,
    y: height * 1.7
  },
  endingControlPoint: {
    x: 80,
    y: height * 1.7
  },
  endingAxis: {
    x: muzzleWidth,
    y: 0
  }
}

export default {
  name: 'CannonPipe',
  props: {
    angle: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      x1: -halfMuzzle,
      y1: -yBasis,
      x2: halfMuzzle,
      y2: -yBasis,
      styleObj: {
        fill: '#999',
        stroke: '#666',
        strokeWidth: '2px'
      },
      path: pathFromBezierCurve(cubicBezierCurve)
    }
  },
  computed: {
    transform () {
      return `rotate(${this.angle}, 0, 0)`
    }
  }
}
</script>

<style>
</style>
