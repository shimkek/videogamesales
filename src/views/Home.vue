<template>
  <div>
    <Deals :dealsLink="dealsLink" />
  </div>
</template>

<script>
import Deals from "../components/Deals.vue";
export default {
  name: "Home",
  components: {
    Deals,
  },
  data() {
    return {
      dealsLink: "https://www.cheapshark.com/api/1.0/deals?",
    };
  },
};
</script>
