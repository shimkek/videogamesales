<template>
  <div class="authContainer">
    <div class="authForm">
      <form>
        <h3>Sign Up</h3>

        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control form-control-lg" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Sign Up
        </button>

        <p class="forgot-password text-right">
          Already registered
          <router-link to="/auth/login">sign in?</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
