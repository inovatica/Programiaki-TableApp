<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-lerndad'}" class="backBtn"></router-link>
    <router-link :to="{name:'lerndad-lvl22'}" class="nextBtn"></router-link>
    <header>
      <p class="title">
        <span class="navy-blue">P</span>
        <span class="green">o</span>
        <span class="orange">s</span>
        <span class="pink">e</span>
        <span class="light-blue">g</span>
        <span class="yellow">r</span>
        <span class="navy-blue">e</span>
        <span class="green">g</span>
        <span class="orange">u</span>
        <span class="pink">j&nbsp;&nbsp;&nbsp;</span>
        <span class="light-blue">k</span>
        <span class="yellow">o</span>
        <span class="navy-blue">l</span>
        <span class="green">o</span>
        <span class="orange">r</span>
        <span class="pink">y</span>
      </p>
    </header>
    <div class="puzzleContainer clear-fix">
      <div id="gameContent">
        <div ref="dropZone" id="dropZone"></div>
        <draggable v-model="list" class="dragArea"
                   :options="{draggable:'.item',ghostClass:'ghost',dragClass:'chosenClass'}" @start="dragStart()"
                   @end="dragEnd()">
          <div class="source item" v-for="e in list" draggable="true" :data-key="e.key" :id="e.id"
               :style="e.extraCss + 'left: ' + move[e.key].x + 'px; top:' + move[e.key].y + 'px'"></div>
        </draggable>
        <div data-key="rs" class="target" id="targetRedSquare"></div>
      </div>
    </div>
    <span @click="resetLvl" class="resetLvlBtn hidden" ref="resetLvlBtn"></span>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list: [
          {id: 'sourceRedSquare', key: "rs", extraCss: "width: 100px; height: 100px;"},
        ],
        move: {
          rs: {x: 10, y: 10}
        },
        calc: {x: 0, y: 0},
        allowDrop: true,
        current: "rs"
      }
    },
    methods: {
      checkDrop: function () {
        let okCount = 0;
        let inCount = 0;
        let targets = document.getElementsByClassName('target')
        let sources = document.getElementsByClassName('source')

        for (let target of targets) {
          let key = target.getAttribute('data-key')
          if (!this.$data.move.hasOwnProperty(key)) {
            continue;
          }

          if (this.$data.move[key].x > target.offsetLeft &&
            this.$data.move[key].x < target.offsetLeft + 150 &&
            this.$data.move[key].y > target.offsetTop &&
            this.$data.move[key].y < target.offsetTop + 150) {
            okCount++;
          }
        }

        for (let source of sources) {
          let key = source.getAttribute('data-key')
          for (let target of targets) {
            if (this.$data.move[key].x > target.offsetLeft &&
              this.$data.move[key].x < target.offsetLeft + 150 &&
              this.$data.move[key].y > target.offsetTop &&
              this.$data.move[key].y < target.offsetTop + 150) {
              inCount++;
              break;
            }
          }
        }
        if (okCount == sources.length) {
          return this.successDrop();
        }

        if (inCount == sources.length) {
          return this.failDrop();
        }
      },
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
      resetLvl: function () {
        this.$data.allowDrop = true
        this.$refs.dropZone.style.zIndex = 8
        this.$data.move = {
          rs: {x: 10, y: 10}
        }
        this.$refs.resetLvlBtn.classList.add('hidden')
      },
      dragStart: function () {
        this.$data.current = event.target.getAttribute('data-key')
        this.$data.calc.x = event.clientX
        this.$data.calc.y = event.clientY

        console.log(event.clientX,event.clientX)
      },
      dragEnd: function () {

        console.log(event.clientX,event.clientX)
        if (!this.$data.allowDrop)
          return;
        let diffX = event.clientX - this.$data.calc.x;
        let diffY = event.clientY - this.$data.calc.y;
        this.$data.calc.x = event.clientX;
        this.$data.calc.y = event.clientY;
        this.$data.move[this.$data.current].x += diffX;
        this.$data.move[this.$data.current].y += diffY;
        this.checkDrop();
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

  #sourceRedSquare {
    position: absolute;
    background-color: rgba(255, 0, 0, 1);
    z-index: 10;
  }

  #targetRedSquare {
    padding: 20px;
    background-color: #ff0000;
    position: absolute;
    right: 10%;
    top: 10%;
    z-index: 5;
    height: 150px;
    width: 150px;
    opacity: .9;
  }

  #dropZone {
    position: absolute;
    z-index: 8;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  p.title {
    font-family: 'RussoOne-Regular';
    font-size: 60px;
    color: #fff;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    letter-spacing: -4px;
    font-weight: 800;
  }

  .ghost {
    opacity: 0;
  }

  .chosenClass {
    opacity: 1 !important;
  }
</style>
