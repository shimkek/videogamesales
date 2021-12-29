<template>
  <div>
    <div v-if="stores" class="deals">
      <Deal
        v-for="deal in fetchedDeals"
        :key="pageNumber + deal.dealID"
        :deal="deal"
      />
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
    <div class="preloader" v-if="isPreloaderVisible" />
    <div
      v-observe-visibility="areMaxPagesReached ? false : observerParams"
      class="observer"
    ></div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import Deal from "../components/Deal.vue";

export default {
  components: {
    Loader,
    Deal,
  },
  name: "Deals",
  data() {
    return {
      observerParams: {
        callback: this.visibilityChanged,
        intersection: {
          threshold: 1.0,
        },
        throttle: 400,
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
    visibilityChanged(isVisible) {
      //console.log(entry);
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

.deals {
  color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
