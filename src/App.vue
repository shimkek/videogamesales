<template>
  <div id="app">
    <header class="header">
      <div class="header__contents">
        <div class="header__brand-symbols">
          <div class="header__logo">
            <img class="header__logo__img" src="./assets/logo128.png" />
          </div>
          <div class="header__text-container">
            <router-link to="/" class="header__text"
              >videogamesales</router-link
            >
          </div>
        </div>

        <div class="navbar navbar_align-right">
          <div v-if="!user.loggedIn" class="header__button">
            <router-link class="header__button__text" to="/auth/signup"
              >Sign Up</router-link
            >
          </div>
          <div v-if="!user.loggedIn" class="header__button">
            <router-link class="header__button__text" to="/auth/login"
              >Log In</router-link
            >
          </div>
          <div v-if="user.loggedIn">
            <router-link class="header__button__text" to="/user/liked"
              >Liked</router-link
            >
          </div>
          <div v-if="user.loggedIn" class="header__button">
            <b-button @click.prevent="signOut" class="header__button__text"
              >Log Out</b-button
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

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  methods: {
    signOut() {
      console.log("Signing out...");
      firebase
        .auth()
        .signOut()
        .then(() => {
          if (this.$route.name !== "Home") {
            this.$router.replace({
              name: "Home",
            });
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

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
  max-width: 990px;
  margin-left: auto;
  margin-right: auto;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 5;
  &__button {
    padding: 5px 15px 5px 15px;
    margin-left: 15px;
    border: 2px solid #75c4b1;
    border-radius: 15px;
    &__text {
      font-size: 1rem;
      font-weight: 500;
      color: black;
    }
  }
  &__contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }
  &__text-container {
    height: inherit;
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
  }

  &__text {
    color: #75c4b1;
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
  }
  &__text:hover {
    color: #599789;
  }
  &__logo {
    max-height: 60px;
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
}
@media only screen and (max-width: 768px) {
}
@media only screen and (min-width: 1024px) {
  .header__contents {
    width: 990px;
  }
}
</style>
