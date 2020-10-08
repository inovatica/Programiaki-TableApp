<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <header>
      <img class="animated headImage" src="./img/games.svg"/>
    </header>
    <div class="levelsContainer clear-fix">
      <template v-for="game in games">
        <router-link v-on:click.native="gameRequest" :to="{name:'game-'+game.key}">
          <span>{{ game.name }}</span>
        </router-link>
        <br/>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      gameRequest: function () {
        this.$socket.send(JSON.stringify({name: 'game_request'}));
      }
    },
    data () {
      return {
        games: [
          {
            "name": "Kolory i kształty",
            "key": "lerndad"
          },
          {
            "name": "Zwierzaki",
            "key": "zoo"
          },
          {
            "name": "Puzzle",
            "key": "puzzle"
          },
          {
            "name": "Pszczółka część 1",
            "key": "maze"
          },
          {
            "name": "Pszczółka część 2",
            "key": "collector"
          },
          {
            "name": "Robocik",
            "key": "roboProgramiak"
          }
          // ,
          // {
          //   "name": "JSbot",
          //   "key": "JSbot"
          // }
        ]
      }
    }
  }
</script>

<style scoped>
  .headImage{
    max-width: 400px
  }
</style>
