<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-shapes'}" class="backBtn"></router-link>
    <router-link :to="{name:'shapes-main', params: {id: level.next }}" class="nextBtn"
                 v-on:click.native="changeLevel"></router-link>
    <header>
      <img class="animated headImage" src="../img/maze.svg"/>
    </header>
    <div class="puzzleContainer clear-fix">
      <div id="gameContent">
        <template v-for="row in matrix">
          <div v-for="col in row" :class="'item bcg-'+keys[col]"></div>
        </template>
        <div class="bcg-bee fly-item bcg-bee_left"
             :style="'left: ' + (mainMovingObject.currentPos.x * width - 80) + 'px; top: ' + (mainMovingObject.currentPos.y * width + 70) + 'px'"></div>
        <div class="bcg-target" ref="target"
             :style="'left: ' + (end.col * width + 40) + 'px; top: ' + (end.row * width + 30) + 'px; width:'+width+'px; height:'+width+'px;'">
        </div>
      </div>
    </div>
    <Slotsview/>
  </div>
</template>

<script>
  export default {
    mounted(){
      this.getCards();
      this.socketSend({task: 'last_state'});
      window.addEventListener('keydown', this.disableF5);
      // if (screen.orientation.type == "landscape-primary"){
      //   this.$data.table = this.$parent.$parent.$data.table.Table.slots.down;
      // }
    },
    created(){
      this.changeLevel();
    },
    data(){
      return {
        level: {
          actual: 1,
          next: 2,
          count: 1
        },
        gamesMap: [],
        buttonsState: {
          validateButton: {
            show: true,
            active: true
          },
          repeatButton: {
            show: false,
            active: true
          },
        },
        gameSet: {
          directionArrows: false,
          currentLevel: this._routerRoot._route.params.id,
          timeBetweenMoves: 500, //miliseconds
          move: 1000 //if u want to change this prop u have to change in css too (transition duration on .bcg-bee)
        },
        gameInfo: {
          state: 1, //4 end
          valid: true,
          showStepsLogs: true
        },
        items: {banana: 'banana'},
        matrix: [],
        validField: ["h", "v", "r", "l", "u", "d", "c", "ft", "tr"],
        end: {row: 0, col: 0},
        start: {row: 0, col: 0},
        width: 168,
        keys: {
          t: 'tree',
          s: 'stone',
          h: 'horizontal',
          v: 'vertical',
          b: 'bee',
          w: 'watter',
          r: 'corner-r',
          l: 'corner-l',
          u: 'corner-ru',
          d: 'corner-rd',
          spv: "spider-v",
          sph: "spider-h",
          c: "cross",
          t2: "tree2",
          ft: 'tree',
          tr: 'transparent'
        },
        noCardSignal: "404",
        cards: [],
        steps: [],
        finalSteps: [],
        table: this.$parent.$parent.$data.table.Table.slots.up,
        mainMovingObject: {
          currentPos: {
            x: 0,
            y: 0,
            orientation: 1, // 1 - up, 2 - right, 3 - down, 4 - left
          },
        },
        stepFlag: true,
        fieldsToVisit: ['s'],
        visitedCount: 0
      }
    },
    computed: {
      rotateMe(){
        switch (this.mainMovingObject.currentPos.orientation) {
          case 1:
            return 'bcg-bee_up shadow1';
          case 2:
            return 'bcg-bee_right shadow2';
          case 3:
            return 'bcg-bee_down shadow1';
          case 4:
            return 'bcg-bee_left shadow2';
          default:
            return 'bcg-bee_left shadow2';
        }
      }
    },
    methods: {
      disableF5(e) {
        if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82)
          e.preventDefault();
        this.fillMatrix();
      },
      changeLevel(){
        this.fillMatrix();
        this.repeatButton();
        if (this._routerRoot._route.params.id + 1 <= this.level.count) {
          this.level.next = this._routerRoot._route.params.id + 1;
        }
        else {
          this.level.next = this._routerRoot._route.params.id;
        }
      },
      fillMatrix(){
        delete require.cache[require.resolve('@/components/games/shapes/main/map.json')];
        let gamesMap = require('@/components/games/shapes/main/map.json');
        this.matrix = gamesMap[Number(this._routerRoot._route.params.id) - 1].matrix;
        this.mainMovingObject.currentPos.orientation = Number(gamesMap[Number(this._routerRoot._route.params.id) - 1].orientation);
        this.start.col = Number(gamesMap[Number(this._routerRoot._route.params.id) - 1].start.col);
        this.start.row = Number(gamesMap[Number(this._routerRoot._route.params.id) - 1].start.row);
        this.end.col = Number(gamesMap[Number(this._routerRoot._route.params.id) - 1].end.col);
        this.end.row = Number(gamesMap[Number(this._routerRoot._route.params.id) - 1].end.row);
        this.mainMovingObject.currentPos.x = this.start.col;
        this.mainMovingObject.currentPos.y = this.start.row;
        this.level.count = gamesMap.length;
        this.fieldsToVisit = gamesMap[Number(this._routerRoot._route.params.id) - 1].fieldsToVisit;
        if (gamesMap[Number(this._routerRoot._route.params.id) - 1].directionArrows !== undefined) {
          this.directionArrows = gamesMap[Number(this._routerRoot._route.params.id) - 1].directionArrows;
          console.log("%c[R2D2]", 'color:blue', " - Direction arrows enabled.");
        }
        this.visitedCount = 0

      },
      repeatButton(){
        this.gameInfo.state = 1;
        this.gameInfo.valid = true;
        this.mainMovingObject.currentPos.x = this.start.col;
        this.mainMovingObject.currentPos.y = this.start.row;
        this.buttonsState.repeatButton.show = false;
        this.buttonsState.validateButton.show = true;
        this.stepFlag = true;
        this.steps = [];
        this.finalSteps = [];
        this.visitedCount = 0
        this.$refs.target.style.borderColor = 'white'
      },
      checkButton(){
        if (this.buttonsState.validateButton.active) {
          this.buttonsState.validateButton.active = false;
          this.buildStepList();
        }
      },
      buildCardsInstances(_data){ //pseudoInstances
        for (let count in _data) {
          this.$data.cards.push({
            id: _data[count].id,
            title: _data[count].object.title,
            type: _data[count].object.type,
            card_num: _data[count].card_num,
            image: _data[count].object.image,
            sound: _data[count].object.sound
          });
        }
        console.log("%c[R2D2]", 'color:blue', " - Cards for \"Maze\" game received from server: ", this.$data.cards);
      },
      getCards() {
        let _data = require('@/mok/shapes_cards.json');

        // let xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function () {
        //   let DONE = 4; // readyState 4 means the request is done.
        //   let OK = 200; // status 200 is a successful return.
        //   if (xhr.readyState === DONE) {
        //     if (xhr.status === OK) {
        //       console.log(xhr.responseText);
        //     } else {
        //       console.log("%c[R2D2]", 'color:blue', " - Cards request AJAX Error: " + xhr.status); // An error occurred during the request.
        //     }
        //   }
        // };
        // xhr.open('GET', '@/mok/maze_cards.json');s
        // xhr.send(null);

        this.buildCardsInstances(_data);
      },
      findMeCard(id){
        if (id == this.noCardSignal) {
          return this.noCardSignal;
        }
        // console.log("id - "+id);
        for (let card in this.cards) {
          if (this.cards.hasOwnProperty(card)) {
            if (this.cards[card].card_num === id) {
              return this.cards[card];
            }
          }
        }
        return false;
      },
      buildStepList() {
        let multiple = 1;
        this.steps = [];
        for (let step in this.table) {
          if (this.table.hasOwnProperty(step)) {
            // console.log(this.table[step].data);
            if (this.table[step].data == this.noCardSignal) {
              // console.log("odrzucam 404");
            }
            else if (this.findMeCard(this.table[step].data) === false) {
              this.gameInfo.valid = false;
              // console.log("%c[R2D2]",'color:blue'," - Not valid detected cards: ", this.steps);
            }
            else {
              if (this.findMeCard(this.table[step].data).title[0] == "*") {
                if (Number.isInteger(Number(this.findMeCard(this.table[step].data).title[1]))) {
                  multiple = Number(this.findMeCard(this.table[step].data).title[1]);
                }
              } else {
                for (let i = 0; i < multiple; i++) {
                  this.steps.push(this.findMeCard(this.table[step].data));
                }
                multiple = 1;
              }
            }
          }
        }
        console.log("%c[R2D2]", 'color:blue', " - List of cards passed validation: ", this.steps);
        this.actualize();
      },
      actualize(){
        let toDoArray = [];
        for (let count of this.steps) {
          if (count.title == "Prosto") {
            toDoArray.push(() => {
              switch (this.mainMovingObject.currentPos.orientation) {
                case 1:
                  if (this.stepFlag === true) {
                    this.mainMovingObject.currentPos.y--;
                  }
                  break;
                case 2:
                  if (this.stepFlag === true) {
                    this.mainMovingObject.currentPos.x++;
                  }
                  break;
                case 3:
                  if (this.stepFlag === true) {
                    this.mainMovingObject.currentPos.y++;
                  }
                  break;
                case 4:
                  if (this.stepFlag === true) {
                    this.mainMovingObject.currentPos.x--;
                  }
                  break;
              }
              if (this.gameInfo.showStepsLogs) {
                console.log("Prosto");
              }
            });
          }
          else if (count.title === "Lewo") {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation--;
                if (this.mainMovingObject.currentPos.orientation < 1) this.mainMovingObject.currentPos.orientation = 4;
              }
              if (this.gameInfo.showStepsLogs) {
                console.log("Lewo");
              }
            });

          }
          else if (count.title === "Prawo") {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation++;
                if (this.mainMovingObject.currentPos.orientation > 4) this.mainMovingObject.currentPos.orientation = 1;
              }
              if (this.gameSet.showStepsLogs) {
                console.log("Prawo");
              }
            });
          }
          else if (count.title === "wGórę" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 1;
                this.mainMovingObject.currentPos.y--;
              }
              if (this.gameSet.showStepsLogs) {
                console.log("Strzałka w górę");
              }
              this.$refs.target.style.borderLeft = '5px solid yellow'
            });
          }
          else if (count.title === "wDół" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 3;
                this.mainMovingObject.currentPos.y++;
              }
              if (this.gameSet.showStepsLogs) {
                console.log("Strzałka w górę");
              }
              this.$refs.target.style.borderRightColor = 'yellow'
            });
          }
          else if (count.title === "wPrawo" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 2;
                this.mainMovingObject.currentPos.x++;
              }
              if (this.gameSet.showStepsLogs) {
                console.log("Strzałka w górę");
              }
              this.$refs.target.style.borderTopColor = 'yellow'
            });
          }
          else if (count.title === "wLewo" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 4;
                this.mainMovingObject.currentPos.x--;
              }
              if (this.gameSet.showStepsLogs) {
                console.log("Strzałka w górę");
              }
              this.$refs.target.style.borderBottomColor = 'yellow'
            });
          }
        }
        if (this.gameInfo.showStepsLogs) {
          console.log("%c[R2D2]", 'color:blue', " - Steps array: ", toDoArray);
        }
        this.executeFuncInSetTime(toDoArray);
      },
      executeFuncInSetTime(array){
        let timeStack = this.gameSet.timeBetweenMoves + this.gameSet.move;
        for (let i = 0; i < array.length; i++) {
          setTimeout(() => {
            array[i]();
            this.validateMove();
          }, timeStack * (i + 1));

          if (i === 0) {
            setTimeout(() => {
              this.buttonsState.validateButton.active = true;
            }, timeStack * (array.length));
          }
        }
      },
      validateMove(){
        for (let allowed of this.fieldsToVisit) {
          if (this.mainMovingObject.currentPos.x == allowed.x && this.mainMovingObject.currentPos.y == allowed.y) {
            this.visitedCount++
          }
        }

        let validFlag = false;
        for (let allowed of this.validField) {
          if (this.matrix[this.mainMovingObject.currentPos.y][this.mainMovingObject.currentPos.x] == allowed) {
            validFlag = true;
          }
        }
        if ((this.matrix[this.mainMovingObject.currentPos.y][this.mainMovingObject.currentPos.x] == 'spv') || (this.matrix[this.mainMovingObject.currentPos.y][this.mainMovingObject.currentPos.x] == 'sph')) {
          this.wrongWay();
          this.moveSpider();
          return false;
        }
        if ((this.mainMovingObject.currentPos.y === this.end.row) && (this.mainMovingObject.currentPos.x == this.end.col)) {
          this.win();
        }
        if (!validFlag) {
          this.wrongWay();
          this.stepFlag = false;
        }
        if (this.visitedCount == 4) {
          this.win()
        }

      },
      wrongWay(){
        if (this.gameInfo.state !== 4) {
          this.gameInfo.state = 4;
          this.stepFlag = false;
          this.playErrorSound();
          this.buttonsState.validateButton.show = false;
          this.buttonsState.repeatButton.show = true;
        }
      },
      win(){
        if (this.gameInfo.state !== 4) {
          this.gameInfo.state = 4;
          this.stepFlag = false;
          this.playSuccessSound();
          this.buttonsState.validateButton.show = false;
          this.buttonsState.repeatButton.show = true;
        }
      }
    }
  };
