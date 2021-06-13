<template>
  <div id="app">
    <header class="header">
      <img
        class="header__logo"
        src="./assets/1200px-Video-Game-Controller-Icon.png"
      />
      <router-link to="/" class="header__text">videogamesales</router-link>
    </header>

    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss">
@import "./styles/normalize.scss";
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;

  &__text {
    height: inherit;
    margin: 0 0 0 10px;
    color: rgb(255, 70, 85);
    font-size: 3rem;
    font-weight: 700;
    font-family: "  Courier New", Courier, monospace;
    text-decoration: none;
  }
  &__text:hover {
    color: rgb(255, 70, 85);
  }
  &__logo {
    margin-top: 5px;
    max-height: 50px;
    max-width: 50px;
  }
}
.header a:hover {
  text-decoration: none;
}
.body {
  margin: auto;
  margin-top: 40px;
  padding-bottom: 100px;
}
</style>
