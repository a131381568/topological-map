<template>
  <div class="container-fluid p-0 my-0 mx-auto">
    <TopHeader></TopHeader>
    <router-view class="my-0 mx-auto"></router-view>
    <BottomFooter></BottomFooter>
    <LoadingSpinners></LoadingSpinners>
  </div>
</template>
<script setup lang="ts">
import TopHeader from "./components/TopHeader.vue";
const route = useRoute();
const store = useStore();
useHead({
  bodyAttrs: {
    title: route.meta.title,
  },
  meta: [
    {
      property: "og:title",
      content: route.meta.title,
    },
    {
      name: "twitter:title",
      content: route.meta.title,
    },
  ],
});

// 載入瀏覽器暫存資料
store.initStoreDataByCache();

// 暫存函式
const storeCacheAction = () => {
  store.saveStoreDataInCache();
};

onMounted(() => {
  window.addEventListener("beforeunload", storeCacheAction);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", storeCacheAction);
});
</script>
<style lang="scss">
@import "@assets/scss/main.scss";
</style>
