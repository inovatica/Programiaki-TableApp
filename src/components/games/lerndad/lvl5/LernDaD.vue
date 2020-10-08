<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-lerndad'}" class="backBtn"></router-link>
    <router-link :to="{name:'lerndad-lvl6'}" class="nextBtn"></router-link>
    <header>
      <!--<img class="animated headImage" src="../img/puzzle.svg"/>-->
      <p class="title">
        <span class="navy-blue">Z</span>
        <span class="green">i</span>
        <span class="orange">e</span>
        <span class="pink">l</span>
        <span class="light-blue">o</span>
        <span class="yellow">n</span>
        <span class="navy-blue">e&nbsp;&nbsp;&nbsp;</span>
        <span class="green">d</span>
        <span class="orange">o&nbsp;&nbsp;&nbsp;</span>
        <span class="pink">z</span>
        <span class="light-blue">i</span>
        <span class="yellow">e</span>
        <span class="navy-blue">l</span>
        <span class="green">o</span>
        <span class="orange">n</span>
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
               :style="'left: ' + move.x + 'px; top:' + move.y + 'px'"></div>
        </draggable>
        <div ref="targetfalse1" id="target"></div>
        <div ref="target" id="targetfalse1"></div>
        <div ref="targetfalse2" id="targetfalse2"></div>
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
      failDrop: function () {
        this.$data.allowDrop = false
        this.$refs.dropZone.style.zIndex = 11
        this.playErrorSound()
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
        }else if (this.$data.move.x > this.$refs.targetfalse1.offsetLeft &&
          this.$data.move.x < this.$refs.targetfalse1.offsetLeft + 150 &&
          this.$data.move.y > this.$refs.targetfalse1.offsetTop &&
          this.$data.move.y < this.$refs.targetfalse1.offsetTop + 150) {
          this.failDrop()
        }else if (this.$data.move.x > this.$refs.targetfalse2.offsetLeft &&
          this.$data.move.x < this.$refs.targetfalse2.offsetLeft + 150 &&
          this.$data.move.y > this.$refs.targetfalse2.offsetTop &&
          this.$data.move.y < this.$refs.targetfalse2.offsetTop + 150) {
          this.failDrop()
        }
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
    z-index: 10;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 75px 129.9px 75px;
    border-color: transparent transparent #00ff00 transparent;
  }
  #target {
    padding: 20px;
    background-color: rgba(255, 0, 0, .5);
    border-radius: 15px;
    position: absolute;
    right: 10%;
    top: 10%;
    opacity: .7;
    z-index: 9;
    height: 150px;
    width: 150px;
  }
  #targetfalse1 {
    padding: 20px;
    background-color: rgba(0, 255, 0, .5);
    border-radius: 15px;
    position: absolute;
    right: 25%;
    top: 30%;
    opacity: .7;
    z-index: 9;
    height: 150px;
    width: 150px;
  }
  #targetfalse2 {
    padding: 20px;
    background-color: rgba(0, 0, 255, .5);
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
