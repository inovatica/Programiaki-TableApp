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
        console.log("Lista kart 14: ",_this.cards);
        _this.counter = 0;
        _this.buttonsState.soundButton.show = false;
        _this.$data.tempClass = "eatView1 ";
        _this.cards.length = 0;
        let x = require("@/mok/cards_levels/api_v1_cards_1_5.json");
        for(let n in x){
          _this.cards.push(x[n]);
        }
        _this.cardsActual = JSON.parse(JSON.stringify(_this.cards));
        console.log("Lista kart 14_2: ",_this.cards);
      },
      findMeCard(name, _this) {
        console.log("Zaczynam - findmeMard, karty które widzę w actualCards:", _this.cardsActual, "karty w cards: ", _this.cards);
        if(name === ""){
          console.error("Brak przypisanego jedzenia dla zwierzątka");
        }
        for (let card of _this.cardsActual) {
          if (card.object.title === name) {
            // console.log("Znalazłe: ",card);
            return card;
          }
        }
        console.log("Nie znalazłem karty");

      },
      validVStable(_this){
        if(_this.myCards.random.length === 0){
          setTimeout(()=>{
            this.validVStable(_this);
          },200);
        }
        else{
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
        }
      },
      randomCards(_this) {
        this.extraBehaviour(_this);
        _this.myCards.random.length = 0;
        for (let i = 0; i < (_this.gameInfo.levels[13].cardsCount) / 2; i++) {
          let rand = Math.floor((Math.random() * _this.cardsActual.length));
          let temp = _this.cardsActual[rand];
          let ejejWystarczy = 0;
          while (temp.object.type === "math" || temp.object.type === "food") {
            if(ejejWystarczy > 150){
              console.error("Brak obiektów animal");
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
          console.log("znaleziona przez findMeCard karta: ",myCard);
          myCard.show = false;

          _this.myCards.random.push(myCard);
          _this.cardsActual.splice(rand,1);
        }
        _this.gameInfo.levels[13].data = JSON.parse(JSON.stringify(_this.myCards.random));
      },
      validate(_this){
        let countOnTable = 0;
        for (let card of _this.table) {
          if (card.data !== _this.noCardSignal) {
            countOnTable++;
          }
        }
        if(countOnTable === 1 && _this.myCards.random[1].show === true){
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
