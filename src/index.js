
import Vue from 'vue';
import App from './App.vue';
import router from './router.js';


router.afterEach(function (to, from, next) {

});

export default new Vue({
  el: '#app_container',
  router,
  components: { App },
  template: '<App/>'
})
