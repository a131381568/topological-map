import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/Index.vue";
import List from "@/pages/List.vue";
import SingleTopoEdit from "@/pages/SingleTopoEdit.vue";
import SingleTopoView from "@/pages/SingleTopoView.vue";
import Group from "@/pages/Group.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
    meta: {
      title: "Topological Map",
    },
  },
  {
    path: "/list",
    name: "List",
    component: List,
    meta: {
      title: "AP List",
    },
  },
  {
    path: "/topo-edit/:tid",
    name: "SingleTopoEdit",
    component: SingleTopoEdit,
    meta: {
      title: "Topological Map Edit",
    },
  },
  {
    path: "/topo-view/:tid",
    name: "SingleTopoView",
    component: SingleTopoView,
    meta: {
      title: "Topological Map",
    },
  },
  {
    path: "/group",
    name: "Group",
    component: Group,
    meta: {
      title: "Group",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
