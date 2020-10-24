import Vue from 'vue'
import Vuex from 'vuex'
import { calculateAngle, checkCollision } from '../utils/formula'
import {
  UFO_CREATE_INTERVAL,
  UFO_MAX_COUNT,
  UFO_START_POSITIONS,
  UFO_Y_AXIS,
  GAME_HEIGHT
} from '../utils/constants'
import FlyingObject from '../classes/FlyingObject'
import CannonBall from '../classes/CannonBall'
import * as moment from 'moment'

Vue.use(Vuex)

const state = {
  canonAngle: 30,
  started: false,
  win: false,
  lev: 5,
  gold: 0,
  kills: 0,
  lives: 5,
  ufo_animation_time: 8000,
  flyingObjects: [],
  lastObjectCreatedAt: 0,
  cannonBalls: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  'CHANGE_CANNON_ANGLE' (state, newAngle) {
    state.canonAngle = newAngle
  },
  'START_GAME' (state, ch) {
    // console.log(ch)
    state.started = true
    state.win = false
    state.ufo_animation_time = ch
  },
  'WIN_GAME' (state) {
    state.win = true
    state.started = false
    state.lev += 5
    state.ufo_animation_time *= 0.96
  },
  'STOP_GAME' (state) {
    state.win = false
    state.started = false
    state.lev = 5
    state.lives = 5
    state.ufo_animation_time = 8000
  },
  'RESET_KILLS' (state) {
    state.kills = 0
  },
  'INC_KILLS' (state, count) {
    state.kills += count
  },
  'DEC_LIVE' (state) {
    state.lives--
  },
  'RESET_LIVES' (state) {
    if (state.gold >= 100) {
      if (window.confirm('要用100金補血嗎?')) {
        state.lives += Math.floor(state.gold / 100)
        state.gold = state.gold % 100
      }
    }
    // state.lives = 5
  },
  'RESET_UFOS' (state) {
    state.flyingObjects = []
  },
  'ADD_UFO' (state, ufo) {
    state.flyingObjects.push(ufo)
  },
  'UPDATE_LAST_UFO_CREATED_AT' (state, ms) {
    state.lastObjectCreatedAt = ms
  },
  'REMOVE_CRASHED_UFOS' (state, now) {
    state.flyingObjects = state.flyingObjects.filter(ufo => {
      return (now - ufo.createdAt) < state.ufo_animation_time
    })
  },
  'DESTROY_UFOS' (state, destroyedIds) {
    state.flyingObjects = state.flyingObjects.filter(ufo => {
      return destroyedIds.indexOf(ufo.id) === -1
    })
  },

  'RESET_CANNON_BALLS' (state) {
    state.cannonBalls = []
  },
  'ADD_CANNON_BALL' (state, cannonBall) {
    state.cannonBalls.push(cannonBall)
  },
  'UPDATE_CANNON_BALLS' (state, newCannonBalls) {
    // dirty hack to replace array
    state.cannonBalls.splice(0, state.cannonBalls.length, ...newCannonBalls)
  },
  'DESTROY_CANNON_BALLS' (state, destroyedIds) {
    state.cannonBalls = state.cannonBalls.filter(ball => {
      return destroyedIds.indexOf(ball.id) === -1
    })
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  startGame: ({ commit }, ch) => {
    commit('RESET_KILLS')
    commit('RESET_LIVES')
    commit('RESET_CANNON_BALLS')
    commit('RESET_UFOS')
    commit('START_GAME', ch)
  },
  moveObjects: ({ commit, dispatch, state }, mousePosition) => {
    if (!mousePosition) {
      return
    }
    const { x, y } = mousePosition
    const newAngle = calculateAngle(0, 0, x, y)
    commit('CHANGE_CANNON_ANGLE', newAngle)

    dispatch('createFlyingObjects')
    dispatch('moveCannonBalls')
    dispatch('checkCollision')
    dispatch('checkGameEnd')
  },
  createFlyingObjects: ({ commit, state }) => { // todo maybe extract to a separate file
    if (!state.started) {
      return
    }
    const isTimeToCreate = moment().valueOf() - state.lastObjectCreatedAt > UFO_CREATE_INTERVAL
    if (!isTimeToCreate || state.flyingObjects.length >= UFO_MAX_COUNT) {
      return
    }

    const predefinedPosition = Math.floor(Math.random() * UFO_MAX_COUNT)
    const xPosition = UFO_START_POSITIONS[predefinedPosition]
    const msCreated = moment().valueOf()
    const type = ['ufo', 'ufo', 'ufo', 'ufo', 'ufo', 'ufo', 'ufo', 'ufo', 'boss', 'gift'][Math.floor(Math.random() * 10)]
    const flyingObject = new FlyingObject(xPosition, UFO_Y_AXIS, msCreated, type)
    commit('ADD_UFO', flyingObject)
    commit('UPDATE_LAST_UFO_CREATED_AT', msCreated)
  },
  checkGameEnd: ({ commit, state }) => {
    if (!state.started) {
      return
    }
    const ufoCountBefore = state.flyingObjects.filter((ufo) => ufo.type === 'ufo').length
    commit('REMOVE_CRASHED_UFOS', moment().valueOf())
    const ufoCountAfter = state.flyingObjects.filter((ufo) => ufo.type === 'ufo').length
    // means ufo crashed
    if (ufoCountBefore > ufoCountAfter) {
      commit('DEC_LIVE')
    }
    if (state.kills >= state.lev) {
      commit('WIN_GAME')
    }
    if (state.lives === 0) {
      commit('STOP_GAME')
    }
  },
  moveCannonBalls: ({ commit, state }) => {
    if (!state.started) {
      return
    }
    if (state.cannonBalls.length === 0) {
      return
    }
    const newBalls = state.cannonBalls.filter((ball) => {
      return ball.y > -800 && ball.x > -500 && ball.x < 500
    })
    newBalls.forEach(ball => ball.move())
    commit('UPDATE_CANNON_BALLS', newBalls)
  },
  checkCollision: ({ commit, state }) => {
    if (!state.started) {
      return
    }
    const destroyedUfoIds = []
    const destroyedBallIds = []
    state.flyingObjects.forEach(ufo => {
      const currTime = moment().valueOf() - ufo.createdAt
      const calcY = ufo.y + (currTime / state.ufo_animation_time) * GAME_HEIGHT
      const rectUfo = {
        x1: ufo.x - 40,
        y1: calcY - 10,
        x2: ufo.x + 40,
        y2: calcY + 10
      }

      state.cannonBalls.forEach(ball => {
        const rectBall = {
          x1: ball.x - 8,
          y1: ball.y - 8,
          x2: ball.x + 8,
          y2: ball.y + 8
        }
        if (checkCollision(rectUfo, rectBall)) {
          if (ufo.life === 1) {
            destroyedUfoIds.push(ufo.id)
          } else {
            ufo.life--
          }
          destroyedBallIds.push(ball.id)
          if (ufo.type === 'gift') {
            state.gold += Math.floor(Math.random() * 90) + 10
          }
          if (ufo.type === 'ufo') {
            state.gold += 5
          }
          if (ufo.type === 'boss') {
            state.gold += 20
          }
        }
      })
    })

    commit('INC_KILLS', destroyedUfoIds.length)
    commit('DESTROY_UFOS', destroyedUfoIds)
    commit('DESTROY_CANNON_BALLS', destroyedBallIds)
  },
  shoot: ({ commit, state }, mousePosition) => {
    if (!state.started) {
      return
    }
    if (state.cannonBalls.length === 4) {
      return
    }

    const { x, y } = mousePosition
    const angle = calculateAngle(0, 0, x, y)
    const cannonBall = new CannonBall(0, 0, angle)
    commit('ADD_CANNON_BALL', cannonBall)
  }
  // incrementAsync ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit('increment')
  //       resolve()
  //     }, 1000)
  //   })
  // }
}

// getters are functions
const getters = {
  // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
// 'modules': {
// 'account': account_store,
//   'products': products_store,
