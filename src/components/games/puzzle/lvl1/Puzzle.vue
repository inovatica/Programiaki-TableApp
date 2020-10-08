<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-puzzle'}" class="backBtn"></router-link>
    <router-link :to="{name:'puzzle-lvl2'}" class="nextBtn"></router-link>
    <header>
      <img class="animated headImage" src="../img/puzzle.svg"/>
    </header>
    <div class="puzzleContainer clear-fix">
      <div id="gameContent">
        <div ref="dropZone" id="dropZone"></div>
        <draggable v-model="list" class="dragArea"
                   :options="{draggable:'.item',ghostClass:'ghost',dragClass:'chosenClass'}" @start="dragStart()"
                   @end="dragEnd()">
          <img class="source item" v-for="e in list" draggable="true" :data-key="e.key" :id="e.id"
               :style="e.extraCss + 'left: ' + move[e.key].x + 'px; top:' + move[e.key].y + 'px'" :src="svgPath(e.item)"/>
        </draggable>
        <img data-key="c" ref="target" class="target" id="target" :src="svgPath(item)" width="200px"/>
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
          {id: 'source', key: "c", extraCss: "width: 150px;", item:'cat'},
        ],
        item: 'cat',
        move: {c:{x: 10, y: 10}},
        calc: {x: 0, y: 0},
        allowDrop: true
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
        this.$data.move.c.x = 10
        this.$data.move.c.y = 10
        this.$refs.resetLvlBtn.classList.add('hidden')
      },
      dragStart: function () {
        this.$data.current = event.target.getAttribute('data-key')
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

  #source {
    position: absolute;
    padding: 20px;
    background-color: rgba(0, 0, 255, 1);
    border-radius: 15px;
    z-index: 10;
  }

  #target {
    padding: 20px;
    background-color: rgba(0, 255, 0, .5);
    border-radius: 15px;
    position: absolute;
    right: 10%;
    bottom: 10%;
    opacity: .7;
    z-index: 9;
  }

  #dropZone {
    position: absolute;
    z-index: 8;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .ghost {
    opacity: 0;
  }

  .chosenClass {
    opacity: 1 !important;
  }
</style>
