<template>
  <div id="app">
    <header class="header">
      <div class="header__contents">
        <div class="header__logo">
          <img class="header__logo__img" src="./assets/logo.png" />
        </div>
        <div class="header__text-container">
          <router-link to="/" class="header__text">videogamesales</router-link>
        </div>
      </div>
    </header>

    <div class="body">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
@import "./styles/normalize.scss";
html {
  overflow-y: scroll;
}
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  &__contents {
    display: flex;
  }
  &__text-container {
    height: inherit;
    padding: 0 10px 0 10px;
    max-width: 80%;
    display: flex;
    align-items: center;
  }

  &__text {
    color: rgb(255, 70, 85);
    font-size: 2rem;
    font-weight: 700;
    font-family: "  Courier New", Courier, monospace;
    text-decoration: none;
  }
  &__text:hover {
    color: rgb(207, 58, 71);
  }
  &__logo {
    max-height: 60px;
    max-width: 20%;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__img {
      object-fit: contain;
      height: 80%;
    }
  }
}
.header a:hover {
  text-decoration: none;
}
.body {
  margin: auto;
  margin-top: 40px;
  padding-bottom: 200px;
}
@media only screen and (max-width: 375px) {
  .header__text {
    font-size: 1.5rem;
  }
}
@media only screen and (max-width: 768px) {
  .body {
    margin-top: 3%;
  }
}
</style>
