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
    <nav class="fix top middle">
      <!--  <select v-model="lang">
        <option v-for="l in langs" :value="l" :key="l">{{l}}</option>
      </select>  -->
      <router-link to="/">{{ {'zh-TW': '玩遊戲', 'en-US': 'Play'}[lang] }}</router-link>
      <router-link to="/about">{{ {'zh-TW': '看說明', 'en-US': 'About'}[lang] }}</router-link>
    </nav>
    <!--<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fbestian.github.io%2Fvue_svg_game%2F&layout=button_count&size=small&appId=485195848253155&width=71&height=20" title="facebook" width="71" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe> -->
    <router-view :lang="lang"/>
    <h1></h1>
  </div>
</template>

<script>

import Aplayer from 'vue-aplayer'

export default {
  name: 'App',
  components: {
    Aplayer
  },
  data () {
    return {
      lang: 'zh-TW',
      langs: ['zh-TW', 'en-US']
    }
  },
  mounted () {
    var elements = document.getElementsByClassName('aplayer-icon')
    for (var index = 0; index < elements.length; index++) {
      elements[index].setAttribute('name', 'Play')
      elements[index].setAttribute('aria-label', 'Play')
    }
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

  nav.fix.top.middle {
    position: fixed;
    top: 0;
    left: 15vw;
    color: white;
    z-index: 99999;
  }

  nav a {
    color: white;
    text-decoration: none !important;
    margin: 0 .5em;
    font-size: 18px;
  }

  nav a.router-link-exact-active {
    color: transparent;
  }

  .fix, .aplayer {
    position: fixed;
    top: 0;
    left: 0;
  }

  iframe {
    position: fixed;
    top: 0;
    right: 0;
  }
</style>
