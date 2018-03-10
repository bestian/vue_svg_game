<template>
  <g filter="url('#shadow')">
    <text :style="styleObj" x="300" y="80">{{ score }}</text>
  </g>
</template>

<script>
  export default {
    name: 'CurrentScore',
    props: {
      score: {
        type: Number,
        required: true,
        default: 0
      }
    },
    data() {
      return {
        styleObj: {
          fontFamily: '"Joti One", cursive',
          fontSize: 80,
          fill: '#d6d33e'
        }
      }
    }
  }
</script>

<style>
</style>
