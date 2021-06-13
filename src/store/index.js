import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedDeals: [],
    searchQuery: null,
    stores: [],
    dealsAreLoading: true,
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
    changeLoadingStatus(state, status) {
      state.dealsAreLoading = status;
    },
  },
  actions: {
    async fetchDeals(context) {
      context.commit("addDeals", []);
      context.commit("changeLoadingStatus", true);
      const response = await fetch(context.state.searchQuery);
      const deals = await response.json();
      console.log(deals);
      context.commit("addDeals", deals);
      context.commit("changeLoadingStatus", false);
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
