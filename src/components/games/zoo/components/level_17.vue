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
      extraBehaviour(_this) {
        _this.buttonsState.soundButton.show = false;
        _this.$data.tempClass = "eatView4 ";
        _this.cards.length = 0;
        let x = require("@/mok/cards_levels/api_v1_cards_1_5.json");
        for(let n in x){
          _this.cards.push(x[n]);
        }
        _this.cardsActual = JSON.parse(JSON.stringify(_this.cards));
      },
      findMeCard(name, _this) {
        if(name === ""){
          console.error("Brak przypisanego jedzenia dla zwierzątka");
        }
        for (let card of _this.cardsActual) {
          if (card.object.title === name) {
            return card;
          }
        }
        // location.reload();

      },
      validVStable(_this){
        if(_this.myCards.random.length === 0){
          setTimeout(()=>{
            this.validVStable(_this);
          },200);
        }
        else{
          console.log("Random Cards randered.");
          for (let randomCard of _this.myCards.random) {
            let flag = false;
            for (let card of _this.table) {
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
          _this.myCards.random[0].show = true;
          _this.myCards.random[2].show = true;
          _this.myCards.random[4].show = true;
          _this.myCards.random[6].show = true;
        }
      },
      randomCards(_this) {

        //searching remembered in .data cards and removing from card list
        if(_this.gameInfo.levels[15].data !== undefined){
          let previousLvlData;
          for (let i = 0; i < _this.gameInfo.levels[15].cardsCount; i++) {
            previousLvlData = _this.gameInfo.levels[15].data[i];
            for (let card = 0; card < _this.cardsActual.length; card++) {
              if(previousLvlData.object.title === _this.cardsActual[card].object.title){
                _this.cardsActual.splice(card,1);
              }
            }
          }
        }
        _this.myCards.random.length = 0;
        for (let i = 0; i < (_this.gameInfo.levels[16].cardsCount) / 2; i++) {
          let rand = Math.floor((Math.random() * _this.cardsActual.length));
          let temp = _this.cardsActual[rand];
          let ejejWystarczy = 0;
          while (temp.object.type === "math" || temp.object.type === "food") {
            if(ejejWystarczy > 200){
              console.log("Brak obiektów animal");
              break;
            }
            ejejWystarczy++;
            rand = Math.floor((Math.random() * _this.cardsActual.length));
            temp = _this.cardsActual[rand];
          }
          temp.show = true;
          _this.myCards.random.push(temp);
            let toEat = temp.object.toEat;

          let myCard = this.findMeCard(toEat, _this);
          myCard.show = false;
            _this.myCards.random.push(myCard);

          if (_this.gameInfo.levels[15].data !== undefined && i === 2){
            _this.myCards.random.length = 0;
            _this.myCards.random = _this.gameInfo.levels[15].data;
          }
          else{
            _this.cardsActual.splice(rand,1);
          }
        }
      },
      validate(_this){
        let countOnTable = 0;
        for (let card of _this.table) {
          if (card.data !== _this.noCardSignal) {
            countOnTable++;
          }
        }
        if(countOnTable === 2 && _this.myCards.random[1].show === true && _this.myCards.random[3].show === true && _this.myCards.random[5].show === true && _this.myCards.random[7].show === true){
          _this.win();
        }
        else{
          _this.wrongWay();
        }
      }
    }
  };
</script>

<style scoped>

</style>
