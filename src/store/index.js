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
          console.log(response.data);
          context.commit("addStores", response.data);
        });
    },
    async loadMoreDeals(context) {
      context.commit("nextPage");
      context.dispatch("fetchDeals");
    },
  },
});
