<template>
  <div class="cardsbar clear-fix">
    <div class="leftSide buttonBox">
      <div v-if="buttonsState.soundButton.show" @click="soundButton" class="soundButton animated" id="soundButton">
      </div>
    </div>
    <div class="centerSide tilesBox animated fadeInUp">
      <div v-if="state" v-for="i in table" :class="classChanger(i)" class="singleTiles">
        <img :src="giveMeUrl(i)" :data-cardId="i.data" :data-name="i.name" :class="imageClassChanger(i)" class="animated"/>
      </div>
    </div>
    <div class="rightSide buttonBox">
      <div v-if="buttonsState.validateButton.show" @click="checkButton" class="checkButton animated" id="checkButton">
      </div>
      <div v-if="buttonsState.repeatButton.show" @click="repeatButton" class="repeatGameButton animated" id="repeatButton">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      // if (screen.orientation.type == "landscape-primary"){
      //   this.$data.table = this.$parent.$parent.$parent.$data.table.Table.slots.down;
      // }
      this.checkData();
    },
    created(){
      // this.clearUnknowingData();
    },
    data() {
      return {
        state: false,
        cards: this.$parent.$data.cards,
        table: this.$parent.$parent.$parent.$data.table.Table.slots.up,
        noCardSignal: "404",
        orientation: "up",
        buttonsState: this.$parent.$data.buttonsState
      }
    },
    methods:{
      checkData(){
        if (this.$parent.$data.cards.length === 0){
          setTimeout(()=>{
            this.checkData();
          }, 200);
        }
        else{
          this.cards = this.$parent.$data.cards;
          this.state = true;
        }
      },
      clearUnknowingData(){
        if(this.buttonsState.soundButton.show === undefined){
          this.buttonsState.soundButton.show = false;
        }
      },
      repeatButton(e){
        if(this.buttonsState.validateButton.active){
          e.srcElement.classList.add('rubberBand');
          this.$parent.repeatButton();
          setTimeout(()=>{
            e.srcElement.classList.remove('rubberBand');
          },1000);
        }
      },
      checkButton(e){
        if(this.buttonsState.validateButton.active){
          e.srcElement.classList.add('rubberBand');
          this.$parent.checkButton();
          setTimeout(()=>{
            e.srcElement.classList.remove('rubberBand');
          },2000);
        }
      },
      soundButton(){
        if (this.$parent.soundButton !== undefined){
          this.$parent.soundButton();
        }
      },
      findMeCard(id){
        if (id == this.noCardSignal){
          return this.noCardSignal;
        }
        // console.log(this.cards);
          for (let card in this.cards) {
              // console.log(this.cards[card].card_num === id);
              if (this.cards[card].card_num === id) {
                // console.log(this.cards[card].card_num, id, "done: ", this.cards[card]);
                // console.log("return: ",this.cards[card]);
                return this.cards[card];
                break;
              }
          }
          return false;
      },
      giveMeUrl(obj){
        let data = this.findMeCard(obj.data);
        if (obj.data == this.noCardSignal || data == this.noCardSignal || data === false || obj === undefined) {
          // console.log("giveMeUrl - zwracam: #");
          return "#";
        }
        // console.log("giveMeUrl - zwracam: ", this.findMeCard(obj.data));
        // console.log(data);
        console.log(data);
        if(data.image === undefined && data.object.image !== undefined){
          return require("@/assets/img/models/"+data.object.image);

        }
        return require("@/assets/img/models/"+data.image);
      },
      classChanger(obj){
        // console.log(obj);
        let data = this.findMeCard(obj.data);
        // console.log(data);
        if (data == this.noCardSignal) {
          return "singleTiles--empty";
        }
        else if(data === false){
          // console.log(this.findMeCard(obj.data), obj.data, "wrong");
          return "singleTiles--wrong";
        }
        else{
          return "";
        }
      },
      imageClassChanger(obj){
        if (obj.data === this.noCardSignal || this.findMeCard(obj.data) === this.noCardSignal) {
          return "";
        }
        else{
          return "jackInTheBox";
        }
      }
    }
  }
</script>