</script>

<style scoped>
  .headImage {
    max-width: 400px;
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
    margin-bottom: auto;
    padding: 30px;
    min-height: 50vh;
  }

  .item {
    width: 12.5%;
    float: left;
    margin: 0;
    padding: 0;
    padding-bottom: 12.5%;
    background: #0fae51;
  }

  .fly-item {
    width: 12.5%;
    margin: 0;
    padding: 0;
    padding-bottom: 12.5%;
    position: absolute;
    z-index: 20;
  }

  .finish-item {
    width: 12.5%;
    margin: 0;
    padding: 0;
    padding-bottom: 12.5%;
    position: absolute;
    z-index: 20;
  }

  .bcg-bee {
    background-repeat: no-repeat;
    background-size: 60% 60%;
    background-position: 100% 40%;
    transition-duration: 1.5s;
    z-index: 100;
  }

  .shadow1::before {
    content: '';
    width: 160px;
    height: 168px;
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    background-size: 60% 60%;
    background-position: 100% 40%;
    background-image: url("../img/shadow.svg");
    animation: quickBack1shadow 3s infinite;
    transition-duration: 1.5s;
  }

  .shadow2::before {
    content: '';
    width: 160px;
    height: 168px;
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    background-size: 60% 60%;
    background-position: 100% 40%;
    background-image: url("../img/shadow_2.svg");
    animation: quickBack1shadow 3s infinite;
    transition-duration: 1.5s;
  }

  .bcg-bee_left {
    background-image: url("../img/pencil.svg");
  }

  .bcg-bee_right {
    background-image: url("../img/pencil.svg");
  }

  .bcg-bee_up {
    background-image: url("../img/pencil.svg");
  }

  .bcg-bee_down {
    background-image: url("../img/pencil.svg");
  }

  .bcg-flower {
    background-image: url("../img/flower.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;
    transform: scale(0.4, 0.4);
    transition-duration: 0.6s;
  }

  .bigger {
    transform: scale(0.6, 0.6);
  }

  .bcg-tree {
    background-image: url("../img/tree.jpg");
    background-repeat: no-repeat;
    background-size: 90% 90%;
    background-position: center center;
  }

  .bcg-watter {
    background-image: url("../img/water.jpg");
    background-repeat: no-repeat;
  }

  .bcg-horizontal {
    background-image: url("../img/horizontal.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .bcg-vertical {
    background-image: url("../img/vertical.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .bcg-tree2 {
    background-image: url("../img/field_tree_2.jpg");
    background-repeat: no-repeat;
    background-size: 90% 90%;
    background-position: center center;
  }

  .bcg-corner-r {
    background-image: url("../img/road_curv_right.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    box-sizing: border-box;
  }

  .bcg-cross {
    background-image: url("../img/road_crossing.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .bcg-corner-l {
    background-image: url("../img/road_curv_left.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .bcg-corner-ru {
    background-image: url("../img/road_curv_right.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(-90deg);
  }

  .bcg-corner-rd {
    background-image: url("../img/road_curv_left.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(90deg);

  }

  .bcg-stone {
    background-image: url("../img/stone.jpg");
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: center bottom;
  }

  .bcg-target {
    border: 5px solid #fff;
    position: absolute;
    box-sizing: border-box;
  }

</style>
