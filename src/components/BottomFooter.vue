<template>
  <footer class="text-center py-3 sub-bg text-white border-top">
    <p class="mb-0 h8">Topological Map &copy; {{ thisYear }}</p>
  </footer>
</template>
<script setup lang="ts">
const thisYear = new Date().getFullYear();
</script>
