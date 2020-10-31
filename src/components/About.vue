<template>
  <div class="about">
    <div>
      <img src = "../assets/big_ufo.jpg.jpg"/>
      <h1>遊戲說明</h1>
      <p>
        大家好！這是一個射飛碟的小遊戲
      </p>
      <p>
        射中一個飛碟得5金
      </p>
      <p>
        100金換一顆心
      </p>
      <p>
        飛碟落地就扣一顆心
      </p>
      <p>
        扣完心就結束了
      </p>
      <p>
        遊戲有四種難度，你可以任意選擇喔
      </p>
      <p>
        建議選擇煉獄模式喔!
      </p>
      <p>
        雖然他叫煉獄模式但其實我覺得很簡單好玩喔!
      </p>
    </div>
  </div>
</template>

<script>
</script>

<style>

.about{
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: black;
  width: 100vw;
  height: 100vh;
  color: white;
  font-size: 18px;
}

.about div {
  max-width: 420px;
  margin: 0 auto;
  text-align: left;
}

img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -2;
}

</style>
