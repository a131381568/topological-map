<template>
  <main class="container">
    <NothingBlock
      v-show="listData.length === 0"
      title="尚無資料"
      content="無法產生節點列表，請至群組頁面新增群組，並進入編輯模式新增節點。"
      btn-title="前往群組列表"
      btn-link="/group"
    ></NothingBlock>
    <table v-show="listData.length > 0" class="table ap-list-table rwd-table">
      <thead>
        <tr>
          <th scope="col">代號</th>
          <th scope="col">名稱</th>
          <th scope="col">群組</th>
          <th scope="col">新增時間</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody class="border-0">
        <tr
          v-for="(value, key) in listData"
          v-show="key < actionPagi * 8"
          :key="key"
        >
          <td data-label="節點代號:">{{ value.id }}</td>
          <td data-label="節點名稱:">{{ value.title }}</td>
          <td data-label="隸屬群組:">
            {{ store.changeGroupName(value.groupId) }}
          </td>
          <td data-label="新增時間:">{{ store.changeDate(value.time) }}</td>
          <td data-label="編輯節點:">
            <router-link :to="'/topo-edit/' + value.groupId">
              <svg
                class="svg-icon-outer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <g id="pen">
                  <path
                    class="svg-icon"
                    d="M46.66,1.33a4.53,4.53,0,0,0-6.41,0l-2,2c-1.59-.5-2.33.67-4,2.32l-1-1a3.42,3.42,0,0,0-4.74,0L16.94,16.31A1,1,0,0,0,17.65,18c.59,0-.09.5,10-9.58l1.92,1.92C2.1,37.82,3.5,36.34,3.38,36.69-.25,47.61-.29,47.11.3,47.71a1,1,0,0,0,1,.24c10.78-3.61,10.09-3.33,10.34-3.56.88-.82,12.39-12.38,32.5-32.49a2.16,2.16,0,0,0,.52-2.19l2-2A4.53,4.53,0,0,0,46.66,1.33ZM30,6.07a1.4,1.4,0,0,1,1.92,0l7.62,7.62-1.92,1.92L29.05,7Zm6.21,11L21,32.26,15.73,27,31,11.77ZM11,42.25,5.74,37l8.58-8.58,5.25,5.25Zm-6.22-3.4,4.37,4.37-6.55,2.2Zm38-28.37L41,12.28,35.71,7c1.83-1.82,1.87-2,2-1.79C43.13,10.61,42.93,10.3,42.75,10.48Zm2.5-4.16L43.46,8.11c-2.2-2.19-1.38-1.38-3.58-3.58l1.79-1.79a2.53,2.53,0,0,1,3.58,3.58Z"
                  />
                </g>
              </svg>
            </router-link>
          </td>
          <td data-label="刪除節點:">
            <svg
              class="svg-icon-outer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              @click.prevent="handelOpenDelModal(value.id)"
            >
              <g id="trash">
                <path
                  class="svg-icon"
                  d="M22.5,2H2.5a.5.5,0,0,0,0,1H3l2.4,19.61A1.59,1.59,0,0,0,7,24H17.9a1.61,1.61,0,0,0,1.61-1.39L21.91,3h.59a.5.5,0,0,0,0-1ZM19.35,15.68l-.67-.88.92-1.22Zm-.74,6L16,18.29l2-2.66,1.09,1.43,0,0Zm-12.28,0-.56-4.6,0,0,1.12-1.47,2,2.66ZM4.22,4.44,6.11,6.93,4.75,8.79ZM8.44,3l.28.37-2,2.72L4.38,3Zm6.77,0,0,0L12.47,6.65,10,3.36,10.23,3Zm5.35,0L18.35,5.91l-1.9-2.84L16.5,3Zm-.72,8.65a.46.46,0,0,0-.07.07L18.05,14l-2.29-3,2.53-3.32L20,10.23Zm-4.71-1.51-2-2.67,2.71-3.56L17.7,6.76Zm-10,1.43-.16-1.33L6.75,7.76,9.19,11l-2.27,3-1.74-2.3ZM7.36,6.92l2-2.72,2.49,3.27-2,2.67ZM12.47,8.3l2,2.66-2,2.67-2-2.67ZM5.33,13.49l1,1.27-.69.92Zm2.22,1.27,2.26-3,2,2.66-2.26,3Zm4.92.52,2.3,3-2.26,3-2.3-3Zm.63-.83,2-2.66,2.29,3-2,2.67Zm7.1-5.74L18.93,6.8l1.79-2.36ZM6.68,22.88l2.9-3.81,2.3,3-.69.91H7A.65.65,0,0,1,6.68,22.88Zm5.83,0,.06.08h-.13Zm1.32.08-.69-.91,2.26-3,2.86,3.76a.62.62,0,0,1-.36.12Z"
                />
              </g>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-show="actionPagi < Math.ceil(listData.length / 8)"
      class="load-more-outer"
    >
      <button
        type="button"
        class="btn load-more-btn h8"
        @click.prevent="loadMoreData"
      >
        載入更多
      </button>
    </div>
    <!-- Delete Node Modal -->
    <div
      id="del-node-modal"
      ref="delNodeModalRef"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="del-node-modal-label" class="modal-title">刪除節點</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="handelCloseDelNodeModal"
            ></button>
          </div>
          <div class="modal-body">確定刪除節點?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="handelCloseDelNodeModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn sub-bg text-white"
              @click.prevent="delNodeAct"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { listDataType } from "@/type/types";
import { Modal } from "bootstrap";
// import { topoList } from "@/api/topological";
// const route = useRoute();
const store = useStore();
// 節點資料排序
const listData = computed<listDataType>(() => {
  const topoList = store.totalTopoListData;
  topoList.sort((a, b) => {
    return b.time - a.time;
  });
  return topoList;
});
// 活動頁數初始化
const actionPagi = ref<number>(0);
if (listData.value.length > 0) {
  actionPagi.value = 1;
}
const loadMoreData = () => {
  actionPagi.value = actionPagi.value + 1;
};

// 刪除群組燈箱設定
const delNodeModalRef = ref<HTMLElement | null>(null);
let delNodeModal = ref<Modal | null>(null);
const actionDelNodeId = ref<string>("");
const delNodeAct = () => {
  store.delItemToTotalList(actionDelNodeId.value);
  handelCloseDelNodeModal();
};
const handelOpenDelModal = (nodeId: string) => {
  if (delNodeModal.value !== null) {
    actionDelNodeId.value = nodeId;
    delNodeModal.value.show();
  }
};
const handelCloseDelNodeModal = () => {
  if (delNodeModal.value !== null) {
    delNodeModal.value.hide();
    actionDelNodeId.value = "";
  }
};

onMounted(() => {
  if (delNodeModalRef.value !== null) {
    delNodeModal.value = new Modal(delNodeModalRef.value);
  }
});
// const getApList = async () => {
//   let res = await topoList();
//   listData.value = res.data.data;
// };
</script>
