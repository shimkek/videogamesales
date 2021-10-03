<template>
  <div class="authContainer">
    <div class="authForm">
      <form>
        <h3>Sign In</h3>

        <div class="form-group">
          <label class="label_bold">Email address</label>
          <input type="email" class="form-control form-control-lg" />
        </div>

        <div class="form-group">
          <label class="label_bold">Password</label>
          <input type="password" class="form-control form-control-lg" />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Sign In
        </button>

        <p class="forgot-password text-right">
          <router-link to="/auth/forgotpassword">Forgot password ?</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
