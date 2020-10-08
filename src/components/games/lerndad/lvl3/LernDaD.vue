<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-lerndad'}" class="backBtn"></router-link>
    <router-link :to="{name:'lerndad-lvl4'}" class="nextBtn"></router-link>
    <header>
      <!--<img class="animated headImage" src="../img/puzzle.svg"/>-->
      <p class="title">
        <span class="navy-blue">N</span>
        <span class="green">i</span>
        <span class="orange">e</span>
        <span class="pink">b</span>
        <span class="light-blue">i</span>
        <span class="yellow">e</span>
        <span class="navy-blue">s</span>
        <span class="green">k</span>
        <span class="orange">i</span>
        <span class="pink">e&nbsp;&nbsp;&nbsp;</span>
        <span class="light-blue">d</span>
        <span class="yellow">o&nbsp;&nbsp;&nbsp;</span>
        <span class="navy-blue">n</span>
        <span class="green">i</span>
        <span class="orange">e</span>
        <span class="pink">b</span>
        <span class="light-blue">i</span>
        <span class="yellow">e</span>
        <span class="navy-blue">s</span>
        <span class="green">k</span>
        <span class="orange">i</span>
        <span class="pink">e</span>
        <span class="light-blue">g</span>
        <span class="yellow">o</span>
      </p>
    </header>
    <div class="puzzleContainer clear-fix">
      <div id="gameContent">
        <div ref="dropZone" id="dropZone"></div>
        <draggable v-model="list" class="dragArea" :options="{draggable:'.item',ghostClass:'ghost',dragClass:'chosenClass'}" @start="dragStart()" @end="dragEnd()">
          <div id="source" v-for="e in list" class="item" draggable="true"
               :style="'width: 100px;height: 100px; left: ' + move.x + 'px; top:' + move.y + 'px'"></div>
        </draggable>
        <div ref="target" id="target" @drop="successDrop"></div>
      </div>
    </div>
    <span @click="resetLvl" class="resetLvlBtn hidden" ref="resetLvlBtn"></span>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list: [{}],
        items: {banana: 'banana'},
        move: {x: 10, y: 10},
        calc: {x: 0, y: 0},
        allowDrop: true
      }
    },
    methods: {
      successDrop: function () {
        this.$data.allowDrop = false
        this.$refs.dropZone.style.zIndex = 11
        this.playSuccessSound()
        this.$refs.resetLvlBtn.classList.remove('hidden')
      },
      dragStart: function () {
        this.$data.calc.x = event.clientX
        this.$data.calc.y = event.clientY
      },
      dragEnd: function () {
        if (!this.$data.allowDrop)
          return;
        let diffX = event.clientX - this.$data.calc.x;
        let diffY = event.clientY - this.$data.calc.y;
        this.$data.calc.x = event.clientX;
        this.$data.calc.y = event.clientY;
        this.$data.move.x += diffX;
        this.$data.move.y += diffY;


        if (this.$data.move.x > this.$refs.target.offsetLeft &&
          this.$data.move.x < this.$refs.target.offsetLeft + 150 &&
          this.$data.move.y > this.$refs.target.offsetTop &&
          this.$data.move.y < this.$refs.target.offsetTop + 150) {
          this.successDrop()
        }
      },
      successDrop: function () {
        this.$data.allowDrop = false
        this.$refs.dropZone.style.zIndex = 11
        this.playSuccessSound()
        this.$refs.resetLvlBtn.classList.remove('hidden')
      },
      resetLvl: function () {
        this.$data.allowDrop = true
        this.$refs.dropZone.style.zIndex = 8
        this.$data.move.x = 10
        this.$data.move.y = 10
        this.$refs.resetLvlBtn.classList.add('hidden')
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

  #gameContent {
    position: relative;
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
    margin-top: 50px;
    margin-bottom: 200px;
    padding: 30px;
    min-height: 50vh;
  }

  #source {
    position: absolute;
    background-color: rgba(0, 0, 255, 1);
    border-radius: 200px;
    z-index: 10;
  }

  #target {
    padding: 20px;
    background-color: rgba(0, 0, 255, .8);
    border-radius: 15px;
    position: absolute;
    right: 10%;
    bottom: 10%;
    opacity: .7;
    z-index: 9;
    height: 150px;
    width: 150px;
  }

  #dropZone {
    position: absolute;
    z-index: 8;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  p.title{
    font-family: 'RussoOne-Regular';
    font-size: 60px;
    color: #fff;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    letter-spacing: -4px;
    font-weight: 800;
  }

  .ghost{
    opacity: 0;
  }

  .chosenClass{
    opacity: 1 !important;
  }
</style>
