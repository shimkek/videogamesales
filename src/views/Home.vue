<template>
  <div>
    <SearchForm />
    <Deals :dealsLink="dealsLink" />
  </div>
</template>

<script>
import Deals from "../components/Deals.vue";
import SearchForm from "../components/SearchForm.vue";
export default {
  name: "Home",
  components: {
    Deals,
    SearchForm,
  },
  data() {
    return {
      dealsLink: "https://www.cheapshark.com/api/1.0/deals?",
    };
  },
};
</script>
