<template>
  <div class="authContainer">
    <div class="authForm">
      <form @submit.prevent="onSubmit">
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

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Sign Up
        </button>

        <p class="forgot-password text-right">
          Already registered
          <router-link to="/auth/login">sign in?</router-link>
        </p>
      </form>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

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
    onSubmit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "Home" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
