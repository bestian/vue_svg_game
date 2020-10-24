<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class="fix">
      <aplayer autoplay mini :repeat="'repeat-one'"
      :music="{
        title: 'Background',
        artist: 'Game',
        src: 'https://bestian.github.io/vue_svg_game/happy.mp3'
      }"/>
    </div>
    <Canvas></Canvas>
  </div>
</template>

<script>

import Aplayer from 'vue-aplayer'
import Canvas from './components/Canvas'

export default {
  name: 'App',
  components: {
    Aplayer,
    Canvas
  },
  mounted () {
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
  @import url('https://fonts.googleapis.com/css?family=Joti+One');

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  html, body {
    overflow: hidden;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .fix, .aplayer {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
