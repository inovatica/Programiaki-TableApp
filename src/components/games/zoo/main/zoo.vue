<template>
  <div class="mainContainerMiddle" data-place="puzzle">
    <router-link :to="{name:'game-zoo'}" class="backBtn" v-on:click.native="pauseSound"></router-link>
    <router-link :to="{name:'zoo-main', params: {id: level.actual + 1 }}" class="nextBtn"  v-on:click.native="changeLevel(); pauseSound();"></router-link>
    <header>
      <img class="animated headImage" src="../img/zoo.svg"/>
    </header>

    <div v-for="(ta, index) in table" :data-tt="validVStable(ta,index)"></div>

    <section id="cardsSection" class="cardsSection clear-fix" :class="tempClass +'cardsSection-' + myCards.random.length">
      <div v-for="tile in myCards.random" class="cardsSection__singleSlot" :class="cardClass(tile)">
        <img class="actualImege" :src="require('@/assets/img/models/'+tile.object.image)">
        <img class="placeholder" src="@/components/games/zoo/img/models/platform.svg">
      </div>
    </section>
    <div class="slotsView">
      <Slotsview/>
    </div>
  </div>
</template>


<script>
  //imports
  import level1 from '../components/level_1.vue'
  import level7 from '../components/level_7.vue'
  import level8 from '../components/level_8.vue'
  import level9 from '../components/level_9.vue'
  import level10 from '../components/level_10.vue'
  import level11 from '../components/level_11.vue'
  import level12 from '../components/level_12.vue'
  import level13 from '../components/level_13.vue'
  import level14 from '../components/level_14.vue'
  import level15 from '../components/level_15.vue'
  import level16 from '../components/level_16.vue'
  import level17 from '../components/level_17.vue'

  export default {
    mounted(){
      this.buildCardsModel();
      this.randomCards();
      this.validVStable(this);
      this.changeLevel(false);
      document.getElementById('checkButton').addEventListener('click', this.pauseSound);
      this.sounds.play = true;
      this.$forceUpdate();
      this.$socket.send({task: "last_state"});
    },
    created(){
      this.level.actual = Number(JSON.stringify(JSON.parse(this._routerRoot._route.params.id)));
      this.extraBehaviour();
      window.addEventListener('keydown', this.disableF5);
      window.addEventListener('keydown', this.showMe);
    },
    data(){
      return {
        tempClass: "",
        sounds: {
          play: true
        },
        counter:0,
        cards: [],
        showFlag: false,
        cardsActual: [],
        emptyArray: [],
        cardsInstance: [],
        myCards: {
          valid: [],
          random: [],
        },
        level: {
          actual: 1,
          count: 1
        },
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
            show: true,
            active: true
          },
          nextButton:{
            active: true
          }
        },
        gameSet:{
          currentLevel: this._routerRoot._route.params.id
        },
        interLevelData:{

        },
        gameInfo:{
          state: 1,
          levels: [
            {id: 1, cardsCount: 1, orderImportant: false, logicModify: true},
            {id: 2, cardsCount: 1, orderImportant: false, logicModify: false},
            {id: 3, cardsCount: 1, orderImportant: false, logicModify: false, sequence: true},
            {id: 4, cardsCount: 2, orderImportant: false, logicModify: false, sequence: true},
            {id: 5, cardsCount: 3, orderImportant: false, logicModify: false, sequence: true},
            {id: 6, cardsCount: 4, orderImportant: false, logicModify: false, sequence: false},//false, jeśli tu się kończy sekwencja
            {id: 7, cardsCount: 1, orderImportant: false, logicModify: true},
            {id: 8, cardsCount: 1, orderImportant: false, logicModify: true},
            {id: 9, cardsCount: 8, orderImportant: false, logicModify: true},
            {id: 10, cardsCount: 1, orderImportant: true, logicModify: true, sequence: true},
            {id: 11, cardsCount: 3, orderImportant: true, logicModify: true, sequence: true},
            {id: 12, cardsCount: 4, orderImportant: true, logicModify: true, sequence: true},
            {id: 13, cardsCount: 6, orderImportant: true, logicModify: true, sequence: false},
            {id: 14, cardsCount: 2, orderImportant: true, logicModify: true, sequence: true},
            {id: 15, cardsCount: 4, orderImportant: true, logicModify: true, sequence: true},
            {id: 16, cardsCount: 6, orderImportant: true, logicModify: true, sequence: true},
            {id: 17, cardsCount: 8, orderImportant: true, logicModify: true, sequence: false},
            {id: 18, cardsCount: 0, orderImportant: false, logicModify: false}

          ]
        },
        noCardSignal: "404",
        table: this.$parent.$parent.$data.table.Table.slots.up
      }
    },
    components: {
      level1,
      level7,
      level8,
      level9,
      level10,
      level11,
      level12,
      level13,
      level14,
      level15,
      level16,
      level17
    },
    computed: {

    },
    methods: {
      extraBehaviour(){
        console.log('zoo beavior');
        console.log(this.dictionary(Number(this.level.actual)).methods)
        if (this.checkLevelLogicModify() && this.dictionary(Number(this.level.actual)).methods.extraBehaviour !== undefined){
          this.dictionary(Number(this.level.actual)).methods.extraBehaviour(this);
        } else {
          this.getCards();
          console.log("Pobieram główne karty dla zoo");
        }

      },
      dictionary(x){
        switch (x) {
          case 1:
            return level1;
          case 7:
            return level7;
          case 8:
            return level8;
          case 9:
            return level9;
          case 10:
            return level10;
          case 11:
            return level11;
          case 12:
            return level12;
          case 13:
            return level13;
          case 14:
            return level14;
          case 15:
            return level15;
          case 16:
            return level16;
          case 17:
            return level17;
          default:
            return false;
        }
      },
      checkLevelLogicModify(){
        let lvl = this.level.actual;
        if (this.gameInfo.levels[lvl - 1].logicModify !== undefined) {
          if (this.gameInfo.levels[lvl - 1].logicModify) {
            return true;
          }
        }

        return false;

      },
      validVStable(ta, index){
        if(index === 0){
          console.log("validVStable - iteracja "+index);
          if (this.checkLevelLogicModify() && this.dictionary(Number(this.level.actual)).methods.validVStable !== undefined){
            this.dictionary(Number(this.level.actual)).methods.validVStable(this);
          }
          else{
            for (let randomCard of this.myCards.random) {
              let flag = false;
              for (let card of this.table) {
                if (randomCard.card_num === card.data) {
                  // console.log(randomCard)
                  randomCard.show = true;
                  // console.log(randomCard);
                  flag = true;
                }
              }
              if (!flag){
                randomCard.show = false;
              }
            }
          }
        }

        return "";
      },
      validate(){
        if (this.checkLevelLogicModify() && this.dictionary(Number(this.level.actual)).methods.validate !== undefined){
          this.dictionary(Number(this.level.actual)).methods.validate(this);
        }
        else{
          if (this.gameInfo.levels[this.level.actual - 1].sequence === false && this.gameInfo.levels[this.level.actual - 1].sequence === undefined) {
            this.cardsActual.length = 0;
            for (let c of JSON.parse(JSON.stringify(this.cards))) {
              this.cardsActual.push(c);
            }
            // for (let i of this.gameInfo.levels) {
            //   delete i.data;
            // }
          }
          let countOnTable = 0;
            let array = [];
            for (let card of this.table) {
              if (card.data !== this.noCardSignal) {
                array.push(this.findMeCard(card.data));
                countOnTable++;
                console.log("Ilość kart na stole: ",countOnTable);
              }
            }
            if (this.myCards.random.length !== countOnTable) {
              this.wrongWay();
              return false;
            }
            for (let iter of this.myCards.random){
              if(iter.show === undefined || iter.show === false){
                this.wrongWay();
                return false;
              }
            }
            for (let i = 0; i < this.myCards.random.length; i++){
              if(this.myCards.random[i].object.title !== array[i].object.title){
                this.wrongWay();
                return false;
              }
            }
            this.win();
            return true;

            this.win();
            return true;
          }
        // }

      },
      cardClass(card){
        // console.log(card);

        if (card.show === undefined) {
          console.error("%c[R2D2]",'color:blue'," - Property \"card.show\" is undefined");
        }
        else if (!card.show) {
          if(this.showFlag){
            return "";
          }
          else {
            return "cardsSection__singleSlot--empty";
          }
        }
        else if (card.show) {
          return "";
        }
      },
      showMe(e){
        if ((e.which || e.keyCode) == 32) {
          if (this.showFlag) {
            this.showFlag = false;
          } else {
            this.showFlag = true;
          }
        }
      },
      randomCards(){
        if (this.checkLevelLogicModify() && this.dictionary(Number(this.level.actual)).methods.randomCards !== undefined){
          this.dictionary(Number(this.level.actual)).methods.randomCards(this);
        }
        else{

          //TODO: czyszczenie .data w odpowiednich momentach
          this.cardsActual.length = 0;
          for (let c of JSON.parse(JSON.stringify(this.cards))) {
            this.cardsActual.push(c);
          }


          this.myCards.random.length = 0;
          for (let i = 0; i < this.gameInfo.levels[this.level.actual - 1].cardsCount; i++) {
            let rand = Math.floor((Math.random() * this.cardsActual.length));
            let temp = this.cardsActual[rand];
            while (temp.object.type === "math"){
              rand = Math.floor((Math.random() * this.cardsActual.length));
              temp = this.cardsActual[rand];
            }

            temp.show = false;
              this.cardsActual.splice(rand,1);
            this.myCards.random.push(temp);
            //podstawiamy pod .data karty aktualny random
            if(this.gameInfo.levels[this.level.actual - 1].sequence && i === this.gameInfo.levels[this.level.actual - 1].cardsCount - 1) {
              this.gameInfo.levels[this.level.actual - 1].data = temp;
            }
          }

          //temporary
          if(this.level.actual === 3 || this.level.actual === 4 || this.level.actual === 5 || this.level.actual === 6) {
            if(this.gameInfo.levels[this.level.actual - 2] !== undefined){
              for (let a = 0; a < this.gameInfo.levels[this.level.actual - 1].cardsCount - 1; a++){
                this.myCards.random[a] = this.gameInfo.levels[this.level.actual - 2].data[a];
                for (let b = 0; b < this.cardsActual.length; b++) {
                  if(this.cardsActual[b].object.title === this.myCards.random[a].object.title){
                    this.cardsActual.splice(b,1);
                  }
                }
              }
            }
            this.gameInfo.levels[this.level.actual - 1].data = JSON.parse(JSON.stringify(this.myCards.random));
          }


            // for (let a of this.myCards.random){
            //   console.log(a.length);
            // }
        }

      },
      disableF5(e) {
        if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82){
          e.preventDefault();
          // this.cardsActual.length = 0;
          // this.cardsActual = JSON.parse(JSON.stringify(this.cards));
          // this.randomCards();
        }
      },
      changeLevel(increment){
        if(this.buttonsState.nextButton.active){
          this.buttonsState.nextButton.active = false;
          setTimeout(()=>{
            this.buttonsState.nextButton.active = true;
          },1000);
          for (let i = 0; i < document.getElementsByClassName("actualImege").length; i++){
            document.getElementsByClassName("actualImege")[i].classList.add('noneTrans');
          }
          setTimeout(()=>{
            for (let i = 0; i < document.getElementsByClassName("actualImege").length; i++){
              document.getElementsByClassName("actualImege")[i].classList.remove('noneTrans');
            }
          },500);
          this.sounds.play = false;
          console.log('111111111111111111111111111111111');
          console.log(this.level.actual);
          console.log(this.gameInfo.levels.length -1);
          if(increment === undefined){
            increment = true;
          }
          console.log("increment",increment);

          if (increment !== false && this.level.actual < this.gameInfo.levels.length - 1) {
            this.level.actual++;
          }
          else
          {
            console.log('nope');
          }
          this.repeatButton();
        }
      },
      repeatButton(){
        this.sounds.play = false;
// for (let randomCard of this.myCards.random) {
        //   let flag = false;
        //       randomCard.show = false;
        // }
        this.randomCards();
        this.buttonsState.validateButton.active = true;
        this.buttonsState.validateButton.show = true;
        this.buttonsState.repeatButton.active = false;
        this.buttonsState.repeatButton.show = false;
        for (let i = 0; i < document.getElementsByClassName("actualImege").length; i++){
          document.getElementsByClassName("actualImege")[i].classList.remove('bigger');
        }
        this.extraBehaviour();
      },
      checkButton(){
        this.sounds.play = false;
        if(this.buttonsState.validateButton.active){
          this.buttonsState.validateButton.active = false;
          this.validate();
          setTimeout(()=>{
            this.buttonsState.validateButton.active = true;
          },1000);
        }

      },
      pauseSound(){
        this.sounds.play = false;
        this.buttonsState.soundButton.active = true;
        console.log("%c[R2D2]",'color:blue'," - sounds paused");
      },
      soundButton(){
        if(this.myCards.random.length > 0 && this.buttonsState.soundButton.active === true){
          this.buttonsState.soundButton.active = false;
          if (this.checkLevelLogicModify() && this.dictionary(Number(this.level.actual)).methods.soundButton !== undefined){
            this.dictionary(Number(this.level.actual)).methods.soundButton(this);
          }
          else{
            this.sounds.play = true;
            var arrayOfSounds = [];

            const bell = new Audio(require('@/components/games/zoo/sounds/bell.mp3'));
            for (let i of this.myCards.random) {
              let sound = i.object.sound;
              arrayOfSounds.push(new Audio(require('@/components/games/zoo/sounds/' + sound)));
            }

            if (arrayOfSounds.length !== 0) {
              for (let i = 0; i < arrayOfSounds.length; i++) {

                arrayOfSounds[i].onended = ()=> {
                  setTimeout(()=> {
                    if (this.sounds.play === true) {
                      bell.play();
                      console.log("play: ",this.sounds.play);
                    }
                    else{
                      for (let i = 0; i < arrayOfSounds.length; i++) {
                        arrayOfSounds[i].pause();
                      }
                    }
                  }, 500);
                  setTimeout(()=> {
                    if (this.sounds.play === true) {
                      arrayOfSounds[i + 1].play();
                    }
                  }, 1700);
                };

              }
              arrayOfSounds[arrayOfSounds.length - 1].onended = ()=> {
                this.buttonsState.soundButton.active = true;
              }
            }
            arrayOfSounds[0].play();

          }
        }
      },
      buildCardsModel(){
        //
        // let _data = this.getCards();
        // //clear array
        // this.cardsInstance.length = 0;
        // for (let count in _data) {
        //   this.cardsInstance.push({id: _data[count].id, title: _data[count].object.title, type: _data[count].object.type , card_num: _data[count].card_num, image: _data[count].object.image, sound: _data[count].object.sound});
        // }
        console.log("%c[R2D2]",'color:blue'," - Cards for \"Zoo\" game received from server: ", this.cards);

      },
      getCards() {
        this.cards.length = 0;
        let x = require("@/mok/cards_levels/zoo.json");
        for(let n in x){
          this.cards.push(x[n]);
        }
          this.cardsActual = JSON.parse(JSON.stringify(this.cards));

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
        return this.cards;
      },
      findMeCard(id){
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
      wrongWay(){
        this.playErrorSound();
        console.log("%c[R2D2]",'color:blue'," - Wrong Answer");
      },
      win(){
        console.log("%c[R2D2]",'color:blue'," - Correct Answer");
        this.playSuccessSound();
        this.buttonsState.validateButton.show = false;
        this.buttonsState.repeatButton.show = true;
        for (let i = 0; i < document.getElementsByClassName("actualImege").length; i++){
          document.getElementsByClassName("actualImege")[i].classList.add('bigger');
        }
      }
    }
  };
