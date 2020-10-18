<template>
  <ellipse class="cannon-ball"
        :transform="transform"
        :style="styleObj"
        :cx="x"
        :cy="y"
        :rx="r / 4"
        :ry="r * 2"
  />
</template>

<script>
export default {
  name: 'CannonBall',
  props: {
    x: {
      type: Number,
      required: true,
      default: 0
    },
    y: {
      type: Number,
      required: true,
      default: 0
    },
    angle: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      r: 16,
      styleObj: {
        fill: '#24ffd3',
        // fill: '#777',
        stroke: '#444',
        strokeWidth: '2px'
      }
    }
  },
  computed: {
    transform () {
      return `rotate(${this.angle}, ${this.x}, ${this.y})`
    }
  }
}
</script>

<style>
</style>
