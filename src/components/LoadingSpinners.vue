<template>
  <transition name="fade">
    <div v-show="store.get_loadingModal" class="lds-modal">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
const store = useStore();
</script>
