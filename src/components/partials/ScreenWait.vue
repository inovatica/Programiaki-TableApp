<template>
  <div class="screen-wait" v-bind:class="{ 'screen-wait--active': this.$store.state.canPlay }">
    <background/>
    <p class="screen-wait__message">Oczekiwanie na przedszkolankę.</p>
  </div>
</template>

<script>
  import Background from "./background";

  export default {
    components: { Background },
    name: 'ScreenWait'
  }
</script>

<style scoped>
  .screen-wait {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    transition: all .7s;
    z-index: 9999999;
    top: 0vh;
  }

  .screen-wait--active {
    top: -100vh;
    z-index: -1;
  }

  .screen-wait__message {
    position: absolute;
    top: 35%;
    left: 50%;
    margin-right: -50%;
    transform: translateX(-50%);
    font-family: 'RussoOne-Regular', sans-serif;
    font-size: 60px;
    color: #FFFFFF;
  }
</style>
