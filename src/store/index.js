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
        pageSize: 50,
      },
    },
    user: {
      loggedIn: false,
      data: null,
    },
    stores: null,
    areDealsLoading: true,
    cheapSharkAPILink: "https://www.cheapshark.com/api/1.0/deals",
    totalPageCount: null,
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
    setLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
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
          console.log(
            `${context.state.params.params.pageNumber + 1}/${
              context.state.totalPageCount
            }`
          );
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
      context.commit("setLoggedIn", user !== null);
      if (user) {
        context.commit("setUser", {
          email: user.email,
        });
      } else {
        context.commit("setUser", null);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
});
