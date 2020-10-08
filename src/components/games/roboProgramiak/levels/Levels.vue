<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <router-link :to="{name:'GamesList'}" class="backBtn"></router-link>
    <header>
      <p class="title">
        <span class="navy-blue">R</span>
        <span class="green">o</span>
        <span class="orange">b</span>
        <span class="pink">o</span>
        <span class="orange">t&nbsp;&nbsp;&nbsp;</span>
        <span class="light-blue">S</span>
        <span class="yellow">t</span>
        <span class="navy-blue">e</span>
        <span class="green">f</span>
        <span class="orange">a</span>
        <span class="light-blue">n</span>
        <span class="pink">e</span>
        <span class="light-blue">k</span>
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
            "key": "roboProgramiak-main"
          },
          {
            "name": "Poziom 2",
            "key": "roboProgramiak-main"
          },
          {
            "name": "Poziom 3",
            "key": "roboProgramiak-main"
          },
          {
            "name": "Poziom 4",
            "key": "roboProgramiak-main"
          },
          {
            "name": "Poziom 5",
            "key": "roboProgramiak-main"
          },
          {
            "name": "Poziom 6",
            "key": "roboProgramiak-main"
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
