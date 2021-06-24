<template>
  <div class="steamAppNews" v-if="appNews">
    <h3>Latest news from Steam feed</h3>
    <div
      v-for="newsItem in appNews.newsitems"
      :key="newsItem.gid"
      class="newsItem"
    >
      <a class="newsItem__title" :href="newsItem.title">{{ newsItem.title }}</a
      ><span>{{ formatDate(newsItem.date) }}</span>
      <div v-html="newsItem.contents" />
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  data() {
    return {
      appNews: null,
    };
  },
  props: {
    appID: {
      type: String,
      required: true,
    },
  },
  methods: {
    getNews() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${this.appID}&count=5&maxlength=300&format=json`
        )
        .then((response) => {
          console.log(response);
          this.appNews = response.data.appnews;
        })
        .catch((error) => {
          console.log(error);
          console.log(
            "CORS error. Please visit https://cors-anywhere.herokuapp.com and allow use for your ip adress"
          );
        });
    },
    formatDate(time) {
      const date = new Date(time * 1000); // create Date object
      return date.toLocaleDateString("ru-RU");
    },
  },
  mounted() {
    this.getNews();
  },
};
</script>
<style lang="scss">
.steamAppNews {
  margin-top: 30px;
}
.newsItem {
  margin-top: 15px;
  &__title {
    font-weight: 500;
    text-decoration: none;
    color: black;
    margin-right: 5px;
  }
}
</style>
