<template>
</template>


<script>
  export default {
    mounted(){

    },
    created(){

    },
    data(){
      return {
      }
    },
    computed: {

    },
    methods: {
      extraBehaviour(_this){
        _this.buttonsState.soundButton.show = true;
        _this.$data.tempClass = "";
        _this.cards.length = 0;
        let x = require("@/mok/cards_levels/zoo11.json");
        for(let n in x){
          _this.cards.push(x[n]);
        }
        _this.cardsActual = JSON.parse(JSON.stringify(_this.cards));
        _this.gameInfo.levels[11].data = _this.myCards.random[3];
        if(_this.myCards.random.length === 0){
          setTimeout(()=>{
            this.extraBehaviour(_this);
          },200)
        }
        else{
          if (_this.myCards.random[1].object.title !== "*2") {
            _this.myCards.random[2] = _this.myCards.random[1];
          }
          for (let i in _this.cards){
            if(_this.cards[i].object.title === "*2"){
              _this.myCards.random[1] = _this.cards[i];
              _this.myCards.random[1].show = false;
            }
          }
          if(_this.myCards.random[1].object.title !== "*2"){
            console.log("%c[R2D2]",'color:blue',"Card \"*2\" not exist in loaded cards.");
          }
        }
      },
      soundButton(_this){
        _this.sounds.play = true;
        let arrayOfSounds = [];
        const th1 = _this.myCards.random[0].object.sound;
        const th2 = _this.myCards.random[2].object.sound;
        const th3 = _this.myCards.random[3].object.sound;
        console.log(th1, th2, th3)

        arrayOfSounds.push(new Audio(require('@/components/games/zoo/sounds/' + th1)));
        arrayOfSounds.push(new Audio(require('@/components/games/zoo/sounds/' + th2)));
        arrayOfSounds.push(new Audio(require('@/components/games/zoo/sounds/' + th2)));
        arrayOfSounds.push(new Audio(require('@/components/games/zoo/sounds/' + th3)));

        const bell = new Audio(require('@/components/games/zoo/sounds/bell.mp3'));

        if (arrayOfSounds.length !== 0) {
          for (let i = 0; i < arrayOfSounds.length; i++) {

            arrayOfSounds[i].onended = ()=> {
              setTimeout(()=> {
                if (_this.sounds.play === true) {
                  bell.play();
                  console.log("play: ",_this.sounds.play);
                }
                else{
                  for (let i = 0; i < arrayOfSounds.length; i++) {
                    arrayOfSounds[i].pause();
                  }
                }
              }, 500);
              setTimeout(()=> {
                if (_this.sounds.play === true) {
                  arrayOfSounds[i + 1].play();
                }
              }, 1700);
            };

          }
          arrayOfSounds[arrayOfSounds.length - 1].onended = ()=> {
            _this.buttonsState.soundButton.active = true;
          }
        }
        arrayOfSounds[0].play();

      },
      validate(_this){
        let countOnTable = 0;
        let array = [];
        for (let card of _this.table) {
          if (card.data !== _this.noCardSignal) {
            array.push(_this.findMeCard(card.data));
            countOnTable++;
            console.log("Ilość kart na stole: ",countOnTable);
          }
        }
        if (_this.myCards.random.length !== countOnTable) {
          _this.wrongWay();
          return false;
        }
        for (let iter of _this.myCards.random){
          if(iter.show === undefined || iter.show === false){
            _this.wrongWay();
            return false;
          }
        }
        for (let i = 0; i < _this.myCards.random.length; i++){
          if(_this.myCards.random[i].object.title !== array[i].object.title){
            _this.wrongWay();
            return false;
          }
        }
        _this.win();
        return true;
      }
    }
  };
</script>

<style scoped>

</style>
