<template>
  <g class="move" :style="styleAnimation">
    <ellipse
      :cx="x"
      :cy="y"
      :rx="rx"
      :ry="ry"
      :style="styleBase"
    />
    <path
      :style="styleTop"
      :d="path"
    />
  </g>
</template>

<script>
  import {pathFromBezierCurve} from '../utils/formula'
  import {UFO_ANIMATION_TIME} from '../utils/constants'

  const baseWith = 40
  const halfBase = baseWith / 2
  const height = 25
  const time = UFO_ANIMATION_TIME / 1000

  export default {
    name: 'FlyingObject',
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
    data() {
      return {
        rx: 40,
        ry: 10,
        styleBase: {
          fill: '#979797',
          stroke: '#5c5c5c'
        },
        styleTop: {
          fill: '#b6b6b6',
          stroke: '#7d7d7d'
        },
        styleAnimation: {
          animation: `ufoMove ${time}s linear`
        }
      }
    },
    computed: {
      cubicBezierCurve() {
        return {
          initialAxis: {
            x: this.x - halfBase,
            y: this.y
          },
          initialControlPoint: {
            x: 10,
            y: -height
          },
          endingControlPoint: {
            x: 30,
            y: -height
          },
          endingAxis: {
            x: baseWith,
            y: 0
          }
        }
      },
      path() {
        return pathFromBezierCurve(this.cubicBezierCurve)
      }
    }
  }
</script>

<style>
  @keyframes ufoMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(1200px);
    }
  }
  /*.move {*/
    /*animation: ufoMove 4s linear;*/
  /*}*/
</style>
