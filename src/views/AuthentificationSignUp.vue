<template>
  <div class="authContainer">
    <div class="authForm">
      <form @submit.prevent="register">
        <h3>Sign Up</h3>
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

        <button type="submit" class="authButton">Sign Up</button>

        <p class="text-right">
          Already registered
          <router-link to="/auth/login">sign in?</router-link>
        </p>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

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
    async register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          const uid = firebase.auth().currentUser.uid;
          db.ref("users/" + uid).set({
            email: firebase.auth().currentUser.email,
          });
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err.message);
          this.error = err.message;
        });
    },
  },
};
</script>
