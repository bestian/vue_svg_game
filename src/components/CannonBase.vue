<template>
  <g class="cannon-base">
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
  import {pathFromBezierCurve} from '../utils/formula'

  const baseWith = 80
  const halfBase = baseWith / 2
  const height = 60
  const negativeHeight = height * -1
  const cubicBezierCurve = {
    initialAxis: {
      x: -halfBase,
      y: height
    },
    initialControlPoint: {
      x: 20,
      y: negativeHeight
    },
    endingControlPoint: {
      x: 60,
      y: negativeHeight
    },
    endingAxis: {
      x: baseWith,
      y: 0
    }
  }

  export default {
    name: 'CannonBase',
    data() {
      return {
        x1: -halfBase,
        y1: height,
        x2: halfBase,
        y2: height,
        styleObj: {
          fill: '#a16012',
          stroke: '#75450e',
          strokeWidth: '2px'
        },
        path: pathFromBezierCurve(cubicBezierCurve)
      }
    }
  }
</script>

<style>
</style>
