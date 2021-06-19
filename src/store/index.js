import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedDeals: null,
    searchQuery: null,
    stores: null,
    areDealsLoading: true,
  },
  mutations: {
    addDeals(state, deals) {
      state.fetchedDeals = deals;
    },
    addStores(state, stores) {
      state.stores = stores;
    },
    createSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    changeDealsLoadingStatus(state, status) {
      state.areDealsLoading = status;
    },
  },
  actions: {
    async fetchDeals(context) {
      context.commit("addDeals", []);
      context.commit("changeDealsLoadingStatus", true);
      const response = await fetch(context.state.searchQuery);
      const deals = await response.json();
      console.log(deals);
      context.commit("addDeals", deals);
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
