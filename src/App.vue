<template>
  <div id="app">
    <header class="header">
      <div class="header__contents">
        <div class="header__brand-symbols">
          <div class="header__logo">
            <img class="header__logo__img" src="./assets/logo.png" />
          </div>
          <div class="header__text-container">
            <router-link to="/" class="header__text"
              >videogamesales</router-link
            >
          </div>
        </div>
        <div class="navbar navbar_align-right">
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
      </div>
    </header>

    <div class="body-contents">
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
@import "./styles/normalize.scss";
html {
  overflow-y: scroll;
}
html,
body,
#app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
.header__brand-symbols {
  display: flex;
}
.body-contents {
  height: 100%;
}
.header {
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 5;
  &__contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 980px;
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
.authForm {
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  padding: 20px 40px 50px 40px;
  border-radius: 20px;
  height: fit-content;
}
.authContainer {
  display: flex;
  font-weight: 400;
  width: 100%;
  background: url(../public/auth-background.png) no-repeat center center fixed;
  height: 100%;
}

.label_bold {
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
  .page-container {
    margin-top: 20px !important;
  }
}
@media only screen and (max-width: 1024px) {
  .header__contents {
    width: 740px;
  }
}
</style>
