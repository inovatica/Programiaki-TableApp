<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <header>
      <img class="animated headImage" src="./img/puzzle.svg"/>
    </header>
    <div class="puzzleContainer clear-fix">
      <canvas id="canvasPuzzle"></canvas>
      <img id="imager" :src="svgPath(items.banana)" style="display:none;"/>
      <button v-on:click="insertMessage">PUSH</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'puzzle',
    data(){
      return {
        items: {banana: 'banana'},
        svgPath: function (item) {
          return require('@/assets/img/svg/' + item + '.svg')
        }
      }
    },
    methods: {
      insertMessage: function () {
        var canvas = document.getElementById("canvasPuzzle");
        var ctx = canvas.getContext("2d");
        // Clear the canvas
        ctx.drawImage(imager, 0, 0);
      }
    }
  }
</script>

<style scoped>
  .headImage {
    max-width: 400px
  }

  .puzzleContainer {
    width: 70%;
    margin-left: 15%;
  }

  canvas {
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
    margin-top: 50px;
  }
</style>
