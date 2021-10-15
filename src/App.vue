<template>
  <div id="app">
    <header class="header">
      <div class="header__contents container">
        <div class="header__brand-symbols">
          <div class="header__logo">
            <img
              class="header__logo__img"
              src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/alien-monster_1f47e.png"
            />
          </div>
          <div class="header__text-container">
            <router-link to="/" class="header__text">Gamdilz</router-link>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <template v-if="user.loggedIn">
            <router-link class="d-inline-block mr-3" to="/user">
              My page
            </router-link>
            <b-button @click.prevent="signOut">Log Out</b-button>
          </template>

          <template v-else>
            <router-link class="d-inline-block mr-3" to="/auth/signup">
              Sign Up
            </router-link>
            <router-link class="btn btn-outline-primary" to="/auth/login">
              Log In
            </router-link>
          </template>
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
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

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
  align-items: center;
}
.body-contents {
  height: 100%;
}
.header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 5;

  &__contents {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 6px 0px;
  }

  &__text {
    font-family: "Permanent Marker", cursive;
    color: #8b5cf6 !important;
    font-size: 30px;
    font-weight: 700;
    text-decoration: none;
  }

  &__logo {
    margin-right: 10px;

    &__img {
      width: 32px;
      transform: rotate(-10deg);
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
    // width: 740px;
  }
}
</style>
