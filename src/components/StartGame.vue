<template>
  <g filter="url(#shadow)">
    <text v-for = "text in texts"
      :key = "text.y"
      :x="text.x"
      :y="text.y"
      :textAnchor="text.textAnchor"
      :style="text.style"
      @click="start($event,text.ch)"
    >
      {{ text.t[lang] }}
    </text>
  </g>
</template>

<script>
// import { GAME_WIDTH } from '../utils/constants'
export default {
  name: 'StartGame',
  props: ['lang'],
  data () {
    return {
      texts: [
        {
          textAnchor: 'middle', // center
          x: 0, // center relative to X axis
          y: -400, // 150 up
          style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer'
          },
          t: { 'zh-TW': '練習模式', 'en-US': 'Trail' },
          ch: 16000
        },
        {
          textAnchor: 'middle', // center
          x: 0, // center relative to X axis
          y: -300, // 150 up
          style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer'
          },
          t: { 'zh-TW': '簡易模式', 'en-US': 'Easy' },
          ch: 8000
        },
        {
          textAnchor: 'middle', // center
          x: 0, // center relative to X axis
          y: -200, // 50 up
          style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer'
          },
          t: { 'zh-TW': '困難模式', 'en-US': 'Difficult' },
          ch: 6000
        },
        {
          textAnchor: 'middle', // center
          x: 0, // center relative to X axis
          y: -100, // 50 up
          style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer'
          },
          t: { 'zh-TW': '煉獄模式', 'en-US': 'Inferno' },
          ch: 4000
        }
      ]
    }
  },
  methods: {
    start (event, ch) {
      // event.preventDefault()
      event.stopPropagation()
      // console.log(ch)
      this.$emit('start-game', ch)
    }
  }
}
</script>

<style>
</style>
