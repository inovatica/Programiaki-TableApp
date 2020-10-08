// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Background from './components/partials/background'
import VueNativeSock from 'vue-native-websocket'
import Ws_table from './packages/ws_table/index.js'
import Ws_message from './packages/ws_message/index.js'
import Slotsview from './components/partials/slots_view'
import draggable from 'vuedraggable';
import Vuex from 'vuex';

Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.mixin({
  mounted(){

  },
  methods: {
    playSuccessSound: function () {
      let audio = new Audio(require('@/assets/sounds/success.mp3'));
      audio.play();
    },
    playErrorSound: function () {
      let audio = new Audio(require('@/assets/sounds/error.mp3'));
      audio.play();
    },
    svgPath: function (item) {
      return require('@/assets/img/svg/' + item + '.svg')
    },
    buildInstances: function (_vueInstance) {
      if (this.$data.message === undefined) {
        this.$data.message = new Ws_message(this.$options.sockets, _vueInstance);
        this.$data.table = new Ws_table();
      } else {
        console.error("Message instance already exists.");
        return false;
      }
    },
    addWSEventToWatch: function (_data, _vueInstance) {
      if (_vueInstance.$data.message === undefined) {
        _vueInstance.buildInstances();
      }

      _vueInstance.$data.message.bindOnMessage(_data);

    },
    socketSend: function (_mess) {
      if (this.$socket.readyState === 1) {
          let mess = JSON.stringify(_mess);
          console.log("%c[R2D2]", 'color:blue', " - I am sending ws message: \n\n" + mess);
          return this.$socket.send(mess);
      }
      else {
        this.$socket.onopen = () => {
          let mess = JSON.stringify(_mess);
          console.log("%c[R2D2]", 'color:blue', " - I am sending ws message: \n\n" + mess);
          return this.$socket.send(mess);
        };
      }
    }
  }
});

Vue.use(VueNativeSock,'ws://172.16.0.2:8886',{
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 20, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 1000, // (Number) how long to initially wait before attempting a new (1000)
});
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    canPlay: true,
  },
  mutations: {
    setPlayStatus(state, status) {
      state.canPlay = status;
    }
  }
});

Vue.component('Slotsview', Slotsview);
Vue.component('draggable', draggable);

new Vue({
  el: '#app',
  router,
  components: {
    App, Background
  },
  template: '<App/>',
  created(){
    this.buildInstances(this);
  },
  store
});
