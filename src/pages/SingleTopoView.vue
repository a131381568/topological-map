<template>
  <main class="container">
    <TopoBoard></TopoBoard>
  </main>
</template>
<script setup lang="ts">
const route = useRoute();
const store = useStore();
// 按 groupId 取得初始化資料
store.getNodeListDataInGroup(String(route.params.tid));
store.getFloorListDataInGroup(String(route.params.tid));
</script>
