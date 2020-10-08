<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'GamesList'}" class="backBtn"></router-link>
    <header>
      <img class="animated headImage" src="../img/puzzle.svg"/>
    </header>
    <div class="puzzleContainer clear-fix">
      <div id="gameContent">
        <div ref="dropZone" id="dropZone"></div>
        <draggable v-model="list" class="dragArea"
                   :options="{draggable:'.item',ghostClass:'ghost',dragClass:'chosenClass'}"
                   @start="dragStart()" @end="dragEnd()">
          <img class="item" v-for="e in list" draggable="true" :data-key="e.no"
               :style="'left:'+move[e.no].x+'px;top:'+move[e.no].y+'px'"
               :src="localPath(item, e.no + '_' + list.length + '.svg')"/>
        </draggable>
      </div>
    </div>
    <span @click="resetLvl" class="resetLvlBtn hidden" ref="resetLvlBtn"></span>
  </div>
</template>

<script>
  export default {
    name: 'puzzle-lvl1',
    data(){
      return {
        list: [
          {no: 1},
          {no: 2},
          {no: 3},
        ],
        move: {
          1: {x: 800, y: 400},
          2: {x: 450, y: 200},
          3: {x: 0, y: 0}
        },
        item: 'bee',
        current: null,
        allowDrop: true,
        calc: {x: 0, y: 0},
        allowedMargin: 200
      }
    },
    methods: {
      successDrop: function () {
        this.$data.allowDrop = false
        this.$refs.dropZone.style.zIndex = 11
        this.playSuccessSound()
        this.$refs.resetLvlBtn.classList.remove('hidden')
      },
      localPath(name, el){
        return require('../img/' + name + '/' + el)
      },
      resetLvl: function () {
        this.$data.allowDrop = true
        this.$refs.dropZone.style.zIndex = 8
        this.$data.move = {
          1: {x: 800, y: 400},
          2: {x: 450, y: 200},
          3: {x: 0, y: 0}
        };
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
      },
      checkDrop: function () {
        let items = document.getElementsByClassName('item');
        let y = parseInt(items[0].style.left);
        let isOk = true;
        let calcX = {};

        for (let item of items) {
          let itemY = parseInt(item.style.left);
          if (itemY < y - this.allowedMargin || itemY > y + this.allowedMargin) {
            isOk = false;
          }
          calcX[item.getAttribute('data-key')] = {x: parseInt(item.style.top), height: item.offsetHeight}
        }

        let lastX = calcX[1].x;
        let lastHeight = calcX[1].height;

        for (let el of [...Array(items.length).keys()]) {
          let currentNo = el + 1;
          if (currentNo === 1) continue;

          console.log(lastHeight + lastX - this.allowedMargin, calcX[currentNo].x);

          if ((lastHeight + lastX - this.allowedMargin) > calcX[currentNo].x || (lastHeight + lastX) + this.allowedMargin < calcX[currentNo].x) {
            isOk = false;
          }

        }
        console.log('x is ', isOk)

        if (isOk) {
          this.successDrop();
        }

      }
    }
  }
</script>

<style scoped>

  .item {
    position: absolute;
    width: 350px;
  }

  .headImage {
    max-width: 400px
  }

  .puzzleContainer {
    width: 70%;
    margin-left: 15%;
  }

  #gameContent {
    position: relative;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 200px;
    padding: 30px;
    height: 100%;
  }

  .ghost {
    opacity: 0;
  }

  .chosenClass {
    opacity: 1 !important;
  }
</style>
