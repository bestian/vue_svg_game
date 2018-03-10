<template>
  <ellipse class="cannon-ball"
    :style="styleObj"
    :cx="x"
    :cy="y"
    :rx="r"
    :ry="r"
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
      }
    },
    data() {
      return {
        r: 16,
        styleObj: {
          fill: '#777',
          stroke: '#444',
          strokeWidth: '2px'
        }
      }
    }
  }
</script>

<style>
</style>
