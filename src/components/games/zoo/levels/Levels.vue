<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <router-link :to="{name:'GamesList'}" class="backBtn"></router-link>
    <header>
      <img class="animated headImage" src="../img/zoo.svg"/>
    </header>
    <div class="levelsContainer clear-fix">
      <template v-for="(game, index) in games">
        <router-link :to="{name:game.key, params:{id: index+1}}">
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
            "key": "zoo-main"
          },
          {
            "name": "Poziom 2",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 3",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 4",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 5",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 6",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 7",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 8",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 9",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 10",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 11",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 12",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 13",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 14",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 15",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 16",
            "key": "zoo-main"
          },
          {
            "name": "Poziom 17",
            "key": "zoo-main"
          }
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
