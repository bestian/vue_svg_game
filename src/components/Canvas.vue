<template>
  <svg ref="svg"
       id="my-game"
       :viewBox="viewBox"
       @mousemove="onMouseMove"
       @click="onClick">
    <defs>
      <filter id="shadow">
        <feDropShadow dx="1" dy="1" stdDeviation="2"/>
      </filter>
    </defs>
    <Sky/>
    <Ground/>
    <CannonBase/>
    <CannonBall
      v-for="cannonBall in cannonBalls"
      :key="cannonBall.id"
      :x="cannonBall.x"
      :y="cannonBall.y"
      :angle="cannonBall.angle"/>
    <CannonPipe :angle="canonAngle"/>
    <CurrentScore :score="currentScore"/>
    <Heart
      v-for="heart in hearts"
      :key="heart.id"
      :x="heart.x"
      :y="heart.y"/>

    <g v-if="!gameStarted && gameWin">
      <WinGame @start-game="startGame"/>
      <Title/>
    </g>

    <g v-if="!gameStarted && !gameWin">
      <StartGame @start-game="startGame"/>
      <Title/>
    </g>

    <g v-if="gameStarted">
      <FlyingObject
        v-for="ufo in flyingObjects"
        :key="ufo.id"
        :type="ufo.type"
        :life="ufo.life"
        :x="ufo.x"
        :y="ufo.y"/>
    </g>

  </svg>
</template>

<script>
import Sky from './Sky'
import Ground from './Ground'
import CannonBase from './CannonBase'
import CannonPipe from './CannonPipe'
import CannonBall from './CannonBall'
import CurrentScore from './CurrentScore'
import FlyingObject from './FlyingObject'
import Title from './Title'
import StartGame from './StartGame'
import WinGame from './WinGame'
import Heart from './Heart'
import { getCanvasPosition } from '../utils/formula'
import { GAME_HEIGHT } from '../utils/constants'
import BaseObject from '../classes/BaseObject'

const viewBox = [window.innerWidth / -2, 100 - GAME_HEIGHT, window.innerWidth, GAME_HEIGHT]
const HEART_START_Y = 35
const HEART_START_X = -70
const HEART_MARGIN = 30
export default {
  name: 'Canvas',
  components: {
    Sky,
    Ground,
    CannonBase,
    CannonPipe,
    CannonBall,
    CurrentScore,
    FlyingObject,
    Title,
    StartGame,
    WinGame,
    Heart
  },
  data () {
    return {
      viewBox: viewBox,
      canvasMousePosition: {
        x: 50,
        y: -100
      },
      lang: 'zh-TW',
      langs: ['zh-TW','en-US']    
    }
  },
  computed: {
    canonAngle () {
      return this.$store.state.canonAngle
    },
    currentScore () {
      return this.$store.state.kills
    },
    gameStarted () {
      return this.$store.state.started
    },
    gameWin () {
      return this.$store.state.win
    },
    flyingObjects () {
      return this.$store.state.flyingObjects
    },
    cannonBalls () {
      return this.$store.state.cannonBalls
    },
    hearts () {
      const arr = []
      for (let i = 0; i < this.$store.state.lives; i++) {
        arr.push(new BaseObject(HEART_START_X - (i * HEART_MARGIN), HEART_START_Y))
      }
      return arr
    }
  },
  methods: {
    onMouseMove (event) {
      const svgElem = this.$refs.svg
      this.canvasMousePosition = getCanvasPosition(event, svgElem)
    },
    startGame (ch) {
      // console.log(ch)
      this.$store.dispatch('startGame', ch)
    },
    onClick () {
      this.$store.dispatch('shoot', this.canvasMousePosition)
    }
  },
  mounted () {
    const vm = this
    setInterval(() => {
      vm.$store.dispatch('moveObjects', vm.canvasMousePosition)
    }, 10)
    window.onresize = () => {
      const cnv = document.getElementById('my-game')
      cnv.style.width = `${window.innerWidth}px`
      cnv.style.height = `${window.innerHeight}px`
    }
    window.onresize()
  }
}
</script>

<style>
  #my-game {
    border: 1px solid black;
  }
</style>
