<template>
  <div class="page-container d-flex justify-content-center">
    <div v-show="areDealsShown" class="deals-container">
      <Deals class="" />
    </div>

    <div v-show="isSearchFormOpen" class="searchForm-container">
      <button @click="closeSearchForm" class="searchForm__back-btn">
        ⟵ Back to deals
      </button>
      <SearchForm />
    </div>

    <button class="searchForm__button" @click="showSearchForm">
      Search Filters <b-icon icon="sliders" />
    </button>
  </div>
</template>

<script>
import Deals from "../components/Deals.vue";
import SearchForm from "../components/SearchForm.vue";
export default {
  name: "Home",
  components: {
    Deals,
    SearchForm,
  },
  data() {
    return {
      isSearchFormOpen: false,
      areDealsShown: true,
    };
  },
  methods: {
    showSearchForm() {
      this.isSearchFormOpen = true;
      this.areDealsShown = false;
    },

    closeSearchForm() {
      this.isSearchFormOpen = false;
      this.areDealsShown = true;
    },
  },
};
</script>

<style lang="scss">
.page-container {
  position: relative;
}

.deals-container {
  margin-right: 10px;
}

.searchForm-container {
  @media (min-width: 1025px) {
    display: block !important;
  }
}

.searchForm__button {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffffff;
  border: 1px solid #000000;
  color: #000000;
  padding: 7px 18px;
  font-size: 1.1rem;
  border-radius: 20px;
}

.searchForm__back-btn {
  display: none;
}

@media only screen and (max-width: 1024px) {
  .deals-container {
    margin-right: 0px;
  }
  .searchForm-container {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    background: white;
  }

  .searchForm__button {
    display: inline-block;
  }

  .searchForm__back-btn {
    display: inline-block;
    border: none;
    color: blueviolet;
    margin: 10px;
    font-size: 18px;
    padding: 5px 12px;
    border-radius: 8px;
  }
}
</style>
