import Vue from "vue";
import Vuex from "vuex";
const axios = require("axios");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedDeals: null,
    params: {
      params: {
        onSale: 1,
      },
    },
    stores: null,
    areDealsLoading: true,
    cheapSharkAPILink: "https://www.cheapshark.com/api/1.0/deals",
  },
  mutations: {
    addDeals(state, deals) {
      state.fetchedDeals = deals;
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
  },
  actions: {
    async fetchDeals(context) {
      context.commit("addDeals", []);
      context.commit("changeDealsLoadingStatus", true);
      await axios
        .get(context.state.cheapSharkAPILink, context.state.params)
        .then((response) => {
          console.log(response);
          context.commit("addDeals", response.data);
        });
      context.commit("changeDealsLoadingStatus", false);
    },
    async mountedFetch(context) {
      context.dispatch("fetchStores");
      context.dispatch("fetchDeals");
    },
    async fetchStores(context) {
      const storesResponse = await fetch(
        "https://www.cheapshark.com/api/1.0/stores"
      );
      const stores = await storesResponse.json();
      console.log(stores);
      context.commit("addStores", stores);
    },
  },
  modules: {},
});
