<template>
  <div>
    <SearchForm />
    <Deals class="centered" />
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
};
</script>
<style lang="scss">
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
