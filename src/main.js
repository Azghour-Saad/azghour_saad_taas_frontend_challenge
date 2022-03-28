import { createApp } from "vue"
import App from "./App.vue"
import router from './router/router'
import "./assets/css/tailwind.css"
import moment from "moment"
import VueObserveVisibility from "vue3-observe-visibility";

createApp(App).use(router).use(moment).use(VueObserveVisibility).mount("#app");