</script>

<style scoped>
  .headImage {
    max-width: 400px;
  }
  .slotsView{
    position: absolute;
    top: 850px;
  }
  .cardsSection{
    position: absolute;
    top: 300px;
  }
  .actualImege{
    transition-duration: 0s;
  }
  .noneTrans{
    transition-duration: 0s !important;
  }
  .bigger{
    transform: scale(1.2, 1.2);
  }
  .eatView{

  }
  .eatView1 cardsSection__singleSlot{

  }
  .eatView1 div:nth-of-type(1){
    left: 200px;
  }
  .eatView1 div:nth-of-type(2){
    top: 250px;
    left: -70px;
  }



  .eatView2 div:nth-of-type(1){
    left: 200px;
  }
  .eatView2 div:nth-of-type(2){
    top: 250px;
    left: -70px;
  }
  .eatView2 div:nth-of-type(3){
    left: 100px;
  }
  .eatView2 div:nth-of-type(4){
    top: 250px;
    left: -170px;
  }


  .eatView3 div:nth-of-type(1){
    left: 100px;
  }
  .eatView3 div:nth-of-type(2){
    top: 250px;
    left: -170px;
  }
  .eatView3 div:nth-of-type(3){
    /*left: 100px;*/
  }
  .eatView3 div:nth-of-type(4){
    top: 250px;
    left: -260px;
  }
  .eatView3 div:nth-of-type(5){
    left: -100px;
    top: -20px;
  }
  .eatView3 div:nth-of-type(6){
    top: 20px;
    left: 980px;
  }


  .eatView4 div:nth-of-type(1){
    left: -100px;
  }
  .eatView4 div:nth-of-type(2){
    top: 270px;

    left: -370px;
  }
  .eatView4 div:nth-of-type(3){
    left: -360px;
  }
  .eatView4 div:nth-of-type(4){
    top: 270px;
        left: -630px;
  }
  .eatView4 div:nth-of-type(5){
    left: 500px;
    top: -270px;
  }
  .eatView4 div:nth-of-type(6){
    top: 0px;
        left: 250px;

  }
  .eatView4 div:nth-of-type(7){
    top: -270px;
    left: 300px;

  }
  .eatView4 div:nth-of-type(8){
    top: 0px;
        left: 30px;

  }
</style>
