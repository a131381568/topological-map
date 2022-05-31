import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/Index.vue";
import List from "@/pages/List.vue";
import SingleTopoEdit from "@/pages/SingleTopoEdit.vue";
import SingleTopoView from "@/pages/SingleTopoView.vue";
import Group from "@/pages/Group.vue";
import About from "@/pages/About.vue";

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
    path: "/home",
    redirect: "/",
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
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  // 載入瀏覽器暫存資料
  store.initStoreDataByCache();
  next();
});

export default router;
