<template>
  <div>
    <div
      class="d-flex justify-content-center mb-3"
      v-if="dealInfo === undefined || stores === null"
    >
      <b-spinner></b-spinner>
    </div>
    <div v-show="isPreloaderVisible" class="preloader" />
    <div v-if="dealInfo && stores" class="deal">
      <div class="dealInfo__header">
        <div>
          <h1 class="dealInfo__title">
            {{ dealInfo.gameInfo.name }}
          </h1>
        </div>
        <div class="storeLogo-container">
          <img
            v-if="stores !== null"
            :src="getStoreLogo(dealInfo.gameInfo.storeID)"
            :title="getStoreName(dealInfo.gameInfo.storeID)"
            class="storeLogo"
          />
        </div>
      </div>
      <div class="deal-price">
        <span class="deal-price price_discounted">Deal price: </span>
        <span
          v-if="dealInfo.gameInfo.retailPrice !== dealInfo.gameInfo.salePrice"
          class="deal-price price_normal"
        >
          {{ dealInfo.gameInfo.retailPrice + "$" }}</span
        >
        <span>{{ dealInfo.gameInfo.salePrice + "$" }}</span>
      </div>
      <a
        :href="'https://www.cheapshark.com/redirect?dealID=' + dealID"
        class="dealLink"
        >Get the deal<b-icon icon="arrow-up-right"></b-icon
      ></a>
      <div>
        <b-card class="about-card">
          <div class="card-body_flex">
            <div class="about">
              <h4>About</h4>
              <b-card-text>
                Publisher: {{ dealInfo.gameInfo.publisher }}
              </b-card-text>

              <b-card-text v-if="dealInfo.gameInfo.releaseDate !== 0"
                >Release date:
                {{ formatDate(dealInfo.gameInfo.releaseDate) }}</b-card-text
              >
              <b-card-text>
                Cheapest ever:
                {{ dealInfo.cheapestPrice.date === 0 ? "yes" : "no, "
                }}<span v-if="dealInfo.cheapestPrice.date !== 0"
                  >{{ dealInfo.cheapestPrice.price }}$ on
                  {{ formatDate(dealInfo.cheapestPrice.date) }}</span
                >
              </b-card-text>
              <b-card-text v-if="dealInfo.cheaperStores.length > 0">
                There is lower price in other store: <br />
                <p
                  v-for="cheaperDeal in dealInfo.cheaperStores"
                  :key="cheaperDeal.dealID"
                  class="about__cheaperDeal"
                >
                  <router-link
                    :to="{
                      name: 'DealInfo',
                      params: { dealID: cheaperDeal.dealID },
                    }"
                    >{{ cheaperDeal.salePrice }}$ at
                    {{ getStoreName(cheaperDeal.storeID) }}</router-link
                  >
                </p></b-card-text
              >
            </div>
            <div class="ratings">
              <div class="rating">
                <div
                  class="ratingCircle"
                  :class="ratingColor(dealInfo.gameInfo.steamRatingPercent)"
                >
                  <div
                    class="ratingCircle__text"
                    v-if="Number(dealInfo.gameInfo.steamRatingPercent) !== 0"
                  >
                    {{ dealInfo.gameInfo.steamRatingPercent }}
                  </div>
                  <div
                    class="ratingCircle__text"
                    v-if="Number(dealInfo.gameInfo.steamRatingPercent) === 0"
                  >
                    No rating
                  </div>
                </div>
                <p class="ratingCircle__description">
                  <img
                    src="https://alternative.me/media/256/steam-icon-zkaj1ullopzk7u8a-c.png"
                    class="ratingCircle__description-icon"
                  />Steam rating
                </p>
              </div>
              <div class="rating">
                <div
                  class="ratingCircle"
                  :class="ratingColor(dealInfo.gameInfo.metacriticScore)"
                >
                  <div
                    class="ratingCircle__text"
                    v-if="Number(dealInfo.gameInfo.metacriticScore) !== 0"
                  >
                    {{ dealInfo.gameInfo.metacriticScore }}
                  </div>
                  <div
                    class="ratingCircle__text"
                    v-if="Number(dealInfo.gameInfo.metacriticScore) === 0"
                  >
                    No rating
                  </div>
                </div>
                <p class="ratingCircle__description">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png"
                    class="ratingCircle__description-icon"
                  />Metacritic score
                </p>
              </div>
            </div>
          </div>
        </b-card>
      </div>

      <SteamAppNews
        v-if="dealInfo.gameInfo.steamAppID"
        :appID="dealInfo.gameInfo.steamAppID"
      />

      <div class="otherDeals">
        <h3>You might also be interested</h3>
        <Deals />
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Deals from "../components/Deals.vue";
import SteamAppNews from "../components/SteamAppNews.vue";
export default {
  data() {
    return {
      fetchLink: "https://www.cheapshark.com/api/1.0/deals?id=",
      dealInfo: undefined,
      redirectedFromAnotherDeal: false,
    };
  },
  components: {
    Deals,
    SteamAppNews,
  },
  methods: {
    ratingColor(rating) {
      rating = Number(rating);
      if (rating < 60 && rating !== 0) {
        return "red";
      } else if (rating >= 90) {
        return "purple";
      } else if (rating >= 70) {
        return "blue";
      } else if (rating >= 60) {
        return "green";
      }
    },
    formatDate(time) {
      const date = new Date(time * 1000); // create Date object
      return date.toLocaleDateString("ru-RU", {});
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
    getDealInfo() {
      this.dealInfo = undefined;
      //if the page was reloaded and stores object emptied
      if (this.stores === null) {
        this.$store.dispatch("fetchStores");
      }
      axios
        .get(this.fetchLink + this.dealID)
        .then((dealInfo) => {
          console.log(dealInfo.data);
          this.dealInfo = dealInfo.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  async mounted() {
    this.getDealInfo();
  },
  computed: {
    displayedDeals() {
      return this.$store.state.fetchedDeals;
    },
    stores() {
      return this.$store.state.stores;
    },
    dealID() {
      return this.$route.params.dealID;
    },
    isPreloaderVisible() {
      return this.dealInfo === undefined ? true : false;
    },
  },
  watch: {
    dealID(prev) {
      if (prev !== null) {
        this.getDealInfo();
      }
    },
  },
};
</script>

<style lang="scss">
.dealInfo__header {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
}
.about {
  &__cheaperDeal {
    margin: 8px 0 0 0;
  }
}
.about-card {
  border-top-left-radius: 0;
}
.otherDeals {
  margin-top: 50px;
}
.dealLink {
  background: #20c997;
  color: black;
  font-size: 30px;
  padding: 10px 10px 3px 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.dealLink:hover {
  text-decoration: none;
}
.card-body_flex {
  display: flex;
  justify-content: space-between;
}
.ratings {
  display: flex;
}
.rating {
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.deal-price {
  font-size: 20px;
  margin-bottom: 40px;
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
.deal {
  margin: auto;
  max-width: 840px;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
}
.ratingCircle {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 150px;
  width: 150px;
  margin: 0;
  border-radius: 50%;
  background: black;

  &__text {
    color: white;
    font-size: 30px;
  }
  &__description {
    padding-top: 10px;
    font-weight: 400;
  }
  &__description-icon {
    height: 1.5rem;
    padding-right: 2px;
  }
}
//90+
.purple {
  background: rgb(195, 63, 251);
  background: radial-gradient(
    circle,
    rgba(195, 63, 251, 1) 6%,
    rgba(252, 70, 107, 0.76234243697479) 100%
  );
}
//70+
.blue {
  background: rgb(6, 184, 222);
  background: radial-gradient(
    circle,
    rgba(6, 184, 222, 1) 17%,
    rgba(41, 41, 240, 1) 45%,
    rgba(0, 212, 255, 1) 100%
  );
}
//60+
.green {
  background: rgb(67, 251, 63);
  background: radial-gradient(
    circle,
    rgba(67, 251, 63, 1) 32%,
    rgba(255, 157, 53, 1) 83%
  );
}
//<60
.red {
  background: rgb(251, 63, 63);
  background: radial-gradient(
    circle,
    rgba(251, 63, 63, 1) 32%,
    rgba(219, 113, 0, 1) 83%
  );
}

@media only screen and (max-width: 768px) {
  .dealInfo__title {
    font-size: 2rem;
  }
  h3,
  h4 {
    font-size: 1.5rem;
  }
  .dealLink {
    font-size: 25px;
  }
  .card-body_flex {
    display: block;
  }
  .ratings {
    margin-top: 20px;
  }
}
@media only screen and (max-width: 425px) {
  .dealInfo__title {
    font-size: 1.8rem;
  }
  .rating {
    margin-right: 20px;
  }
}
@media only screen and (max-width: 365px) {
  .ratingCircle {
    height: 120px;
    width: 120px;
  }
}
</style>
