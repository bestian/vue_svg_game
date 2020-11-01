<template>
  <g class="move" :style="styleAnimation">
    <rect v-show="type == 'gift'"
      :x="x"
      :y="y"
      :width="rx * 2"
      :height="ry * 8"
      :style="styleGift"
    />
    <rect v-show="type == 'ufo' || type == 'boss' "
      :x="x-rx*0.75"
      :y="y"
      :width="rx * 1.5"
      :height="ry * 1"
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
    <g v-if = "type == 'ufo' || type == 'boss' ">
      <rect v-for = "(s,idx) in shapes"
        :key = "idx"
        :style="styleTop[life]"
        :x="x + s[0]"
        :y="y + s[1]"
        :width="12"
        :height="12"
      />
    </g>
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
      shapes: [
        [-36, -36], [-24, -36], [-12, -36], [0, -36], [12, -36], [24, -36],
        [-36, -24], [-12, -24], [0, -24], [24, -24],
        [-36, -12], [-24, -12], [-12, -12], [0, -12], [12, -12], [24, -12]
      ],
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
