<template>
  <g id = "sky" filter="url(#shadow)">
    <defs>
      <path
        id="levPath"
        :d="levPath"
      />
    </defs>
    <rect :style="styleObj"
          :x="x"
          :y="y"
          :width="width"
          :height="height"
    />
    <circle v-for = "(s,index) in stars"
          :key = "index"
          :style="starObj"
          :cx="s.x"
          :cy="s.y"
          :r="s.size"
    />
    <text
        v-show="gameStarted"
        x="0" y="0"
        :textAnchor="'middle'"
        :style = "{
          fill: '#e3e3e3',
          'font-size': '36px'
        }"
    >
      <textPath xlink:href="#levPath">
        LEV: {{ lev / 5}}, Gold: {{ gold }}
      </textPath>
    </text>
  </g>
</template>

<script>
import { pathFromBezierCurve } from '../utils/formula'
import { SKY_AND_GROUND_WIDTH, GAME_HEIGHT } from '../utils/constants'

const levLineCurve = {
  initialAxis: {
    x: -190,
    y: -950
  },
  initialControlPoint: {
    x: 95,
    y: -50
  },
  endingControlPoint: {
    x: 285,
    y: -50
  },
  endingAxis: {
    x: 380,
    y: 50
  }
}

export default {
  name: 'Sky',
  data () {
    return {
      x: SKY_AND_GROUND_WIDTH / -2,
      y: 100 - GAME_HEIGHT,
      width: SKY_AND_GROUND_WIDTH,
      height: GAME_HEIGHT,
      styleObj: {
        fill: '#000000'
        // fill: '#30abef'
      },
      starObj: {
        fill: '#ffffff'
        // fill: '#30abef'
      },
      stars: [],
      levPath: pathFromBezierCurve(levLineCurve)
    }
  },
  computed: {
    lev () {
      return this.$store.state.lev
    },
    gold () {
      return this.$store.state.gold
    },
    gameStarted () {
      return this.$store.state.started
    }
  },
  mounted () {
    for (var i = 0; i < 250; i++) {
      const star = {
        x: Math.floor(Math.random() * SKY_AND_GROUND_WIDTH - SKY_AND_GROUND_WIDTH / 2),
        y: -Math.floor(Math.random() * GAME_HEIGHT),
        size: Math.floor(Math.random() * 4) + 2
      }
      this.stars.push(star)
      this.$forceUpdate()
    }
  }
}
</script>

<style>
</style>
