<template>
  <rect :style="styleObj"
        :x="x"
        :y="y"
        :width="width"
        :height="height"
  />
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
        fill: '#30abef'
      }
    }
  }
}
</script>

<style>
</style>
