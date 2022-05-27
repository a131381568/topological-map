<template>
  <main class="d-flex justify-content-between container-fluid">
    <TopoBoard class="w-75"></TopoBoard>
    <div class="w-25 topo-edit-dashboard">
      <div class="topo-floor-container">
        <button
          class="add-topo-floor h8"
          @click.prevent="handelOpenAddFloorModal"
        >
          新增階層
        </button>
        <!-- 階層區塊 -->
        <ul class="topo-floor-list">
          <li
            v-for="(value, key) in groupByCategory"
            :key="key"
            class="topo-floor-item"
          >
            <div class="topo-floor-header d-flex justify-content-between">
              <!-- 階層標題 -->
              <h6 class="topo-floor-title">{{ key }}</h6>
              <!-- 新增階層 -->
              <button
                class="add-topo-floor h8"
                @click.prevent="
                  addServerAct('服務器', String(key), [], value.length)
                "
              >
                新增服務器
              </button>
            </div>
            <div class="topo-node-container">
              <!-- 節點列表 -->
              <ol class="topo-node-list">
                <li
                  v-for="(nodeItem, nodeKey) in value"
                  :key="nodeKey"
                  class="topo-node-item"
                >
                  <span class="topo-node-title h7">{{ nodeItem.title }}</span>
                  <div class="topo-node-link-container">
                    <div
                      class="topo-node-header d-flex justify-content-between"
                    >
                      <!-- 連線項目 -->
                      <span class="topo-node-title h8">連線項目</span>
                      <!-- 新增連線，需開啟燈箱，點選確定後新增 -->
                      <button
                        class="add-node-link-item h8"
                        @click.prevent="
                          addLinkItem(
                            nodeItem.id,
                            nodeItem.link.length,
                            nodeItem.link
                          )
                        "
                      >
                        新增節點連線
                      </button>
                    </div>
                    <ul class="topo-node-link-list">
                      <li
                        v-for="(linkItem, linkKey) in nodeItem.link"
                        :key="linkKey"
                        class="topo-node-link-item h8"
                      >
                        <div class="dropdown">
                          <button
                            id="add-link-dropdown-btn"
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {{ store.changeNodeName(linkItem) }}
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="add-link-dropdown-btn"
                          >
                            <li>
                              <a
                                v-for="(nodeLink, nodeLinkIndex) in canLinkMenu(
                                  nodeItem.id,
                                  nodeItem.link
                                )"
                                :key="nodeLinkIndex"
                                class="dropdown-item"
                                @click="
                                  editLinkItem(
                                    nodeItem.id,
                                    nodeItem.link.length,
                                    nodeLink
                                  )
                                "
                              >
                                {{ store.changeNodeName(nodeLink) }}</a
                              >
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Add Link Modal -->
    <div
      id="add-link-modal"
      ref="addLinkModalRef"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="add-link-modal-label" class="modal-title">節點連線</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="handelCloseAddLinkModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="dropdown">
              <button
                id="add-link-dropdown-btn"
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{
                  selectLinkNodeId
                    ? store.changeNodeName(selectLinkNodeId)
                    : "請選擇連線節點"
                }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="add-link-dropdown-btn">
                <li>
                  <a
                    v-for="(nodeLink, nodeLinkIndex) in canLinkMenu(
                      actionNodeId,
                      actionSelectedId
                    )"
                    :key="nodeLinkIndex"
                    class="dropdown-item"
                    @click.prevent="useModalLinkId(nodeLink)"
                  >
                    {{ store.changeNodeName(nodeLink) }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="handelCloseAddLinkModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn sub-bg text-white"
              @click.prevent="addLinkItemAct"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Floor Modal -->
    <div
      id="add-floor-modal"
      ref="addFloorModalRef"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="add-link-modal-label" class="modal-title">新增階層</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="handelCloseAddFloorModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span id="inputGroup-sizing-floor-name" class="input-group-text"
                >階層名稱</span
              >
              <input
                v-model="actionAddFloorNameVal"
                type="text"
                class="form-control"
                aria-label="sizing-input-floor-name"
                aria-describedby="inputGroup-sizing-floor-name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="handelCloseAddFloorModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn sub-bg text-white"
              @click.prevent="addFloorItemAct"
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
import { Modal } from "bootstrap";
const route = useRoute();
const store = useStore();
const groupByCategory = computed(() => store.get_groupByCategory);
const groupByCategoryLength = computed(() => {
  console.log(Object.keys(store.get_groupByCategory));
  return Object.keys(store.get_groupByCategory).length;
});

// 新增服務器
const addServerAct = (
  nodeTitle: string,
  floorId: string,
  link: string[],
  itemLength: number
) => {
  if (route.params.tid && itemLength < 8) {
    store.addItemInGroup(String(route.params.tid), nodeTitle, floorId, link);
  }
};

// 切換連線
const editLinkItem = (nodeId: string, nowLinkLength: number, link: string) => {
  if (store.get_singleTopoListLength - 1 > nowLinkLength) {
    store.editLinkInNode(nodeId, link);
  }
};

// ====================== 新增節點連線相關 ======================

const allCanLinktMenu = computed(() => {
  const strMenu = <string[]>[];
  store.get_singleTopoListData.forEach((item) => {
    strMenu.push(item.id);
  });
  return strMenu;
});

const canLinkMenu = (ownNodeId: string, ownlink: string[]) => {
  const allList = JSON.parse(JSON.stringify(allCanLinktMenu.value));
  const excludeList = ownlink.concat([ownNodeId]);
  for (let i = 0; i < excludeList.length; i++) {
    for (let j = 0; j < allList.length; j++) {
      if (allList[Number(j)] === excludeList[Number(i)]) {
        allList.splice(j, 1);
        j = j - 1;
      }
    }
  }
  return allList;
};

const addLinkItem = (nodeId: string, nowLinkLength: number, link: string[]) => {
  if (store.get_singleTopoListLength - 1 > nowLinkLength) {
    handelOpenAddLinkModal(nodeId, link);
  }
};

const addLinkModalRef = ref<HTMLElement | null>(null);
const addLinkGroupModal = ref<Modal | null>(null);
const actionNodeId = ref<string>("");
const actionSelectedId = ref<string[]>([]);
const selectLinkNodeId = ref<string>("");

// 開啟燈箱
const handelOpenAddLinkModal = (nodeId: string, linkList: string[]) => {
  if (addLinkGroupModal.value !== null) {
    actionNodeId.value = nodeId;
    actionSelectedId.value = linkList;
    addLinkGroupModal.value.show();
  }
};

// 關閉燈箱
const handelCloseAddLinkModal = () => {
  if (addLinkGroupModal.value !== null) {
    addLinkGroupModal.value.hide();
    actionNodeId.value = "";
    actionSelectedId.value = [];
    selectLinkNodeId.value = "";
  }
};

// 燈箱狀態，選擇下拉選單中的項目
const useModalLinkId = (nodeId: string) => {
  selectLinkNodeId.value = nodeId;
};

// 按下確定
const addLinkItemAct = () => {
  const linkValCheck =
    selectLinkNodeId.value.replace(/(^s*)|(s*$)/g, "").length === 0;
  if (!linkValCheck) {
    store.addLinkInNode(actionNodeId.value, selectLinkNodeId.value);
    handelCloseAddLinkModal();
  }
};

// ====================== 新增階層相關 ======================
const addFloorModalRef = ref<HTMLElement | null>(null);
const addFloorModal = ref<Modal | null>(null);
const actionAddFloorNameVal = ref<string>("");
const handelOpenAddFloorModal = () => {
  if (
    addFloorModal.value !== null &&
    route.params.tid &&
    groupByCategoryLength.value < 10
  ) {
    addFloorModal.value.show();
  }
};
const handelCloseAddFloorModal = () => {
  if (addFloorModal.value !== null) {
    addFloorModal.value.hide();
    actionAddFloorNameVal.value = "";
  }
};
const addFloorItemAct = () => {
  const floorNameValCheck =
    actionAddFloorNameVal.value.replace(/(^s*)|(s*$)/g, "").length === 0;
  if (!floorNameValCheck) {
    store.addFloorInGroup(
      String(route.params.tid),
      actionAddFloorNameVal.value
    );
    handelCloseAddFloorModal();
  }
};

onMounted(() => {
  // 燈箱初始化
  if (addLinkModalRef.value !== null) {
    addLinkGroupModal.value = new Modal(addLinkModalRef.value);
  }
  if (addFloorModalRef.value !== null) {
    addFloorModal.value = new Modal(addFloorModalRef.value);
  }
});
</script>
