<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <header>
      <img class="animated headImage" src="../img/maze.svg"/>
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
            "name": "Mały kwadrat",
            "key": "shapes-main"
          },
          {
            "name": "Duży kwadrat",
            "key": "shapes-main"
          },
          {
            "name": "Mały prostokąt",
            "key": "shapes-main"
          },
          {
            "name": "Duży prostokąt",
            "key": "shapes-main"
          },
          {
            "name": "Mały szybki kwadrat",
            "key": "shapes-main"
          },
          {
            "name": "Duży szybki kwadrat",
            "key": "shapes-main"
          },
          {
            "name": "Mały szybki prostokąt",
            "key": "shapes-main"
          },
          {
            "name": "Duży szybki prostokąt",
            "key": "shapes-main"
          },
          {
            "name": "Malujemy mały kwadrat",
            "key": "shapes-main"
          },
          {
            "name": "Malujemy duży kwadrat",
            "key": "shapes-main"
          },
          {
            "name": "Malujemy mały prostokąt",
            "key": "shapes-main"
          },
          {
            "name": "Malujemy duży prostokąt",
            "key": "shapes-main"
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
