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
      <div class="navbar">
        <div class="nav-item">
          <router-link class="nav-link pr-3" to="/auth/login"
            >Sign In</router-link
          >
        </div>
        <div class="nav-item">
          <router-link class="btn btn-outline-primary" to="/auth/signup"
            >Sign Up</router-link
          >
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
  min-width: 100vh;
}
body {
  min-width: 100vh;
}
.header {
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 0.1rem 1rem rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  &__contents {
    display: flex;
    align-items: center;
    background-color: white;
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
}
.authForm {
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  padding: 20px 40px 50px 40px;
  border-radius: 20px;
  height: fit-content;
}
.authContainer {
  display: flex;
  font-weight: 400;
  width: 100%;
  height: 90vh;
  background-image: url("https://wallpaperaccess.com/full/2488356.jpg");
  background-clip: content-box;
}

label {
  font-weight: 500;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
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
