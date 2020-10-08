<template>
</template>


<script>
  export default {
    mounted(){
      console.log("sss");
      this.$parent.cards.length = 0;
      let x = require("@/mok/cards_levels/zoo.json");
      for(let n in x){
        this.$parent.cards.push(x[n]);
      }
      this.$parent.cardsActual = JSON.parse(JSON.stringify(this.$parent.cards));
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
        let x = require("@/mok/cards_levels/zoo.json");
        for(let n in x){
          _this.cards.push(x[n])
        }
        _this.gameInfo.levels[9].data = JSON.parse(JSON.stringify(_this.myCards.random[0]));
      },
      validate(_this){
        let countOnTable = 0;
        for (let card of _this.table) {
          if (card.data !== _this.noCardSignal) {
            countOnTable++;
            console.log("Ilość kart na stole: ",countOnTable);
          }
        }
        if (_this.myCards.random.length !== 1) {
          _this.wrongWay();
          return false;
        }
        if(_this.myCards.random[0].show === undefined || _this.myCards.random[0].show === false){
          _this.wrongWay();
          return false;
        }
        _this.win();
        return true;
      }
    }
  };
</script>

<style scoped>

</style>
