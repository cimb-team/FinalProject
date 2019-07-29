import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login-register",
      component: () => import("./views/LandingPage.vue")
    },
    {
      path: "/products",
      name: "products-view",
      component: () => import("./views/Products.vue"),
      children: []
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: () => import("./views/ProductDetail.vue")
    },
    {
      path: "/myProducts/",
      name: "my-product-detail",
      component: () => import("./views/MyProducts.vue")
    }
  ]
});
