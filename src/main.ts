import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";

const head = createHead();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(head);
// app.use(PerfectScrollbar);
app.use(PerfectScrollbar, {
  options: { wheelPropagation: false, swipeEasing: true },
});

app.mount("#app");
