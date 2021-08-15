import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/deal/:dealID",
    name: "DealInfo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dealInfo" */ "../views/DealInfo.vue"),
  },
  {
    path: "/auth/login",
    name: "AuthenticationLogIn",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "AuthenticationLogIn" */ "../views/AuthenticationLogIn.vue"
      ),
  },
  {
    path: "/auth/signup",
    name: "AuthenticationSignUp",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "AuthenticationSignUp" */ "../views/AuthentificationSignUp.vue"
      ),
  },
  {
    path: "/auth/forgotpassword",
    name: "AuthenticationForgotPassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "AuthenticationForgotPassword" */ "../views/AuthentificationForgotPassword.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
