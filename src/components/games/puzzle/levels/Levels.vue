<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <router-link :to="{name:'GamesList'}" class="backBtn"></router-link>
    <header>
      <img class="animated headImage" src="./img/puzzle.svg"/>
    </header>
    <div class="levelsContainer clear-fix">
      <template v-for="game in games">
        <router-link :to="{name:game.key}">
          <span>{{ game.name }}</span>
        </router-link>
        <br/>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        games: [
          {
            "name": "Poziom 1",
            "key": "puzzle-lvl1"
          },
          {
            "name": "Poziom 2",
            "key": "puzzle-lvl2"
          },
          {
            "name": "Poziom 3",
            "key": "puzzle-lvl3"
          },
          {
            "name": "Poziom 4",
            "key": "puzzle-lvl4"
          },
          {
            "name": "Poziom 5",
            "key": "puzzle-lvl5"
          },
          {
            "name": "Poziom 6",
            "key": "puzzle-lvl6"
          },
          {
            "name": "Poziom 7",
            "key": "puzzle-lvl7"
          },
          {
            "name": "Poziom 8",
            "key": "puzzle-lvl8"
          },
          {
            "name": "Poziom 9",
            "key": "puzzle-lvl9"
          },
          {
            "name": "Poziom 10",
            "key": "puzzle-lvl10"
          },
          {
            "name": "Poziom 11",
            "key": "puzzle-lvl11"
          },
          {
            "name": "Poziom 12",
            "key": "puzzle-lvl12"
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .headImage {
    max-width: 400px
  }
</style>
