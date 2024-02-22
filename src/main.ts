import "./assets/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaSun, BiInfoCircleFill, MdLocationcity } from "oh-vue-icons/icons";

addIcons(FaSun, BiInfoCircleFill, MdLocationcity);

const app = createApp(App);
app.use(router);

app.component("v-icon", OhVueIcon);
app.mount("#app");
