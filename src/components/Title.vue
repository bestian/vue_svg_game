<template>
  <g filter="url(#shadow)">
    <defs>
      <path
        id="AliensPath"
        :d="aliensPath"
      />
      <path
        id="GoHomePath"
        :d="homePath"
      />
    </defs>
    <text x="0" y="0" :style="styleObj">
      <textPath xlink:href="#AliensPath">
        射擊
      </textPath>
    </text>
    <text x="0" y="0" :style="styleObj">
      <textPath xlink:href="#GoHomePath">
        太空飛碟
      </textPath>
    </text>
  </g>
</template>

<script>
  import {pathFromBezierCurve} from '../utils/formula'

  const aliensLineCurve = {
    initialAxis: {
      x: -190,
      y: -950
    },
    initialControlPoint: {
      x: 95,
      y: -50
    },
    endingControlPoint: {
      x: 285,
      y: -50
    },
    endingAxis: {
      x: 380,
      y: 0
    }
  }
  const goHomeLineCurve = {
    ...aliensLineCurve,
    initialAxis: {
      x: -250,
      y: -780
    },
    initialControlPoint: {
      x: 125,
      y: -90
    },
    endingControlPoint: {
      x: 375,
      y: -90
    },
    endingAxis: {
      x: 500,
      y: 0
    }
  }

  export default {
    name: 'Title',
    data() {
      return {
        styleObj: {
          fontFamily: '"Joti One", cursive',
          fontSize: 120,
          fill: '#cbca62'
        },
        aliensPath: pathFromBezierCurve(aliensLineCurve),
        homePath: pathFromBezierCurve(goHomeLineCurve)
      }
    }
  }
</script>

<style>
</style>
