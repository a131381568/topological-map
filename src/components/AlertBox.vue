<template>
  <div
    id="alert-modal"
    ref="alertModalRef"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    style="background-color: rgb(0 0 0 / 50%)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="del-group-modal-label" class="modal-title">提示訊息</h5>
          <button
            type="button"
            class="btn-close"
            @click.prevent="handelCloseAlertModal"
          ></button>
        </div>
        <div class="modal-body">{{ store.get_alertModalMsg }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn sub-bg text-white"
            @click.prevent="handelCloseAlertModal"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Modal } from "bootstrap";
const store = useStore();
const alertModalRef = ref<HTMLElement | null>(null);
const handelCloseAlertModal = () => {
  if (store.alertModal !== null) {
    store.alertModal.hide();
    store.clearAlertModalMsg();
  }
};
onMounted(() => {
  if (alertModalRef.value !== null) {
    store.alertModal = new Modal(alertModalRef.value);
  }
});
</script>
