<template>
  <div class="deals">
    <div class="d-flex justify-content-center mb-3" v-if="areDealsLoading">
      <b-spinner></b-spinner>
    </div>

    <div v-if="stores">
      <div v-for="deal in displayedDeals" :key="deal.dealID">
        <b-card class="custom-card">
          <b-row>
            <b-col cols="10">
              <b-card-title
                ><router-link
                  :to="{ name: 'DealInfo', params: { dealID: deal.dealID } }"
                  class="title"
                  >{{ deal.title }}</router-link
                ><span
                  v-if="deal.normalPrice !== deal.salePrice"
                  class="discountPercentage"
                  >{{ "-" + Math.trunc(deal.savings) + "%" }}</span
                ></b-card-title
              >
              <div class="price">
                <span
                  v-if="deal.normalPrice !== deal.salePrice"
                  class="price price_normal"
                  >{{ deal.normalPrice + "$" }}</span
                >
                <span class="price price_discounted">{{
                  deal.salePrice + "$"
                }}</span>
                <b-card-text class="small text-muted"
                  >Last updated {{ formatDate(deal.lastChange) }}</b-card-text
                >
              </div>
            </b-col>
            <b-col cols="2">
              <img
                :src="getStoreLogo(deal.storeID)"
                :title="getStoreName(deal.storeID)"
                class="storeLogo"
            /></b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deals",
  async created() {
    if (this.displayedDeals === null) {
      if (this.stores === null) {
        this.$store.dispatch("mountedFetch");
      } else {
        this.$store.dispatch("fetchDeals");
      }
    }
  },
  methods: {
    formatDate(time) {
      const date = new Date(time * 1000); // create Date object
      return date.toLocaleString("ru-RU");
    },
    getStoreLogo(inputStoreID) {
      const object = this.stores.find((obj) => obj.storeID === inputStoreID);
      const logoLink = object.images.logo;
      return `https://www.cheapshark.com/${logoLink}`;
    },
    getStoreName(inputStoreID) {
      const object = this.stores.find((obj) => obj.storeID === inputStoreID);
      return object.storeName;
    },
  },
  computed: {
    displayedDeals() {
      return this.$store.state.fetchedDeals;
    },
    stores() {
      return this.$store.state.stores;
    },
    dealsLink() {
      return this.$store.state.searchQuery;
    },
    areDealsLoading() {
      return this.$store.state.areDealsLoading;
    },
  },
};
</script>

<style lang="scss">
.discountPercentage {
  font-size: 14px;
  margin-left: 5px;
}
.deals {
  margin-top: 20px;
}
.deals a:hover {
  text-decoration: none;
}
.title {
  text-decoration: none;
  color: black;
}
img {
  max-width: 100px;
  margin: 0;
}
.custom-card {
  margin-bottom: 5px;
  max-width: 740px;
  max-height: 136px;
}
.price {
  font-size: 20px;
  &_normal {
    color: red;
    background-image: linear-gradient(
      transparent 13px,
      #cc1f1f 15px,
      #cc1f1f 15px,
      transparent 15px
    );
    margin-right: 5px;
  }
}
.storeLogo {
  max-height: 64px;
  max-width: 64px;
  float: right;
}
</style>
