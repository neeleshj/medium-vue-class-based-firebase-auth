import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

import * as firebase from 'firebase';

// Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app: any;

const init = () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('setUser', user);
  } else {
    store.commit('setUser', null);
  }

  init();
});
