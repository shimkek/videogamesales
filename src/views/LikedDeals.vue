<template>
  <div>
    <div class="container">
      <h1 style="color: white; padding-top: 20px">{{ user.data.email }}</h1>
    </div>
    <div v-if="stores" class="deals container page-container d-flex">
      <Deal
        v-for="deal in likedDealsFetched"
        :key="deal.id"
        :deal="deal.data"
      />
    </div>
    <div
      class="d-flex justify-content-center mb-3"
      v-if="areLikedDealLoading && stores"
    >
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import Deal from "../components/Deal.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    Loader,
    Deal,
  },
  data() {
    return {
      areLikedDealLoading: true,
    };
  },
  name: "likedDeals",
  methods: {
    async fetchDeal(dealID) {
      const response = await axios.get(
        "https://www.cheapshark.com/api/1.0/deals?id=" + dealID
      );
      return response.data;
    },
    async fetchLikedDeals() {
      console.log("fetching liked deals...");
      this.areLikedDealLoading = true;

      this.$store.state.user.likedDeals.map(async (likedDeal) => {
        if (likedDeal.data === null) {
          const dealInfo = await this.fetchDeal(likedDeal.id);
          //console.log(dealInfo);
          const dealInfoCorrected = {
            internalName: dealInfo.gameInfo.name,
            title: dealInfo.gameInfo.name,
            dealID: likedDeal.id,
            storeID: dealInfo.gameInfo.storeID,
            gameID: dealInfo.gameInfo.gameID,
            salePrice: dealInfo.gameInfo.salePrice,
            normalPrice: dealInfo.gameInfo.retailPrice,
            savings: Math.round(
              ((dealInfo.gameInfo.retailPrice - dealInfo.gameInfo.salePrice) /
                dealInfo.gameInfo.retailPrice) *
                100
            ),
            metacriticScore: dealInfo.gameInfo.metacriticScore,
            steamRatingText: dealInfo.gameInfo.steamRatingText,
            steamRatingPercent: dealInfo.gameInfo.steamRatingPercent,
            steamRatingCount: dealInfo.gameInfo.steamRatingCount,
            steamAppID: dealInfo.gameInfo.steamAppID,
            releaseDate: dealInfo.gameInfo.releaseDate,
            lastChange: undefined,
            thumb: dealInfo.gameInfo.thumb,
          };
          likedDeal.data = dealInfoCorrected;
        }
      });
      this.areLikedDealLoading = false;
      console.log("Fetching completed.");
    },
  },
  computed: {
    likedDealsFetched() {
      return this.$store.state.user.likedDeals.filter(
        (deal) => deal.data !== null
      );
    },
    stores() {
      return this.$store.state.stores;
    },
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.fetchLikedDeals();
    if (this.stores === null) {
      this.$store.dispatch("fetchStores");
    }
  },
  watch: {
    "$store.state.user.likedDeals": function () {
      this.fetchLikedDeals();
    },
  },
};
</script>
<style lang="scss">
.deals {
  color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
