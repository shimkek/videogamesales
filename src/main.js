import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import firebase from "firebase";

import VueObserveVisibility from "vue-observe-visibility";
Vue.use(VueObserveVisibility);

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDC2sMf0c3Weol2jX9W3KlGhGVm0Y3XMRg",
  authDomain: "videogamesales-43fbd.firebaseapp.com",
  databaseURL:
    "https://videogamesales-43fbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "videogamesales-43fbd",
  storageBucket: "videogamesales-43fbd.appspot.com",
  messagingSenderId: "375618188872",
  appId: "1:375618188872:web:6d7b7d2a5f79432cd18a7d",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
