<template>
  <g>
    <rect :style="styleObj"
          :x="x"
          :y="y"
          :width="width"
          :height="height"
    />
    <text
        :x="-200"
        :y="- height / 2 - 250"
        :textAnchor="'middle'"
        :style = "{
          fill: '#e3e3e3',
          'font-size': '36px'
        }"
    > LEV: {{ lev / 5}}, Gold: {{ gold }}
    </text>
  </g>
</template>

<script>
import { SKY_AND_GROUND_WIDTH, GAME_HEIGHT } from '../utils/constants'
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
      }
    }
  },
  computed: {
    lev () {
      return this.$store.state.lev
    },
    gold () {
      return this.$store.state.gold
    }
  }
}
</script>

<style>
</style>
