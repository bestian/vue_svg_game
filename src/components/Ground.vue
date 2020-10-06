<template>
  <g id="ground">
    <rect id="ground-2"
          data-name="ground"
          :style="groundStyle"
          :x="x"
          :y="y"
          :width="width"
          :height="height"
    />
    <line :x1="x1"
          :y1="y1"
          :x2="x2"
          :y2="y2"
          :style="divisionStyle"
    />
  </g>
</template>

<script>
import { SKY_AND_GROUND_WIDTH } from '../utils/constants'
export default {
  name: 'Ground',
  data () {
    return {
      x: SKY_AND_GROUND_WIDTH / -2,
      y: 0,
      width: SKY_AND_GROUND_WIDTH,
      height: 100,
      groundStyle: {
        fill: '#59a941'
      },
      x1: SKY_AND_GROUND_WIDTH / -2,
      y1: 0,
      x2: SKY_AND_GROUND_WIDTH / 2,
      y2: 0,
      divisionStyle: {
        stroke: '#458232',
        strokeWidth: '3px'
      }
    }
  }
}
</script>

<style>
</style>
