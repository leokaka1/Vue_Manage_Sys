import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Register from "../views/Register.vue";
import Notfound from "../views/404.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

const Article = () =>
  import(/* webpackChunkName: "group-foo" */ "../views/ArticleList.vue");
const Financial = () =>
  import(/* webpackChunkName: "group-foo" */ "../views/FinancialList.vue");
const AuthRight = () =>
  import(
    /* webpackChunkName: "group-foo" */ "../views/AuthRightPage/AuthRight.vue"
  );

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    component: Index,
    children: [
      {
        path: "",
        component: Home
      },
      {
        path: "/articleList",
        component: Article
      },
      {
        path: "/financialList",
        component: Financial
      },
      {
        path: "/authRight",
        component: AuthRight
      }
    ]
  },

  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "*",
    name: "/404",
    component: Notfound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    token ? next() : next("/login");
  }
});

export default router;
