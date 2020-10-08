<template>
  <div class="mainContainerMiddle" data-place="gameslist">
    <ScreenWait/>
    <router-link :to="{name:'GamesList'}" class="backBtn"></router-link>
    <header>
      <p class="title">
        <span class="navy-blue">K</span>
        <span class="green">o</span>
        <span class="orange">l</span>
        <span class="pink">o</span>
        <span class="light-blue">r</span>
        <span class="yellow">y&nbsp;&nbsp;&nbsp;</span>
        <span class="navy-blue">i&nbsp;&nbsp;&nbsp;</span>
        <span class="green">k</span>
        <span class="orange">s</span>
        <span class="pink">z</span>
        <span class="light-blue">t</span>
        <span class="yellow">a</span>
        <span class="navy-blue">ł</span>
        <span class="green">t</span>
        <span class="orange">y</span>
      </p>
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
  import ScreenWait from '../../../partials/ScreenWait.vue';

  export default {
    components: { ScreenWait },
    data () {
      return {
        games: [
          {
            "name": "Kolory",
            "key": "lerndad-lvl1"
          },
          {
            "name": "Kształty",
            "key": "lerndad-lvl11"
          },
          {
            "name": "Kolory i kształty",
            "key": "lerndad-lvl21"
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
