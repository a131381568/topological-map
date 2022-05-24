import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/Index.vue";
import List from "@/pages/List.vue";
import SingleTopo from "@/pages/SingleTopo.vue";

const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      title: "Topological Map",
    },
  },
  {
    path: "/list",
    component: List,
    meta: {
      title: "AP List",
    },
  },
  {
    path: "/topo-edit/:tid",
    component: SingleTopo,
    meta: {
      title: "Topological Map Edit",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
