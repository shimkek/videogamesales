<template>
  <div class="searchForm">
    <b-form
      class="searchForm__contents"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
      <div class="mb-2">
        <label class="mb-1"> Name</label>
        <input
          v-model="searchParams.selectedDealName"
          placeholder='"Mass Effect 2"'
          type="text"
          class="custom-select"
        />
      </div>

      <div class="selectBlock mb-2">
        <label
          class="mb-1 formBlock__element"
          for="inline-form-custom-select-sortby"
          >Sort by</label
        >
        <b-form-select
          id="inline-form-custom-select-sortby"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="searchParams.sortBy"
          :options="sortByOptions"
        ></b-form-select>
      </div>

      <div class="selectBlock mb-2">
        <label
          class="mb-1 formBlock__element"
          for="inline-form-custom-select-store"
          >Store</label
        >
        <b-form-select
          id="inline-form-custom-select-store"
          v-model="searchParams.selectedStoreId"
        >
          <b-form-select-option :value="null"> Choose...</b-form-select-option>
          <b-form-select-option
            v-for="store in stores"
            :disabled="isStoreActive(store.isActive)"
            :value="store.storeID"
            :key="store.storeID"
          >
            {{ store.storeName }}</b-form-select-option
          >
        </b-form-select>
      </div>

      <div class="selectBlock mb-2">
        <label
          class="mb-1 formBlock__element"
          for="inline-form-custom-select-metacritic"
          >Metacritic Score</label
        >
        <b-form-select
          id="inline-form-custom-select-metacritic"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="searchParams.selectedMetacriticScore"
          :options="metacriticOptions"
        ></b-form-select>
      </div>

      <div class="mb-3">
        <b-form-checkbox
          v-model="searchParams.onSale"
          name="check-button"
          switch
        >
          On sale only
        </b-form-checkbox>
      </div>

      <button class="formBlock searchButton" type="submit">
        Search <b-icon icon="search"></b-icon>
      </button>
      <button class="formBlock resetButton" type="reset">
        Clear <b-icon icon="x-octagon"></b-icon>
      </button>
      <p v-if="totalPageCount" class="pageCounter">
        {{ pageNumber + 1 }} out of {{ totalPageCount }}
      </p>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParams: {
        selectedDealName: null,
        selectedStoreId: null,
        selectedMetacriticScore: null,
        onSale: true,
        sortBy: null,
      },
      sortByOptions: [
        { text: "Choose...", value: null },
        { text: "Savings", value: ["Savings", 0] },
        { text: "Title", value: ["Title", 0] },
        { text: "Recent", value: ["Recent", 0] },
        { text: "Highest Price", value: ["Price", 1] },
        { text: "Lowest Price", value: ["Price", 0] },
        { text: "Metacritic score", value: ["Metacritic", 0] },
      ],
      metacriticOptions: [
        { text: "Choose...", value: null },
        { text: ">40", value: 40 },
        { text: ">60", value: 60 },
        { text: ">80", value: 80 },
        { text: ">90", value: 90 },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.addSearchParams();
      console.log(this.searchParams);
      this.$store.commit("clearDeals");
      this.$store.commit("addPreloader");
      this.$store.dispatch("fetchDeals");
    },
    onReset() {
      this.emptySearchParams();
    },
    isStoreActive(storeState) {
      return storeState ? false : true;
    },
    addSearchParams() {
      let params = {
        params: {
          title: this.searchParams.selectedDealName,
          storeID: this.searchParams.selectedStoreId,
          metacritic: this.searchParams.selectedMetacriticScore,
          onSale: this.searchParams.onSale ? 1 : 0,
          pageNumber: 0,
          pageSize: 50,
        },
      };
      if (this.searchParams.sortBy !== null) {
        params.params.sortBy = this.searchParams.sortBy[0];
        params.params.desc = this.searchParams.sortBy[1];
      }
      this.$store.commit("addSearchParams", params);
    },
    emptySearchParams() {
      this.searchParams.selectedDealName = null;
      this.searchParams.selectedStoreId = null;
      this.searchParams.selectedMetacriticScore = null;
      this.searchParams.sortBy = null;
      this.searchParams.onSale = true;
    },
  },
  computed: {
    stores() {
      return this.$store.state.stores;
    },
    pageNumber() {
      return this.$store.state.params.params.pageNumber;
    },
    totalPageCount() {
      return this.$store.state.totalPageCount;
    },
  },
};
</script>

<style lang="scss">
.searchButton {
  display: inline-block;
  color: #fff;
  background-color: #343a40;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  transition: none;
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.searchButton:hover {
  color: #fff;
  background-color: #23272b;
  border-color: #1d2124;
}
.resetButton {
  display: inline-block;
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #a72935;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  transition: none;
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.resetButton:hover {
  background-color: #7a2029;
  border-color: #7a2029;
  color: #ffffff;
}
option {
  color: rgb(184, 184, 184);
}
option:disabled {
  color: rgb(110, 110, 110);
}
.pageCounter {
  position: absolute;
  bottom: -50px;
  width: 218px;
  text-align: center;
}

.searchForm {
  position: sticky;
  top: 20px;
  background-color: #262837;
  color: #828191;

  &__contents {
    width: 260px;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    flex-direction: column;
    align-items: stretch;
  }
  &__contents label {
    color: rgb(155, 154, 172);
  }
}
.custom-select {
  width: 100%;
  background-color: #363342 !important;
  border-color: #363342 !important;
  color: #828191 !important;
}
.selectBlock {
  &__element {
    padding-right: 1%;
  }
}
@media only screen and (max-width: 1024px) {
  .pageCounter {
    display: none;
  }
  .formBlock {
    margin-top: 10px;
  }
  .searchForm {
    position: static;
    width: 100%;
    &__contents {
      border: none;
      padding: 0 20px 0 20px;
      width: 100%;
      height: initial;
    }
  }
}
</style>
