import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedDeals: [],
    searchQuery: null,
    stores: [],
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
  },
  actions: {
    async fetchDeals(context) {
      const response = await fetch(context.state.searchQuery);
      const deals = await response.json();
      console.log(deals);
      context.commit("addDeals", deals);
    },
    async mountedFetch(context) {
      const storesResponse = await fetch(
        "https://www.cheapshark.com/api/1.0/stores"
      );
      const stores = await storesResponse.json();
      console.log(stores);
      context.commit("addStores", stores);
      context.dispatch("fetchDeals");
    },
  },
  modules: {},
});
