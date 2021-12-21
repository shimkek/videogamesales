<template>
  <Carousel :perPage="1" :autoplay="true" :autoplayTimeout="4000" :loop="true">
    <Slide
      v-for="image in games[index].short_screenshots"
      class=".sliderImgWrap"
      :key="image.id"
    >
      <img :src="image.image" class="sliderImg" />
    </Slide>
  </Carousel>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  props: {
    games: Array,
    index: Number,
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>
<style lang="scss" scoped>
.sliderImgWrap {
  width: 100%;
}
.sliderImg {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
