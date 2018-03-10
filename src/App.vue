<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <Canvas></Canvas>
  </div>
</template>

<script>
  import Canvas from './components/Canvas'

  export default {
    name: 'App',
    components: {
      Canvas
    },
    mounted() {
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
</style>
