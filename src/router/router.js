import AuthorizeBtn from "../components/AuthorizeBtn.vue";
import HomeAccount from "../components/HomeAccount.vue";

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


export default routes;


