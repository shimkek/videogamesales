<template>
  <div>
    <Deals class="centered" />

    <div class="searchForm-container" id="searchForm-container">
      <SearchForm class="searchForm" />
    </div>

    <div class="searchForm__button-container">
      <button class="searchForm__button" @click="showSearchForm()">
        Search
      </button>
    </div>
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
  methods: {
    showSearchForm() {
      const searchForm = document.getElementById("searchForm-container");
      searchForm.style.display = "block";
      console.log("test");
    },
  },
};
</script>
<style lang="scss">
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.searchForm {
  position: sticky;
  top: 20px;
}
.searchForm__button {
  background-color: #17a2b8;
  display: none;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #17a2b8;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  width: 80%;
  max-width: 450px;

  &-container {
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 5%;
    left: 0;
    right: 0;
    z-index: 3;
  }
}
@media only screen and (max-width: 1280px) {
  .searchForm__button {
    display: inline-block;
  }
  .searchForm-container {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    background: white;
  }
  .searchForm {
    position: relative;
    width: 100%;
    font-size: 1.5rem;
    height: 60%;
  }
  .inline {
    width: 100%;
    height: 100%;
    border: none;
  }
  .pageCounter {
    display: none;
  }
}
</style>
