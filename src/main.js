import { createApp } from "vue"
import App from "./App.vue"
import router from './router/router'
import "./assets/css/tailwind.css"
import moment from "moment"

createApp(App).use(router).use(moment).mount("#app")

