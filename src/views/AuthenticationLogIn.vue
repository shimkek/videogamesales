<template>
  <div class="authContainer">
    <div class="authForm">
      <form @submit.prevent="logIn">
        <h3>Sign In</h3>

        <div class="form-group">
          <label class="label_bold">Email address</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label class="label_bold">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control form-control-lg"
          />
        </div>

        <button type="submit" class="authButton">Sign In</button>
      </form>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.push({ name: "LikedDeals" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
