<template>
  <div class="cardsbar clear-fix">
    <div class="leftSide">

    </div>
    <div class="centerSide tilesBox animated fadeInUp">
      <div v-for="i in table" class="singleTiles singleTiles--empty"><img :v-attr="giveMeUrl()"/></div>
    </div>
    <div class="rightSide buttonBox">
      <div @click="checkLvl" class="checkButton animated rubberBand" id="checkButton">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slotsview',
    mounted(){
      this.$data.table = this.$parent.$parent.$parent.$data.table.Table.slots.up;
    },
    data: function(){
      return{
        cards: this.$parent.$data.cards,
        noCardSignal: "#",
        orientation: "up",
        table: null
      }
    },
    methods: {
      checkLvl() {
        console.log(this.$parent.$parent.$parent.$data.table.Table.slots.up[13].data);
        console.log(this.$data.table.Table.slots.up[13].data);
      },
      giveMeUrl(){
        return "#";
      }
    }
  }
</script>

