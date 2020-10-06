<template>
  <g filter="url(#shadow)">
    <path
      :style="styleObj"
      :d="pathLeft"
    />
    <path
      :style="styleObj"
      :d="pathRight"
    />
  </g>
</template>
<script>
import { pathFromBezierCurve } from '../utils/formula'

export default {
  name: 'Heart',
  props: {
    x: {
      type: Number,
      required: true,
      default: 0
    },
    y: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      styleObj: {
        fill: '#da0d15',
        stroke: '#a51708',
        strokeWidth: '2px'
      }
    }
  },
  computed: {
    leftSide () {
      return {
        initialAxis: {
          x: this.x,
          y: this.y
        },
        initialControlPoint: {
          x: -20,
          y: -20
        },
        endingControlPoint: {
          x: -40,
          y: 10
        },
        endingAxis: {
          x: 0,
          y: 40
        }
      }
    },
    rightSide () {
      return {
        initialAxis: {
          x: this.x,
          y: this.y
        },
        initialControlPoint: {
          x: 20,
          y: -20
        },
        endingControlPoint: {
          x: 40,
          y: 10
        },
        endingAxis: {
          x: 0,
          y: 40
        }
      }
    },
    pathLeft () {
      return pathFromBezierCurve(this.leftSide)
    },
    pathRight () {
      return pathFromBezierCurve(this.rightSide)
    }
  }
}
</script>

<style>
</style>
