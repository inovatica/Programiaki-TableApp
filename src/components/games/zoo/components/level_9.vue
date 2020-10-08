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
      nextEmpty(_this, x){
        if(x === 1){
          for (let slot = 0; slot < 4; slot++){
            if(_this.myCards.random[slot].show === false){
              return slot;
            }
          }
        }
        else if(x === 2){
          for (let slot = 4; slot < 8; slot++){
            if(_this.myCards.random[slot].show === false){
              return slot;
            }
          }
        }

        return false;
      },
      validVStable(_this){
        // console.log("---------------------------------------------------", _this.myCards.random.length);
        if(_this.myCards.random.length === 8){
          for (let iter of _this.myCards.random){
            // console.log(iter.object.title);
            // console.log(iter.show);
          }
          // console.log("validVSTable", _this.cards.length, _this);
          let iteration = 0;
          // console.log("cards.length: ",_this.cards.length);
          if (_this.cards.length !== 0){
            for (let card of _this.table) {
              if (card.data !== "404") {
                let flag1 = true;
                for (let card2 of _this.myCards.random) {
                  if(card.data === card2.card_num && card2.show){
                    // console.log("card.data === card2.card_num", card.data === card2.card_num, card.data, card2.card_num);
                    flag1 = false;
                  }
                }
                // console.log("Iteracja: ",iteration);
                iteration++;
                // console.log("1 warunek: ", _this.findMeCard(card.data).object.group === "dzikie", this.nextEmpty(_this, 1) !== false, flag1)
                // console.log("2 warunek: ", _this.findMeCard(card.data).object.group === "udomowione", this.nextEmpty(_this, 2) !== false, flag1)
                if(_this.findMeCard(card.data) !== false && card.data !== undefined && _this.findMeCard(card.data).object.group === "dzikie" && this.nextEmpty(_this, 1) !== false && flag1){
                  let slot = this.nextEmpty(_this, 1);
                  _this.myCards.random[slot] = _this.findMeCard(card.data);
                  _this.myCards.random[slot].show = true;
                  // console.log("Podstawiam pod slot "+slot+": "+_this.myCards.random[slot].object.title);

                }
                if(_this.findMeCard(card.data) !== false && card.data !== undefined && _this.findMeCard(card.data).object.group === "udomowione" && this.nextEmpty(_this, 2) !== false && flag1){
                  let slot = this.nextEmpty(_this, 2);
                  _this.myCards.random[slot] = _this.findMeCard(card.data);
                  _this.myCards.random[slot].show = true;
                  // console.log("Podstawiam pod slot "+slot+": "+_this.myCards.random[slot].object.title);
                }

                if(this.nextEmpty(_this, 1) === false){
                  console.log("%c[R2D2]",'color:blue'," - I'm droping card - First 4 slots full");
                }
                if(this.nextEmpty(_this, 2) === false){
                  console.log("%c[R2D2]",'color:blue'," - I'm droping card - Slots 5 - 8 full");
                }
              }
            }
          }
        }
        for (let randomCard of _this.myCards.random) {
          if (randomCard.show === true) {
            let flag = false;
            for (let card of _this.table) {
              if(randomCard.card_num === card.data){
                flag = true;
              }
            }
            if(flag === false){
              randomCard.show = false;
            }
          }
        }
      },
      extraBehaviour(_this){
        _this.$data.tempClass = "eatView4 ";
        _this.buttonsState.soundButton.show = false;
        let x = require("@/mok/cards_levels/zoo.json");
        for(let n in x){
          _this.cards.push(x[n])
        }
      },
      validate(_this){
        if (_this.findMeCard(_this.myCards.random[0].card_num).object.group === "dzikie" && _this.findMeCard(_this.myCards.random[1].card_num).object.group === "dzikie" && _this.findMeCard(_this.myCards.random[2].card_num).object.group === "dzikie" && _this.findMeCard(_this.myCards.random[3].card_num).object.group === "dzikie"){
          if (_this.findMeCard(_this.myCards.random[0].card_num).show === true && _this.findMeCard(_this.myCards.random[1].card_num).show === true && _this.findMeCard(_this.myCards.random[2].card_num).show === true && _this.findMeCard(_this.myCards.random[3].card_num).show === true){
            if (_this.findMeCard(_this.myCards.random[4].card_num).object.group === "udomowione" && _this.findMeCard(_this.myCards.random[5].card_num).object.group === "udomowione" && _this.findMeCard(_this.myCards.random[6].card_num).object.group === "udomowione" && _this.findMeCard(_this.myCards.random[7].card_num).object.group === "udomowione"){
              _this.win();
              return true;
            }
          }
        }
          _this.wrongWay();
          return false;
      }
    }
  };
</script>

<style scoped>

</style>
