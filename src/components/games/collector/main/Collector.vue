<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-collector'}" class="backBtn"></router-link>
    <router-link :to="{name:'collector-main', params: {id: level.next }}" class="nextBtn"  v-on:click.native="changeLevel"></router-link>
    <header>
      <p class="title">
        <span class="navy-blue">P</span>
        <span class="green">s</span>
        <span class="orange">z</span>
        <span class="pink">c</span>
        <span class="orange">z</span>
        <span class="light-blue">ó</span>
        <span class="yellow">ł</span>
        <span class="navy-blue">k</span>
        <span class="green">a&nbsp;&nbsp;&nbsp;</span>
        <span class="orange">c</span>
        <span class="light-blue">z</span>
        <span class="pink">ę</span>
        <span class="light-blue">ś</span>
        <span class="yellow">ć&nbsp;&nbsp;&nbsp;</span>
        <span class="navy-blue">2</span>
      </p>
    </header>
    <div class="puzzleContainer clear-fix">
      <div id="gameContent">
        <template v-for="row in matrix">
          <div v-for="col in row" :class="'item bcg-'+keys[col]"></div>
        </template>
        <div class="bcg-bee fly-item shadow" v-bind:class="rotateMe"
             :style="'left: ' + mainMovingObject.currentPos.x * width + 'px; top: ' + mainMovingObject.currentPos.y * width + 'px'"></div>
        <div v-if="flower.multiple" v-for="flower in items.flowers" class="bcg-flower finish-item"
             :style="'left: ' + flower.x * width + 'px; top: ' + flower.y * width + 'px'"><span class="number">{{flower.multiple}}</span></div>
        <div v-for="honey in items.honey" class="bcg-honey finish-item"
             :style="'left: ' + honey.x * width + 'px; top: ' + honey.y * width + 'px'"><span class="number">{{honey.multiple}}</span></div>

      </div>
    </div>
    <!--<div class="cardsbar clear-fix">-->
    <!--<div class="leftSide">-->

    <!--</div>-->
    <!--<div class="centerSide tilesBox animated fadeInUp">-->
    <!--<div v-for="i in 40" class="singleTiles singleTiles&#45;&#45;empty"><img src="#"/></div>-->
    <!--</div>-->
    <!--<div class="rightSide buttonBox">-->
    <!--<div @click="checkLvl" class="checkButton animated rubberBand" id="checkButton">-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
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
          soundButton:{
            show: false,
            active: false
          }
        },
        gameSet:{
          directionArrows: false,
          currentLevel: this._routerRoot._route.params.id,
          timeBetweenMoves: 500, //miliseconds
          move: 1000 //if u want to change this prop u have to change in css too (transition duration on .bcg-bee)
        },
        gameInfo:{
          state: 1, //4 end
          valid: true,
          showStepsLogs: true
        },
        items: {
          myFlowersCount: 0,
          flowersToTake: 2,
          honeyToBuild: 2,
          flowers:[
            {id: 1, x:0, y:0, multiple: 1},
            {id: 2, x:0, y:0, multiple: 1}
          ],
          honey:[
            {id: 1, x:0, y:0, multiple: 1}
          ]
        },
        matrix: [],
        validField: ["h","v","r","l","u","d","c", "fu", "fd", "fr", "fl", "t1", "t2", "t3", "t4"],
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
          tt: "tree2",
          fu: "fin_up",
          fd: "fin_down",
          fr: "fin_right",
          fl: "fin_left",
          t1: "t1",
          t2: "t2",
          t3: "t3",
          t4: "t4"


        },
        noCardSignal: "404",
        cards: [],
        steps: [],
        finalSteps: [],
        table: this.$parent.$parent.$data.table.Table.slots.up,
        mainMovingObject: {
          currentPos: {
            x:0,
            y:0,
            orientation: 1, // 1 - up, 2 - right, 3 - down, 4 - left
          },
        },
        stepFlag: true
      }
    },
    computed: {
      rotateMe(){
        switch(this.mainMovingObject.currentPos.orientation){
          case 1:
            return 'bcg-bee_up shadow1';
          case 2:
            return 'bcg-bee_right shadow2';
          case 3:
            return 'bcg-bee_down shadow1';
          case 4:
            return 'bcg-bee_left shadow2';
          default:
            return "'bcg-bee_left shadow2'";
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
        if(this._routerRoot._route.params.id + 1 <= this.level.count){
          this.level.next = this._routerRoot._route.params.id + 1;
        }
        else {
          this.level.next = this._routerRoot._route.params.id;
        }
      },
      fillMatrix(){
        delete require.cache[require.resolve('@/components/games/collector/main/map.json')];
        let gamesMap = require('@/components/games/collector/main/map.json');
        this.matrix = gamesMap[Number(this._routerRoot._route.params.id) -1].matrix;
        this.mainMovingObject.currentPos.orientation = Number(gamesMap[Number(this._routerRoot._route.params.id) -1].orientation);
        // console.log(this.mainMovingObject.currentPos.orientation);
        this.start.col = Number(gamesMap[Number(this._routerRoot._route.params.id) -1].start.col);
        this.start.row = Number(gamesMap[Number(this._routerRoot._route.params.id) -1].start.row);
        this.mainMovingObject.currentPos.x = this.start.col;
        this.mainMovingObject.currentPos.y = this.start.row;
        this.items.flowersToTake = Number(gamesMap[Number(this._routerRoot._route.params.id) -1].flowersToTake);
        this.items.honeyToBuild = Number(gamesMap[Number(this._routerRoot._route.params.id) -1].honeyToBuild);
        this.items.flowers = gamesMap[Number(this._routerRoot._route.params.id) -1].flowers;
        this.items.honey = gamesMap[Number(this._routerRoot._route.params.id) -1].honey;
        this.level.count = gamesMap.length;
        if (gamesMap[Number(this._routerRoot._route.params.id) -1].directionArrows !== undefined){
          this.directionArrows = gamesMap[Number(this._routerRoot._route.params.id) -1].directionArrows;
          console.log("%c[R2D2]",'color:blue'," - Direction arrows enabled.");
        }
      },
      repeatButton(){
        this.fillMatrix();
        this.gameInfo.state = 1;
        setTimeout(()=>{
          document.getElementsByClassName("bcg-honey")[0].classList.remove('bigger');
        }, 1000);
        this.gameInfo.valid = true;
        this.mainMovingObject.currentPos.x = this.start.col;
        this.mainMovingObject.currentPos.y = this.start.row;
        this.buttonsState.repeatButton.show = false;
        this.buttonsState.validateButton.show = true;
        this.stepFlag = true;
        this.steps = [];
        this.finalSteps = [];
        if(document.getElementsByClassName("bcg-spider-v").length < 0){
          document.getElementsByClassName("bcg-spider-v")[0].classList.remove('tada');

        }
        if(document.getElementsByClassName("bcg-spider-h").length < 0){
          document.getElementsByClassName("bcg-spider-h")[0].classList.remove('tada');
        }
      },
      checkButton(){
        if(this.buttonsState.validateButton.active){
          this.buttonsState.validateButton.active = false;
          this.buildStepList();
        }

      },
      buildCardsInstances(_data){ //pseudoInstances
        for (let count in _data) {
          this.$data.cards.push({id: _data[count].id, title: _data[count].object.title, type: _data[count].object.type , card_num: _data[count].card_num, image: _data[count].object.image, sound: _data[count].object.sound});
        }
        console.log("%c[R2D2]",'color:blue'," - Cards for \"Maze\" game received from server: ", this.$data.cards);
      },
      getCards() {
        let _data = require('@/mok/collector_cards.json');

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
        if (id == this.noCardSignal){
          return this.noCardSignal;
        }
        // console.log("id - "+id);
        for (let card in this.cards) {
          if(this.cards.hasOwnProperty(card)) {
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
              if (this.gameInfo.showStepsLogs){
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
              if (this.gameInfo.showStepsLogs){
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
              if (this.gameSet.showStepsLogs){
                console.log("Prawo");
              }
            });
          }
          else if (count.title === "Weź"){
            toDoArray.push(() => {
              this.pickUpFlower();
            });
          }
          else if (count.title === "Daj"){
            toDoArray.push(() => {
              this.buildHoney();
            });
          }
          else if (count.title === "wGórę" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 1;
                this.mainMovingObject.currentPos.y--;
              }
              if (this.gameSet.showStepsLogs){
                console.log("Strzałka w górę");
              }
            });
          }
          else if (count.title === "wDół" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 3;
                this.mainMovingObject.currentPos.y++;
              }
              if (this.gameSet.showStepsLogs){
                console.log("Strzałka w górę");
              }
            });
          }
          else if (count.title === "wPrawo" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 2;
                this.mainMovingObject.currentPos.x++;
              }
              if (this.gameSet.showStepsLogs){
                console.log("Strzałka w górę");
              }
            });
          }
          else if (count.title === "wLewo" && this.directionArrows) {
            toDoArray.push(() => {
              if (this.stepFlag === true) {
                this.mainMovingObject.currentPos.orientation = 4;
                this.mainMovingObject.currentPos.x--;
              }
              if (this.gameSet.showStepsLogs){
                console.log("Strzałka w górę");
              }
            });
          }
        }
        if (this.gameInfo.showStepsLogs){
          console.log("%c[R2D2]",'color:blue'," - Steps array: ", toDoArray);
        }
        this.executeFuncInSetTime(toDoArray);
      },
      executeFuncInSetTime(array){
        let timeStack = this.gameSet.timeBetweenMoves + this.gameSet.move;
        for (let i = 0; i < array.length; i++) {
          setTimeout(()=>{
            array[i]();
            this.validateMove();
          }, timeStack * (i+1));

          if (i === 0){
            setTimeout(()=>{
              this.buttonsState.validateButton.active = true;
            }, timeStack * (array.length));
          }

        }
      },
      validateMove(){
        let validFlag = false;
        if (this.mainMovingObject.currentPos.y >= this.matrix.length || this.mainMovingObject.currentPos.x >= this.matrix[0].length){
          this.wrongWay();
          return false;
        }
        for (let allowed of this.validField) {
          if (this.matrix[this.mainMovingObject.currentPos.y][this.mainMovingObject.currentPos.x] == allowed){
            validFlag = true;
          }
        }
        //spider
        if ((this.matrix[this.mainMovingObject.currentPos.y][this.mainMovingObject.currentPos.x] == 'spv')||(this.matrix[this.mainMovingObject.currentPos.y][this.mainMovingObject.currentPos.x] == 'sph')){
          this.wrongWay();
          this.moveSpider();
          return false;
        }
        let winFlag = true;
        for (let pos in this.items.honey) {
          if(this.items.honey[pos].multiple > 0){
            winFlag = false;
          }
        }
        if(!validFlag){
          this.wrongWay();
          this.stepFlag = false;
        }
        if (winFlag){
          this.win();
        }
      },
      wrongWay(){
        if (this.gameInfo.state !== 4){
          this.gameInfo.state = 4;
          this.stepFlag = false;
          this.playErrorSound();
          this.buttonsState.validateButton.show = false;
          this.buttonsState.repeatButton.show = true;
          document.getElementsByClassName("bcg-bee")[0].classList.add('rotateOut');
        }
      },
      win(){
        if (this.gameInfo.state !== 4) {
          document.getElementsByClassName("bcg-honey")[0].classList.add('bigger');
          this.gameInfo.state = 4;
          this.stepFlag = false;
          this.playSuccessSound();
          this.buttonsState.validateButton.show = false;
          this.buttonsState.repeatButton.show = true;
        }
      },
      moveSpider(){
        document.getElementsByClassName('bcg-spider-v')[0].classList.add("animated");
        document.getElementsByClassName('bcg-spider-v')[0].classList.add("tada");
      },
      pickUpFlower(){
        for (let pos in this.items.flowers) {
          if( this.items.flowers[pos].x === this.mainMovingObject.currentPos.x && this.items.flowers[pos].y === this.mainMovingObject.currentPos.y && this.items.flowers[pos].multiple > 0){
              this.items.flowers[pos].multiple--;
              this.items.myFlowersCount++;
          }
        }
      },
      buildHoney(){
        for (let pos in this.items.honey) {
          if( this.items.honey[pos].x === this.mainMovingObject.currentPos.x && this.items.honey[pos].y === this.mainMovingObject.currentPos.y && this.items.honey[pos].multiple > 0 && this.items.myFlowersCount > 0){
              this.items.honey[pos].multiple--;
              this.items.myFlowersCount--;
          }
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
    animation: quickBack1bee 3s infinite;
    transition-duration: 1.5s;
    z-index: 100;
  }
  .shadow1::before{
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
  .shadow2::before{
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

  .bcg-bee_left{
    background-image: url("../img/bee_ld.svg");
  }
  .bcg-bee_right{
    background-image: url("../img/bee_ru.svg");
  }
  .bcg-bee_up{
    background-image: url("../img/bee_lu.svg");
  }
  .bcg-bee_down{
    background-image: url("../img/bee_rd.svg");
  }
  .bcg-flower {
    background-image: url("../img/flower.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;
    transform: scale(0.4, 0.4);
    transition-duration: 0.6s;
  }
  .bcg-honey {
    background-image: url("../img/honey.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;
    transform: scale(0.4, 0.4);
    transition-duration: 0.6s;
  }
  .bigger{
    transform: scale(0.6, 0.6);
  }
  .number{
    position: absolute;
    font-size: 70px;
    top: 140px;
    left: 140px;
  }
  .number::before{
    position: absolute;
    background-color: white;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    content: "";
    display: block;
    z-index: -10;
    left: -22px;
    top: 0px;
    opacity: 0.8;
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
  }.bcg-cross {
     background-image: url("../img/road_crossing.jpg");
     background-repeat: no-repeat;
     background-size: 100% 100%;
   }

  .bcg-corner-l {
    background-image: url("../img/road_curv_left.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .bcg-corner-ru{
    background-image: url("../img/road_curv_right.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(-90deg);
  }
  .bcg-corner-rd{
    background-image: url("../img/road_curv_left.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(90deg);

  } .bcg-spider-v{
      background-image: url("../img/road_spiderh.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;

  }
  .bcg-spider-h{
    background-image: url("../img/road_spiderv.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .spiderBigger{

  }
  .bcg-stone {
    background-image: url("../img/stone.jpg");
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: center bottom;
  }
  .bcg-fin_up{
    background-image: url("../img/fin.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

  }
  .bcg-fin_down{
    background-image: url("../img/fin.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(180deg);

  }
  .bcg-fin_right{
    background-image: url("../img/fin.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(90deg);


  }
  .bcg-fin_left{
    background-image: url("../img/fin.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: rotate(-90deg);
  }
  .bcg-t1 {
    background-image: url("../img/t1.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .bcg-t2 {
    background-image: url("../img/t2.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .bcg-t3 {
    background-image: url("../img/t3.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .bcg-t4 {
    background-image: url("../img/t4.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>

