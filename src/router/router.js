import AuthorizeBtn from "../components/AuthorizeBtn.vue";
import HomeAccount from "../components/HomeAccount.vue";
import {  createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "auth",
    component: AuthorizeBtn,
  },
  {
    path: "/home",
    name: "home",
    component: HomeAccount,
  },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;


