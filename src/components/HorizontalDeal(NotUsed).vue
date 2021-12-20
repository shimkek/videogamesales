<template>
  <b-card class="custom-card shadow-sm">
    <b-row>
      <b-col cols="10" class="custom-col">
        <h4>
          <router-link
            :to="{ name: 'DealInfo', params: { dealID: deal.dealID } }"
            class="title"
            >{{ deal.title }}</router-link
          ><span
            v-if="deal.normalPrice !== deal.salePrice"
            class="discountPercentage"
            >{{ "-" + Math.trunc(deal.savings) + "%" }}</span
          ><span class="heart" />
        </h4>
        <div class="price">
          <span
            v-if="deal.normalPrice !== deal.salePrice"
            class="price price_normal"
            >{{ deal.normalPrice + "$" }}</span
          >
          <span class="price price_discounted">{{ deal.salePrice + "$" }}</span>
        </div>
        <p class="updated-text">
          Last updated {{ formatDate(deal.lastChange) }}
        </p>
      </b-col>
      <b-col cols="2" class="storeLogo-container custom-col">
        <img
          :src="getStoreLogo(deal.storeID)"
          :title="getStoreName(deal.storeID)"
          class="storeLogo"
        />
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  props: {
    deal: Object,
  },
  methods: {
    formatDate(time) {
      const date = new Date(time * 1000); // create Date object
      return date.toLocaleString("ru-RU");
    },
    getStoreLogo(storeId) {
      return `https://www.cheapshark.com/${this.$store.state.stores[storeId].images.logo}`;
    },
    getStoreName(storeId) {
      return this.$store.state.stores[storeId].storeName;
    },
  },
  computed: {
    fetchedDeals() {
      return this.$store.state.fetchedDeals;
    },
    stores() {
      return this.$store.state.stores;
    },
    dealsLink() {
      return this.$store.state.searchQuery;
    },
  },
};
</script>
<style lang="scss">
/*
.heart {
  display: flex;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: #363342;
  border-radius: 15px;
  &__symbol {
    color: gray;
    font-size: 28px;
  }
} */
.discountPercentage {
  font-size: 14px;
  margin-left: 5px;
}
.title {
  text-decoration: none;
  color: #ffffff;
}
.title:hover {
  color: gray;
}
img {
  max-width: 100px;
  margin: 0;
}
.updated-text {
  color: #82808f;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 80%;
}
.custom-card {
  margin-bottom: 12px;
  max-width: 100%;
  background-color: #262837 !important;
}
.price {
  font-size: 20px;
  padding-bottom: 10px;
  &_normal {
    color: red;
    background-image: linear-gradient(
      transparent 11px,
      #cc1f1f 15px,
      #cc1f1f 15px,
      transparent 13px
    );
    margin-right: 5px;
  }
}
.storeLogo-container {
  display: flex;
  justify-items: center;
  flex-direction: row;
  align-content: flex-end;
  align-items: center;
  justify-content: flex-end;
}
.storeLogo {
  width: inherit;
  max-height: 64px;
  max-width: 64px;
  object-fit: contain;
}
</style>
