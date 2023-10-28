import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import { Quasar } from "quasar";
import { Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(Quasar, {
    plugins: { Notify },
  })
  .mount("#app");
