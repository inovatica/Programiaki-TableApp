<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <router-link :to="{name:'GamesList'}" class="backBtn"></router-link>
    <header>
      <p class="title">
        <span class="navy-blue">P</span>
        <span class="green">s</span>
        <span class="orange">z</span>
        <span class="pink">c</span>
        <span class="orange">z</span>
        <span class="light-blue">ó</span>
        <span class="yellow">ł</span>
        <span class="navy-blue">k</span>
        <span class="green">a&nbsp;&nbsp;&nbsp;</span>
        <span class="orange">c</span>
        <span class="light-blue">z</span>
        <span class="pink">ę</span>
        <span class="light-blue">ś</span>
        <span class="yellow">ć&nbsp;&nbsp;&nbsp;</span>
        <span class="navy-blue">1</span>
      </p>
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
            "key": "maze-main"
          },
          {
            "name": "Poziom 2",
            "key": "maze-main"
          },
          {
            "name": "Poziom 3",
            "key": "maze-main"
          },
          {
            "name": "Poziom 4",
            "key": "maze-main"
          },
          {
            "name": "Poziom 5",
            "key": "maze-main"
          },
          {
            "name": "Poziom 6",
            "key": "maze-main"
          },
          {
            "name": "Poziom 7",
            "key": "maze-main"
          },
          {
            "name": "Poziom 8",
            "key": "maze-main"
          },
          {
            "name": "Poziom 9",
            "key": "maze-main"
          },
          {
            "name": "Poziom 10",
            "key": "maze-main"
          },
          {
            "name": "Poziom 11",
            "key": "maze-main"
          },
          {
            "name": "Poziom 12",
            "key": "maze-main"
          },
          {
            "name": "Poziom 13",
            "key": "maze-main"
          },
          {
            "name": "Poziom 14",
            "key": "maze-main"
          },
          {
            "name": "Poziom 15",
            "key": "maze-main"
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
  p.title{
    font-family: 'RussoOne-Regular';
    font-size: 60px;
    color: #fff;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    letter-spacing: -4px;
    font-weight: 800;
  }
</style>
