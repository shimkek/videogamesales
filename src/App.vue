<template>
  <div id="app">
    <header class="header">
      <div class="header__contents container">
        <router-link to="/">
          <div class="header__brand-symbols">
            <div class="header__logo">
              <img
                class="header__logo__img"
                src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/alien-monster_1f47e.png"
              />
            </div>
            <div class="header__text-container header__text">GameDeal$</div>
          </div>
        </router-link>

        <div class="d-flex align-items-center">
          <template v-if="user.loggedIn">
            <router-link class="header__liked" to="/user/liked">
              <span class="header__liked-heart">♥</span>
              <p class="header__liked-text">Liked</p>
            </router-link>
            <button @click.prevent="signOut" class="header__button">
              Log Out
            </button>
          </template>

          <template v-else>
            <router-link class="header__button" to="/auth/signup">
              Sign Up
            </router-link>
            <router-link class="header__button" to="/auth/login">
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
import firebase from "firebase/app";
import "firebase/auth";
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
      window.location.reload();
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
@import "./styles/variables.scss";
@import "./styles/normalize.scss";
html::-webkit-scrollbar {
  width: 15px;
}
html::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 3px solid transparent;
  background-clip: content-box;
  background-color: #8070d4;
}
html::-webkit-scrollbar-track {
  background-color: #3c334b;
}

html {
  overflow-y: scroll;
}
html,
body,
#app {
  height: 100%;
  background-color: $bg-color;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 5;

  &__button {
    padding: 5px 15px 5px 15px;
    margin-left: 15px;
    border: 2px solid $dark-purple;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    background-color: transparent;
    color: #dadada;
  }
  &__button:hover {
    color: gray;
  }

  &__contents {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  &__text {
    display: none;
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

  &__liked {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    justify-items: center;
    color: rgb(199, 0, 93);
    &-text {
      padding-left: 5px;
      margin: 0 10px 0 0;
      font-weight: 500;
    }
    &-heart {
      font-size: 24px;
    }
  }
  &__liked:hover {
    color: rgb(160, 2, 76);
  }
}
.header a:hover {
  text-decoration: none;
}
.authForm {
  color: #ffffff;
  background-color: $secondary-color;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  padding: 20px 40px 40px 40px;
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

.searchButton,
.authButton {
  display: inline-block;
  width: 100%;
  color: #fff;
  background-color: #343a40;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  transition: none;
  font-weight: 500;
  margin-bottom: 0.25rem;
  line-height: inherit;
}
.searchButton:hover,
.authButton:hover {
  color: #fff;
  background-color: #23272b;
  border-color: #1d2124;
}
.authButton {
  margin-top: 15px;
  padding: 0.7rem 0.375rem 0.7rem 0.375rem;
  font-size: 1.2rem;
}
.alert {
  margin-top: 15px;
  max-width: 270px;
}
@media only screen and (min-width: 320px) {
  .header__button {
    font-size: 1rem;
  }
}
@media (min-width: 446px) {
  .header__text {
    display: block;
  }
}
</style>
