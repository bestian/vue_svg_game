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

    document.addEventListener('deviceready', onDeviceReady)

    function onDeviceReady () {
      const state = {}
      function setState (attr) {
        Object.assign(state, attr)
        render(state)
      }

      setState({
        error: '',
        status: 'Loading...',
        product1: {},
        product2: {}
      })

      // We will initialize the in-app purchase plugin here.

      if (!window.store) {
        console.log('Window.Store not available')
        return
      }
      // We should first register all our products or we cannot use them in the app.
      window.store.register([{
        id: 'my_subscription1',
        type: window.store.PAID_SUBSCRIPTION
      }, {
        id: 'my_subscription2',
        type: window.store.PAID_SUBSCRIPTION
      }])

      // Setup the receipt validator service.
      window.store.validator =
  'https://validator.fovea.cc/v1/validate?appName=tw.bestian.ufo&apiKey=76d9840c-6b7b-4388-b30b-06290b1304a3'

      // Show errors for 10 seconds.
      window.store.error(function (error) {
        setState({ error: `ERROR ${error.code}: ${error.message}` })
        setTimeout(function () {
          setState({ error: '' })
        }, 10000)
      })
      // Later, we will add our events handlers here
      // Load informations about products and purchases
      window.store.refresh()
      function render () {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = `
    <pre> 
    ${state.error}

    subscription: ${state.status}
    </pre>
            `
      }
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
