<template>
  <g filter="url(#shadow)">
    <rect
      :x="button.x"
      :y="button.y"
      :width="button.width"
      :height="button.height"
      :rx="button.r"
      :ry="button.r"
      :style="button.style"
      @click="onClick"
    />
    <text
      :x="text.x"
      :y="text.y"
      :textAnchor="text.textAnchor"
      :style="text.style"
      @click="onClick"
    >
      Tap To Start!
    </text>
  </g>
</template>

<script>
  import {GAME_WIDTH} from '../utils/constants'
  export default {
    name: 'StartGame',
    data() {
      return {
        button: {
          x: GAME_WIDTH / 2,
          y: -280,
          width: GAME_WIDTH,
          height: 200,
          r: 10,
          style: {
            fill: 'transparent',
            cursor: 'pointer'
          }
        },
        text: {
          textAnchor: 'middle', // center
          x: 0, // center relative to X axis
          y: -150, // 150 up
          style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer'
          }
        }
      }
    },
    methods: {
      onClick(event) {
        // event.preventDefault()
        event.stopPropagation()
        this.$emit('start-game')
      }
    }
  }
</script>

<style>
</style>
