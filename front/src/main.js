import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(Quasar, {
    plugins: ["Notify"],
  })
  .mount("#app");
