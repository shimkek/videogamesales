<template>
  <div class="custom-card shadow-sm">
    <router-link
      :to="{ name: 'DealInfo', params: { dealID: deal.dealID } }"
      class="title"
    >
      <div class="custom-card__image">
        <img
          class="custom-card__thumb"
          :src="getBiggerResolution(deal.thumb)"
        />
        <img
          class="custom-card__thumb custom-card__thumb_blurred"
          :src="getBiggerResolution(deal.thumb)"
        />
      </div>
    </router-link>
    <div class="custom-card__contents">
      <p style="margin-bottom: 3px">
        <router-link
          :to="{ name: 'DealInfo', params: { dealID: deal.dealID } }"
          class="title"
          >{{ deal.title }}</router-link
        ><span
          v-if="deal.normalPrice !== deal.salePrice"
          class="discountPercentage"
          >{{ "-" + Math.trunc(deal.savings) + "%" }}</span
        ><span class="heart" :class="{ heart_active: isLiked }"
          ><span
            class="heart__symbol"
            :class="{ heart_active__symbol: isLiked }"
            @click="addToLiked(deal.dealID)"
            >♡</span
          ></span
        >
      </p>
      <div class="price">
        <span
          v-if="deal.normalPrice !== deal.salePrice"
          class="price price_normal"
          >{{ deal.normalPrice + "$" }}</span
        >
        <span class="price price_discounted">{{ deal.salePrice + "$" }}</span>
      </div>
      <p v-if="deal.lastChange" class="updated-text">
        Last updated {{ formatDate(deal.lastChange) }}
      </p>
    </div>
    <div cols="2" class="storeLogo-container">
      <img
        :src="getStoreLogo(deal.storeID)"
        :title="getStoreName(deal.storeID)"
        class="storeLogo"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import db from "../firebase/firebaseInit";

export default {
  data() {
    return {
      isLiked: false,
    };
  },
  mounted() {
    if (this.checkForDuplicateDeals(this.deal.dealID)) {
      this.isLiked = true;
    }
  },
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
    getBiggerResolution(thumb) {
      if (thumb.includes("capsule_sm_120")) {
        return thumb.replaceAll("capsule_sm_120", "header");
      }
      return thumb;
    },
    addToLiked(dealID) {
      if (this.user.loggedIn && db) {
        if (this.checkForDuplicateDeals(dealID)) {
          console.log("This deal is already added to Liked Deals.");
          console.log("Removing this deal from the Liked List.");
          this.removeFromLiked(dealID);
          return;
        }
        db.ref(
          "users/" + firebase.auth().currentUser.uid + "/likedDeals/"
        ).push(dealID);
        this.isLiked = true;
      } else {
        console.log("The user is not authorized.");
      }
    },
    removeFromLiked(dealID) {
      const duplicateFound = this.checkForDuplicateDeals(dealID);
      if (this.user.loggedIn && db && duplicateFound) {
        const dealKey = this.likedDeals.find(
          (likedDeal) => likedDeal.id === dealID
        ).key;
        console.log(dealKey);
        if (dealKey) {
          db.ref(
            "users/" +
              firebase.auth().currentUser.uid +
              "/likedDeals/" +
              dealKey
          ).remove();
          this.isLiked = false;
        }
      }
    },
    checkForDuplicateDeals(dealID) {
      const foundDeal = this.likedDeals.find(
        (likedDeal) => likedDeal.id === dealID
      );
      if (foundDeal) {
        this.isLiked = true;
        return true;
      }
      return false;
    },
  },
  computed: {
    stores() {
      return this.$store.state.stores;
    },
    likedDeals() {
      return this.$store.state.user.likedDeals;
    },
    ...mapGetters({
      user: "user",
    }),
  },
  watch: {
    "$store.state.user.likedDeals": function () {
      if (this.checkForDuplicateDeals(this.deal.dealID)) {
        this.isLiked = true;
      }
    },
  },
};
</script>
<style lang="scss">
.heart {
  transition-timing-function: ease-in;
  transition: cubic-bezier(0.895, 0.03, 0.685, 0.22) 400ms;
  position: absolute;
  z-index: 4;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: #363342;
  border-radius: 10px;
  &__symbol {
    margin: -5px;
    color: gray;
    font-size: 28px;
  }
  &__symbol:hover {
    cursor: pointer;
    color: darkgray;
  }
}
.heart_active {
  background-color: #c7005d;
  transition-timing-function: ease-in;
  transition: cubic-bezier(0.895, 0.03, 0.685, 0.22) 400ms;
  &__symbol {
    transition: width 2s;
    color: black;
  }
}
.discountPercentage {
  font-size: 12px;
  margin-left: 5px;
  padding: 3px 6px 3px 6px;
  border-radius: 10px;
  background-color: rgba(99, 99, 99, 0.226);
  white-space: nowrap;
}
.title {
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: #ffffff;
}
.title:hover {
  color: gray;
}
.img {
  margin: 0;
}
.updated-text {
  color: #82808f;
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 10px;
  font-size: 80%;
}
.custom-card {
  position: relative;
  border-radius: 30px;
  margin-bottom: 18px;
  width: 31%;
  max-height: 300px;
  background-color: #262837 !important;
  &__image {
    overflow: hidden;
    position: relative;
    max-height: none;
    z-index: 2;
    width: 100%;
    height: 40%;
  }
  &__thumb {
    position: absolute;
    width: inherit;
    height: 100%;
    object-fit: contain;
    border-radius: 30px 30px 0 0;
    z-index: 2;
    &_blurred {
      position: initial;
      z-index: 1;
      object-fit: cover;
      filter: blur(4px);
    }
  }
  &__contents {
    padding: 15px;
  }
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
  position: absolute;
  z-index: 4;
  top: 10px;
  left: 10px;
  display: flex;
  justify-items: center;
  flex-direction: row;
  align-content: flex-end;
  align-items: center;
  justify-content: flex-end;
}
.storeLogo {
  width: inherit;
  max-height: 32px;
  max-width: 32px;
  object-fit: contain;
}
</style>
