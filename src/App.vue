<template>
  <div id="app">
    <background/>
    <ScreenLock/>
    <router-view/>
    <div class="hidden">

    </div>
  </div>
</template>

<script>
  import Background from "./components/partials/background";
  import ScreenLock from "./components/partials/ScreenLock";

  export default {
    components: {Background, ScreenLock},
    name: 'App',
    data(){
      return {
        assetsDir: '@assets'
      }
    },
    mounted() {
      this.cantPlay();
      this.canPlay();
    },
    methods: {
      cantPlay: function () {
        this.$parent.$data.message.bindOnMessage({
          name: 'cant_play',
          func: () => {
            this.$store.commit('setPlayStatus', false);
          }
        });
      },
      canPlay: function () {
        this.$parent.$data.message.bindOnMessage({
          name: 'can_play',
          func: () => {
            this.$store.commit('setPlayStatus', true);
          }
        });
      }
    }
  }
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
