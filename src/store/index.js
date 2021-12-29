import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    fetchedDeals: [],
    params: {
      params: {
        onSale: 1,
        pageNumber: 0,
        pageSize: 48,
      },
    },
    user: {
      loggedIn: false,
      data: null,
      likedDeals: [],
      uid: null,
    },
    stores: null,
    areDealsLoading: true,
    cheapSharkAPILink: "https://www.cheapshark.com/api/1.0/deals",
    totalPageCount: null,
    RAWGApiKey: "6b69ce6eb521454d94d35d17a6c94542",
    searchExactName: true,
  },
  mutations: {
    addDeals(state, deals) {
      state.fetchedDeals = [...state.fetchedDeals, ...deals];
    },
    addStores(state, stores) {
      state.stores = stores;
    },
    addSearchParams(state, searchParams) {
      state.params = searchParams;
    },
    changeDealsLoadingStatus(state, status) {
      state.areDealsLoading = status;
    },
    nextPage(state) {
      state.params.params.pageNumber += 1;
    },
    changeTotalPageCount(state, totalPageCount) {
      state.totalPageCount = totalPageCount;
    },
    clearDeals(state) {
      state.fetchedDeals = [];
    },
    setUser(state, user) {
      state.user.uid = user.uid;
      state.user.data = user.data;
      state.user.loggedIn = user.loggedIn;
    },
    addLikedDeal(state, likedDeal) {
      state.user.likedDeals.push(likedDeal);
    },
    removeLikedDeal(state, index) {
      state.user.likedDeals.splice(index, 1);
    },
    emptyLikedDeals(state) {
      state.user.likedDeals = [];
    },
  },
  actions: {
    async fetchDeals(context) {
      context.commit("changeDealsLoadingStatus", true);
      await axios
        .get(context.state.cheapSharkAPILink, context.state.params)
        .then((response) => {
          console.log(response);
          context.commit("addDeals", response.data);
          context.commit(
            "changeTotalPageCount",
            Number(response.headers["x-total-page-count"])
          );
          //console.log(`${context.state.params.params.pageNumber + 1}/${context.state.totalPageCount}`);
        });
      context.commit("changeDealsLoadingStatus", false);
    },
    async fetchStores(context) {
      await axios
        .get("https://www.cheapshark.com/api/1.0/stores")
        .then((response) => {
          const storesObject = response.data.reduce(function (object, store) {
            object[store.storeID] = store;
            return object;
          }, {});
          context.commit("addStores", storesObject);
        });
    },
    async loadMoreDeals(context) {
      context.commit("nextPage");
      context.dispatch("fetchDeals");
    },
    fetchUser(context, user) {
      if (user) {
        console.log("user uid: " + user.uid);
        const newUser = {
          loggedIn: true,
          data: {
            email: user.email,
          },
          uid: user.uid,
        };
        context.commit("setUser", newUser);
      } else {
        const newUser = {
          loggedIn: false,
          data: {
            email: null,
          },
          uid: null,
        };
        console.log("User null.");
        context.commit("emptyLikedDeals");
        context.commit("setUser", newUser);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
});
