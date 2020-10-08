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
        test: "test"
      }
    },
    computed: {

    },
    methods: {
      validVStable(_this){
        for (let card of _this.table) {
          if (card.data != 404) {
            if(_this.findMeCard(card.data) !== false && card.data !== undefined){
              _this.myCards.random[0] = _this.findMeCard(card.data);
              if(_this.findMeCard(card.data).object.group === "dzikie"){
                _this.myCards.random[0].show = true;
              }
              else{
                _this.myCards.random[0].show = false;
              }
              break;
            }
          }
        }
      },
      extraBehaviour(_this){
        _this.buttonsState.soundButton.show = false;
        let x = require("@/mok/cards_levels/zoo.json");
        for(let n in x){
          _this.cards.push(x[n])
        }
      },
      validate(_this){
        let countOnTable = 0;
        for (let card of _this.table) {
          if (card.data != _this.noCardSignal) {
            countOnTable++;
          }
        }
        if(_this.myCards.random.length === countOnTable){
          for (let card of _this.table) {
            if (card.data != _this.noCardSignal) {

              if (_this.findMeCard(card.data).object.group === "dzikie") {
                _this.win();
                return true;
              }
            }
          }
        }
        else{
          _this.wrongWay();
          return false;
        }
        _this.wrongWay();
        return false;
      }
    }
  };
</script>

<style scoped>

</style>
