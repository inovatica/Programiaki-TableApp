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
        if(_this.myCards.random.length !== 0){
          for (let card of _this.table) {
            if (card.data != 404) {
              if(_this.findMeCard(card.data) !== false){
                _this.myCards.random[0] = _this.findMeCard(card.data);
                _this.myCards.random[0].show = true;
                break;
              }
            }
          }
        }
      },
      extraBehaviour(_this){
        _this.buttonsState.validateButton.show = false;
        let x = require("@/mok/cards_levels/allAnim.json");
        for(let n in x){
          _this.cards.push(x[n])
        }
      },
      soundButton(_this){
        let flag = false;
        for (let card of _this.table) {
          if (card.data != 404) {
            flag = true;
            break;
          }
        }
        if(flag){
          _this.buttonsState.soundButton.active = false;
          _this.sounds.play = true;
          let audio = new Audio(require("@/components/games/zoo/sounds/"+_this.myCards.random[0].object.sound));
          audio.onended = ()=>{
            _this.buttonsState.soundButton.active = true;
          };
          audio.play();
        }

        if(flag) {
          console.log("Odtwarzam: ", _this.myCards.random[0].object.title);
        }
        else {
          console.log("nope, pusto.")
        }
      }
    }
  };
</script>

<style scoped>

</style>
