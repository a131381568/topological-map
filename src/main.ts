import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);

app.mount("#app");
