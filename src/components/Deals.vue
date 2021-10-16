<template>
  <div class="deals" id="deals">
    <div v-if="stores">
      <div v-for="deal in fetchedDeals" :key="pageNumber + deal.dealID">
        <b-card class="custom-card shadow-sm">
          <b-row>
            <b-col cols="10" class="custom-col">
              <b-card-title
                ><router-link
                  :to="{ name: 'DealInfo', params: { dealID: deal.dealID } }"
                  class="title"
                  >{{ deal.title }}</router-link
                ><span
                  v-if="deal.normalPrice !== deal.salePrice"
                  class="discountPercentage"
                  >{{ "-" + Math.trunc(deal.savings) + "%" }}</span
                ><b-icon
                  icon="heart"
                  class="rounded-circle "
                  animation="spin-reverse-pulse"
                  style="color: #7952b3"
                ></b-icon
              ></b-card-title>
              <div class="price">
                <span
                  v-if="deal.normalPrice !== deal.salePrice"
                  class="price price_normal"
                  >{{ deal.normalPrice + "$" }}</span
                >
                <span class="price price_discounted">{{
                  deal.salePrice + "$"
                }}</span>
              </div>
              <b-card-text class="small text-muted"
                >Last updated {{ formatDate(deal.lastChange) }}</b-card-text
              >
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
      </div>
      <p
        v-if="areMaxPagesReached & (this.totalPageCount !== null)"
        class="scrollEndText"
      >
        <b-icon icon="emoji-frown" />
        That's it!
      </p>
      <div class="d-flex justify-content-center mb-3" v-if="areDealsLoading">
        <Loader />
      </div>
    </div>
    <div class="preloader" v-if="isPreloaderVisible" />
    <div
      v-observe-visibility="areMaxPagesReached ? false : observerParams"
      class="observer"
    ></div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";

export default {
  components: {
    Loader,
  },
  name: "Deals",
  data() {
    return {
      observerParams: {
        callback: this.visibilityChanged,
        intersection: {
          threshold: 1.0,
        },
        throttle: 600,
      },
    };
  },
  async created() {
    if (this.fetchedDeals.length === 0) {
      if (this.stores === null) {
        this.$store.dispatch("fetchStores");
        this.$store.dispatch("fetchDeals");
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
    getStoreLogo(storeId) {
      return `https://www.cheapshark.com/${this.$store.state.stores[storeId].images.logo}`;
    },
    getStoreName(storeId) {
      return this.$store.state.stores[storeId].storeName;
    },
    visibilityChanged(isVisible, entry) {
      console.log(entry);
      if (isVisible && !this.areDealsLoading) {
        console.log("load more deals");
        this.$store.dispatch("loadMoreDeals");
      }
    },
  },
  computed: {
    areMaxPagesReached() {
      return this.pageNumber + 1 >= this.totalPageCount ? true : false;
    },
    fetchedDeals() {
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
    pageNumber() {
      return this.$store.state.params.params.pageNumber;
    },
    totalPageCount() {
      return this.$store.state.totalPageCount;
    },
    isPreloaderVisible() {
      return this.fetchedDeals.length === 0 ? true : false;
    },
  },
};
</script>

<style lang="scss">
.preloader {
  width: 740px;
  max-width: 100vw;
  height: 101vh;
  min-width: 0;
}
.observer {
  width: 100%;
  height: 20vh;
}
.discountPercentage {
  font-size: 14px;
  margin-left: 5px;
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
  margin-bottom: 12px;
  max-width: 100%;
}

.price {
  font-size: 20px;
  padding-bottom: 10px;
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
.scrollEndText {
  font-size: 25px;
  text-align: center;
  color: var(--secondary);
}
@media only screen and (max-width: 768px) {
  .price {
    padding-bottom: 5px;
  }
}
@media only screen and (max-width: 425px) {
  .title {
    font-size: 1.3rem;
  }
  .custom-card {
    margin-bottom: 8px;
  }
}
@media only screen and (max-width: 576px) {
  .title {
    font-size: 1.1rem;
  }
  .custom-col {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}
</style>
