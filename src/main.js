import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import firebase from "firebase/app";
import "firebase/auth";
import db from "./firebase/firebaseInit";

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
let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
  store.dispatch("fetchUser", user);
  if (user) {
    //get likedDeals and set listeners
    db.ref("users/" + user.uid + "/likedDeals").on(
      "child_added",
      (childSnapshot) => {
        console.log("Added to liked: " + childSnapshot.val());
        store.commit("addLikedDeal", {
          id: childSnapshot.val(),
          data: null,
          key: childSnapshot.key,
        });
      }
    );

    db.ref("users/" + user.uid + "/likedDeals").on(
      "child_removed",
      (childSnapshot) => {
        console.log("Removed from liked: " + childSnapshot.val());
        let foundIndex = -1;

        store.state.user.likedDeals.map((element, index) => {
          if (element.id === childSnapshot.val()) {
            foundIndex = index;
            return;
          }
        });
        if (foundIndex > -1) {
          store.commit("removeLikedDeal", foundIndex);
        } else {
          console.error("The index of the deal to remove was not found.");
        }
      }
    );
  } else {
    //disable listener
    db.ref().off();
  }
});
