<template>
  <g class="move" :style="styleAnimation">
    <rect v-show="type == 'gift'"
      :x="x"
      :y="y"
      :width="rx * 2"
      :height="ry * 8"
      :style="styleGift"
    />
    <ellipse v-show="type == 'ufo' || type == 'boss' "
      :cx="x"
      :cy="y"
      :rx="rx + life"
      :ry="ry + life"
      :style="styleBase[life]"
    />
    <ellipse v-show="life > 2 && (type == 'ufo' || type == 'boss') "
      :cx="x - 30"
      :cy="y + 20"
      :rx="rx - 35 + life"
      :ry="ry + 20 + life"
      :style="styleBase[life]"
    />
    <ellipse v-show="life > 0 && (type == 'ufo' || type == 'boss') "
      :cx="x - 10"
      :cy="y + 20"
      :rx="rx - 35 + life"
      :ry="ry + 20 + life"
      :style="styleBase[life]"
    />
    <ellipse v-show="life > 1 && (type == 'ufo' || type == 'boss') "
      :cx="x + 10"
      :cy="y + 20"
      :rx="rx - 35 + life"
      :ry="ry + 20 + life"
      :style="styleBase[life]"
    />
    <ellipse v-show="life > 3 && (type == 'boss' || type == 'boss') "
      :cx="x + 30"
      :cy="y + 20"
      :rx="rx - 35 + life"
      :ry="ry + 20 + life"
      :style="styleBase[life]"
    />
    <path v-show="type == 'ufo' || type == 'boss' "
      :style="styleTop[life]"
      :d="path"
    />
  </g>
</template>

<script>
import { pathFromBezierCurve } from '../utils/formula'

const baseWith = 40
const halfBase = baseWith / 2
const height = 25

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
    },
    type: {
      type: String,
      required: true,
      default: 'ufo'
    },
    life: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data () {
    return {
      rx: 40,
      ry: 10,
      styleGift: {
        fill: '#ffff47',
        // fill: '#979797',
        stroke: '#5c5c5c'
      },
      styleBase: [
        {
          fill: '#cf0000',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf9999',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf6666',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf3333',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf0000',
          stroke: '#5c5c5c'
        }
      ],
      styleTop: [
        {
          fill: '#cf0000',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf9999',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf6666',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf3333',
          stroke: '#5c5c5c'
        },
        {
          fill: '#cf0000',
          stroke: '#5c5c5c'
        }
      ]
    }
  },
  computed: {
    cubicBezierCurve () {
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
    path () {
      return pathFromBezierCurve(this.cubicBezierCurve)
    },
    styleAnimation () {
      return {
        animation: 'ufoMove ' + this.$store.state.ufo_animation_time / 1000 + 's linear'
      }
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
