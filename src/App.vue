<template>
  <div class="container-fluid p-0 my-0 mx-auto">
    <TopHeader></TopHeader>
    <router-view class="my-0 mx-auto"></router-view>
    <BottomFooter></BottomFooter>
    <LoadingSpinners></LoadingSpinners>
    <AlertBox></AlertBox>
  </div>
</template>
<script setup lang="ts">
import TopHeader from "./components/TopHeader.vue";
import AlertBox from "./components/AlertBox.vue";
const route = useRoute();
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
</script>
<style lang="scss">
@import "@assets/scss/main.scss";
</style>
