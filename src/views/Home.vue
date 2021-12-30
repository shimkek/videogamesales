<template>
  <div class="container page-container d-flex justify-content-center">
    <div v-show="areDealsShown" class="deals-container">
      <Deals />
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
@import "../styles/variables.scss";
.page-container {
  position: relative;
  margin-top: 30px;
  padding-bottom: 200px;
}

.deals-container {
  margin-right: 20px;
  width: 100%;
}

.searchForm-container {
  z-index: 6;
  @media (min-width: 992px) {
    display: block !important;
  }
}

.searchForm__button {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 5px 15px 5px 15px;
  border: 2px solid $dark-purple;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 500;
  background-color: $dark-purple;
  color: #dadada;
}

.searchForm__back-btn {
  display: none;
}

@media only screen and (max-width: 992px) {
  .deals-container {
    margin-right: 0px;
  }
  .searchForm-container {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 6;
    top: 0;
    background-color: $secondary-color;
  }

  .searchForm__button {
    display: inline-block;
    z-index: 5;
  }

  .searchForm__back-btn {
    margin: 20px 0 20px 20px;
    display: inline-block;
    padding: 5px 15px 5px 15px;
    border: 2px solid $dark-purple;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    background-color: $dark-purple;
    color: #dadada;
  }
}
</style>
