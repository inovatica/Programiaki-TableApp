<template>
  <div class="screen-lock" v-bind:class="{ 'screen-lock--active': isActive }">
    <background/>
    <p class="screen-lock__message">Stół zablokowany.</p>
  </div>
</template>

<script>
  import Background from "./background";

  export default {
    components: { Background },
    name: 'ScreenLock',
    data() {
      return {
        isActive: false
      }
    },
    mounted() {
      this.screenLock();
      this.screenUnlock();
    },
    methods: {
      screenLock: function () {
        this.$parent.$parent.$data.message.bindOnMessage({
          name: 'screen_lock',
          func: () => {
            this.isActive = true;
          }
        });
      },
      screenUnlock: function () {
        this.$parent.$parent.$data.message.bindOnMessage({
          name: 'screen_unlock',
          func: () => {
            this.isActive = false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .screen-lock {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: -100vh;
    z-index: -1;
    transition: all .7s;
  }

  .screen-lock--active {
    z-index: 9999999;
    top: 0vh;
  }

  .screen-lock__message {
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
