<template>
  <div class="container py-4">
    <Loader
      v-if="
        this.dealInfo === null ||
        this.stores === null ||
        isDealInfoLoading === true
      "
    />

    <div v-if="dealInfo && stores" class="deal">
      <div class="dealInfo__header">
        <div>
          <h1 class="dealInfo__title">
            {{ dealInfo.gameInfo.name }}
          </h1>
        </div>
        <div class="dealInfo__storeLogo-container">
          <img
            v-if="stores !== null"
            :src="getStoreLogo(dealInfo.gameInfo.storeID)"
            :title="getStoreName(dealInfo.gameInfo.storeID)"
            class="dealInfo__storeLogo"
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
        <div class="about-card">
          <div class="card-body_flex">
            <div class="about">
              <p v-if="RAWGFetched">
                All the screenshots and game data is taken from
                <a href="https://rawg.io/">rawg.io</a>
              </p>
              <h4>About</h4>

              <p v-if="dealInfo.gameInfo.releaseDate !== 0">
                <span class="boldItem">Release date: </span>
                {{ formatDate(dealInfo.gameInfo.releaseDate) }}
              </p>
              <p>
                <span class="boldItem">Publisher: </span>
                {{ dealInfo.gameInfo.publisher }}
              </p>

              <div v-if="RAWGFetched">
                <p
                  v-if="
                    gameInfo.released && dealInfo.gameInfo.releaseDate === 0
                  "
                >
                  <span class="boldItem">Release date: </span>
                  {{
                    new Date(Date.parse(gameInfo.released)).toLocaleDateString(
                      "en-GB"
                    )
                  }}
                </p>
                <p v-if="gameInfo.esrb_rating">
                  <span class="boldItem">ESRB Rating: </span>
                  {{ gameInfo.esrb_rating.name_en }}
                </p>
                <p v-if="gameInfo.genres.length">
                  <span class="boldItem">Genres: </span>
                  {{ getGenres(gameInfo.genres) }}
                </p>
                <p v-if="gameInfo.platforms">
                  <span class="boldItem">Platforms: </span>
                  {{ getPlatformNames(gameInfo.platforms) }}
                </p>
                <p v-if="gameInfo.tags.length">
                  <span class="boldItem">Tags: </span>
                  {{ getTags(gameInfo.tags) }}
                </p>
              </div>

              <p>
                <span class="boldItem">Cheapest ever: </span>
                {{ dealInfo.cheapestPrice.date === 0 ? "yes" : "no, "
                }}<span v-if="dealInfo.cheapestPrice.date !== 0"
                  >{{ dealInfo.cheapestPrice.price }}$ on
                  {{ formatDate(dealInfo.cheapestPrice.date) }}</span
                >
              </p>
              <div v-if="dealInfo.cheaperStores.length > 0">
                <span class="boldItem"
                  >There is lower price in other store: </span
                ><br />
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
                </p>
              </div>
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
                    src="https://www.freeiconspng.com/uploads/steam-icon-19.png"
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
          <div v-if="RAWGFetched">
            <p class="wrongGame">
              Is this wrong? Try choosing different game below.
            </p>
            <select v-model="RAWGFetchedID" class="custom-select">
              <option
                v-for="game in RAWGFetched"
                :key="game.id"
                :value="RAWGFetched.indexOf(game)"
              >
                {{ game.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="deal-images" v-if="RAWGFetched">
        <ImageSlider :games="RAWGFetched" :index="RAWGFetchedID" />
      </div>
      <div class="otherDeals" v-if="!isDealInfoLoading">
        <h3>You might also be interested</h3>
        <Deals />
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Deals from "../components/Deals.vue";
import Loader from "../components/Loader.vue";
import ImageSlider from "../components/ImageSlider.vue";

export default {
  data() {
    return {
      fetchLink: "https://www.cheapshark.com/api/1.0/deals?id=",
      dealInfo: null,
      redirectedFromAnotherDeal: false,
      isDealInfoLoading: true,
      RAWGFetched: null,
      RAWGFetchedID: 0,
    };
  },
  components: {
    Deals,
    Loader,
    ImageSlider,
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
      return date.toLocaleDateString("en-GB");
    },
    getStoreLogo(storeId) {
      return `https://www.cheapshark.com/${this.$store.state.stores[storeId].images.logo}`;
    },
    getStoreName(storeId) {
      return this.$store.state.stores[storeId].storeName;
    },
    getDealInfo() {
      this.dealInfo = null;
      this.images = null;
      this.isDealInfoLoading = true;
      //if the page was reloaded and stores object emptied
      if (this.stores === null) {
        this.$store.dispatch("fetchStores");
      }
      axios
        .get(this.fetchLink + this.dealID)
        .then((dealInfo) => {
          console.log(dealInfo.data);
          this.isDealInfoLoading = false;
          this.dealInfo = dealInfo.data;
          this.getGameInfo();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getGameInfo() {
      this.RAWGFetched = null;
      this.RAWGFetchedID = 0;
      axios
        .get(
          `https://api.rawg.io/api/games?key=${this.apiKey}&search=${
            this.dealInfo.gameInfo.name
          }${this.searchExact ? "&search_exact=true" : ""}`
        )
        .then((response) => {
          console.log(response);
          if (response.data.results.length > 0) {
            console.log("Added game info.");
            this.RAWGFetched = response.data.results;
            this.images =
              response.data.results[this.RAWGFetchedID].short_screenshots;
          } else console.error("Game info not found.");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPlatformNames(platforms) {
      return platforms
        .map((platform) => {
          return platform.platform["name"];
        })
        .join(", ");
    },
    getTags(tags) {
      let filteredTags = tags.filter((tag) => {
        return tag.language === "eng";
      });

      return filteredTags
        .map((tag) => {
          return tag["name"];
        })
        .join(", ");
    },
    getGenres(genres) {
      return genres
        .map((genre) => {
          return genre["name"];
        })
        .join(", ");
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
    apiKey() {
      return this.$store.state.RAWGApiKey;
    },
    searchExact() {
      return this.$store.state.searchExactName;
    },
    gameInfo() {
      return this.RAWGFetched[this.RAWGFetchedID];
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
@import "../styles/variables.scss";
.boldItem {
  font-weight: 700;
}
.wrongGame {
  margin-bottom: 5px;
  font-size: 80%;
  color: #707070;
}
.deal-images {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 4%;
  background: $secondary-color;
}
.dealInfo__storeLogo-container {
  display: flex;
  justify-items: center;
  flex-direction: row;
  align-content: flex-end;
  align-items: center;
  justify-content: flex-end;
}
.dealInfo__storeLogo {
  width: inherit;
  max-height: 64px;
  max-width: 64px;
  object-fit: contain;
}
.dealInfo__header {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
}
.dealInfo__title {
  margin-top: 0;
  color: #fff;
  font-size: 2.5rem;
}
.about {
  &__cheaperDeal {
    margin: 8px 0 0 0;
  }
}
.about-card {
  border-radius: 0 15px 15px 15px;
  background-color: $secondary-color;
  padding: 1rem;
}
.otherDeals {
  margin-top: 50px;
}
.dealLink {
  background: #7a20b6;
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
  width: 100%;
  color: #fff;
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
  box-shadow: #000000c4 3px 3px 15px;
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
    height: 1rem;
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
  background: radial-gradient(circle, #00fffffc 7%, #3333ff 45%, #00d4ff 100%);
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
