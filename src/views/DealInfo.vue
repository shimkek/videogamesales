<template>
  <div :v-if="dealInfo">
    <b-card>
      <b-card-title>{{ dealInfo.gameInfo.name }}</b-card-title>
      <div class="price">
        <span class="price price_discounted">{{
          "Current price: " + dealInfo.gameInfo.salePrice + "$"
        }}</span>
      </div>
    </b-card>
    <div
      class="steamRating"
      :class="ratingColor(dealInfo.gameInfo.steamRatingPercent)"
    >
      <div
        class="steamRating__text"
        v-if="Number(dealInfo.gameInfo.steamRatingPercent) !== 0"
      >
        {{ dealInfo.gameInfo.steamRatingPercent }}
      </div>
      <div
        class="steamRating__text"
        v-if="Number(dealInfo.gameInfo.steamRatingPercent) === 0"
      >
        No rating
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dealID: this.$route.params.dealID,
      fetchLink: "https://www.cheapshark.com/api/1.0/deals?id=",
      dealInfo: undefined,
    };
  },
  methods: {
    ratingColor(rating) {
      if (rating < 60 && rating !== 0) {
        return "red";
      } else if (rating >= 90) {
        return "purple";
      } else if (rating >= 70) {
        return "blue";
      } else if (rating >= 60) {
        return "green";
      } else {
        return "noRating";
      }
    },
  },
  async mounted() {
    const response = await fetch(this.fetchLink + this.dealID);
    const dealInfo = await response.json();
    console.log(dealInfo);
    this.dealInfo = dealInfo;
  },
};
</script>

<style lang="scss">
.steamRating {
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
</style>
