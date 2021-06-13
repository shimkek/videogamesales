<template>
  <div>
    <b-form class="inline" @submit="onSubmit">
      <div>
        <b-form-input
          v-model="searchParams.selectedDealName"
          placeholder='"Mass Effect 2"'
          type="text"
        ></b-form-input>
      </div>

      <div class="formBlock">
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

      <div class="formBlock">
        <label
          class="mr-sm-2 formBlock__element"
          for="inline-form-custom-select-metacritif"
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
      },
      cheapSharkAPILink: "https://www.cheapshark.com/api/1.0/deals?",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.getSearchQuery(this.searchParams);
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
    getSearchQuery(searchParams) {
      //check is params are empty
      let isEmpty = true;

      let searchQuery = this.cheapSharkAPILink;
      if (searchParams.selectedDealName !== null) {
        searchQuery = searchQuery.concat(
          `title=${searchParams.selectedDealName}&`
        );
        isEmpty = false;
      }
      if (searchParams.selectedStoreId !== null) {
        searchQuery = searchQuery.concat(
          `storeID=${searchParams.selectedStoreId}&`
        );
        isEmpty = false;
      }
      if (searchParams.selectedMetacriticScore !== null) {
        searchQuery = searchQuery.concat(
          `metacritic=${searchParams.selectedMetacriticScore}`
        );
        isEmpty = false;
      }
      if (isEmpty) {
        return;
      } else {
        this.$store.commit("createSearchQuery", searchQuery);
      }
    },
    emptySearchParams() {
      this.searchParams.selectedDealName = null;
      this.searchParams.selectedStoreId = null;
      this.searchParams.selectedMetacriticScore = null;
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
.inline {
  max-width: 740px;
  max-height: 70px;
  display: flex;
  margin: auto;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.formBlock {
  &__element {
    padding-right: 1%;
  }
}
</style>
