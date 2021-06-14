<template>
  <div class="stickySearchForm">
    <b-form class="inline" @submit="onSubmit">
      <div>
        <b-form-input
          v-model="searchParams.selectedDealName"
          placeholder='"Mass Effect 2"'
          type="text"
        ></b-form-input>
      </div>

      <div class="selectBlock">
        <label
          class="mr-sm-2 formBlock__element"
          for="inline-form-custom-select-sortby"
          >Sort by</label
        >
        <b-form-select
          id="inline-form-custom-select-sortby"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="searchParams.sortBy"
          :options="[
            { text: 'Choose...', value: null },
            { text: 'Savings', value: ['Savings', 1] },
            { text: 'Title', value: ['Title', 0] },
            { text: 'Recent', value: ['Recent', 0] },
            { text: 'Highest Price', value: ['Price', 1] },
            { text: 'Lowest Price', value: ['Price', 0] },
            { text: 'Metacritic score', value: ['Metacritic', 0] },
          ]"
        ></b-form-select>
      </div>

      <div class="selectBlock">
        <label
          class="mr-sm-2 formBlock__element"
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

      <div class="selectBlock">
        <label
          class="mr-sm-2 formBlock__element"
          for="inline-form-custom-select-metacritic"
          >Metacritic Score</label
        >
        <b-form-select
          id="inline-form-custom-select-metacritic"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="searchParams.selectedMetacriticScore"
          :options="[
            { text: 'Choose...', value: null },
            { text: '>40', value: 40 },
            { text: '>60', value: 60 },
            { text: '>80', value: 80 },
            { text: '>90', value: 90 },
          ]"
        ></b-form-select>
      </div>

      <div>
        <b-form-checkbox
          v-model="searchParams.onSale"
          name="check-button"
          switch
        >
          On sale
        </b-form-checkbox>
      </div>

      <b-button variant="outline-dark" class="formBlock" type="submit"
        >Search <b-icon icon="search"></b-icon
      ></b-button>
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
      cheapSharkAPILink: "https://www.cheapshark.com/api/1.0/deals?",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.getSearchQuery();
      if (this.searchQuery === null) {
        console.log("No search params entered");
        return;
      }
      console.log(`Searching: "${this.searchQuery}"`);
      this.$store.dispatch("fetchDeals");
      this.emptySearchParams();
      this.$store.commit("createSearchQuery", null);
    },
    isStoreActive(storeState) {
      return storeState ? false : true;
    },
    getSearchQuery() {
      let searchQuery = `${this.cheapSharkAPILink}onSale=${
        this.searchParams.onSale ? 1 : 0
      }&`;
      if (this.searchParams.selectedDealName !== null) {
        searchQuery = searchQuery.concat(
          `title=${this.searchParams.selectedDealName}&`
        );
      }
      if (this.searchParams.selectedStoreId !== null) {
        searchQuery = searchQuery.concat(
          `storeID=${this.searchParams.selectedStoreId}&`
        );
      }
      if (this.searchParams.selectedMetacriticScore !== null) {
        searchQuery = searchQuery.concat(
          `metacritic=${this.searchParams.selectedMetacriticScore}&`
        );
      }
      if (this.searchParams.sortBy !== null) {
        searchQuery = searchQuery.concat(
          `sortBy=${this.searchParams.sortBy[0]}&desc=${this.searchParams.sortBy[1]}`
        );
      }
      this.$store.commit("createSearchQuery", searchQuery);
    },
    emptySearchParams() {
      this.searchParams.selectedDealName = null;
      this.searchParams.selectedStoreId = null;
      this.searchParams.selectedMetacriticScore = null;
      this.searchParams.sortBy = null;
    },
  },
  computed: {
    searchQuery() {
      return this.$store.state.searchQuery;
    },
    stores() {
      return this.$store.state.stores;
    },
  },
};
</script>

<style lang="scss">
option {
  color: black;
}
option:disabled {
  color: rgb(170, 170, 170);
}
.stickySearchForm {
  position: sticky;
  top: 20px;
}
.inline {
  position: absolute;
  right: 15%;
  width: 240px;
  height: 370px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  flex-direction: column;
  align-items: stretch;
}
.custom-select {
  width: 100%;
}
.selectBlock {
  &__element {
    padding-right: 1%;
  }
}
</style>
