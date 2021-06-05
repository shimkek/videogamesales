<template>
  <div>
    <div v-for="deal in displayedDeals" :key="deal.dealID">
      <b-card class="custom-card">
        <b-card-title
          ><router-link
            :to="{ name: 'DealInfo', params: { dealID: deal.dealID } }"
            class="title"
            >{{ deal.title }}</router-link
          ><img
            :src="getStoreLogo(deal.storeID)"
            :title="getStoreName(deal.storeID)"
            class="storeLogo"
        /></b-card-title>
        <div class="price">
          <span class="price price_normal">{{ deal.normalPrice + "$" }}</span>
          <span class="price price_discounted">{{ deal.salePrice + "$" }}</span>
          <b-card-text class="small text-muted"
            >Last updated {{ formatDate(deal.lastChange) }}</b-card-text
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deals",
  props: {
    dealsLink: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      displayedDeals: [],
      stores: [],
    };
  },
  async mounted() {
    const response = await fetch(this.dealsLink);
    const deals = await response.json();
    const storesResponse = await fetch(
      "https://www.cheapshark.com/api/1.0/stores"
    );
    const stores = await storesResponse.json();
    console.log(deals);
    console.log(stores);
    this.displayedDeals = deals;
    this.stores = stores;
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
};
</script>

<style lang="scss">
.title {
  text-decoration: none;
  color: black;
}
img {
  max-width: 100px;
  margin: 0;
}
.custom-card {
  margin: auto;
  margin-bottom: 5px;
  max-width: 740px;
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
