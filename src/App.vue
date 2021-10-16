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
            <router-link to="/" class="header__text">GameDeal$</router-link>
          </div>
        </div>

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
@import "./styles/variables.scss";
@import "./styles/normalize.scss";

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
    border: 2px solid #492a91;
    border-radius: 15px;
    font-size: 1rem;
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
  background-color: #262837;
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

@media only screen and (max-width: 375px) {
}
@media only screen and (max-width: 768px) {
}
@media only screen and (min-width: 1024px) {
  .header__contents {
    // width: 740px;
  }
}
</style>
