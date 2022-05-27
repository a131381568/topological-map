<template>
  <main class="d-flex justify-content-between container-fluid">
    <TopoBoard class="w-75"></TopoBoard>
    <div
      class="w-25 topo-edit-dashboard"
      :style="[
        { height: groupByCategoryLength * 180 + 'px' },
        { 'overflow-y': 'scroll' },
      ]"
    >
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
              <h6 class="topo-floor-title">
                {{ store.changeFloorName(String(key)) }}
              </h6>
              <!-- 新增階層 -->
              <button
                class="add-topo-floor h8"
                @click.prevent="
                  handelOpenAddNodeModal(String(key), value.length)
                "
              >
                新增節點
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
                  <span class="topo-node-title h7">{{ nodeItem.title }}</span
                  ><button
                    class="h8"
                    @click.prevent="removeItemInGroupBtn(nodeItem.id)"
                  >
                    x
                  </button>
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
                        新增連線
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
                            class="btn btn-secondary dropdown-toggle h8"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {{ store.changeNodeName(linkItem) }}
                          </button>
                          <button
                            @click.prevent="
                              deleteLinkItemBtn(nodeItem.id, linkItem)
                            "
                          >
                            X
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
                                class="dropdown-item h8"
                                @click="
                                  editLinkItem(
                                    nodeItem.id,
                                    nodeItem.link.length,
                                    nodeLink,
                                    linkItem
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
            <div class="input-group mb-3">
              <span
                id="inputGroup-sizing-floor-node-name"
                class="input-group-text"
                >節點名稱</span
              >
              <input
                v-model="actionAddFloorAfterNodeNameVal"
                type="text"
                class="form-control"
                aria-label="sizing-input-floor-node-name"
                aria-describedby="inputGroup-sizing-floor-node-name"
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
    <!-- Add Node Modal -->
    <div
      id="add-node-modal"
      ref="addNodeModalRef"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="add-node-modal-label" class="modal-title">新增節點</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="handelCloseAddNodeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <span id="inputGroup-sizing-floor-name" class="input-group-text"
                >節點名稱</span
              >
              <input
                v-model="actionAddNodeNameVal"
                type="text"
                class="form-control"
                aria-label="sizing-input-node-name"
                aria-describedby="inputGroup-sizing-node-name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="handelCloseAddNodeModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn sub-bg text-white"
              @click.prevent="addNodeItemAct"
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

// 將列表資料依據階層分群
const groupByCategory = computed(() => store.get_groupByCategory);
const groupByCategoryLength = computed(() => {
  console.log(Object.keys(store.get_groupByCategory));
  return Object.keys(store.get_groupByCategory).length;
});

// 切換連線
const editLinkItem = (
  nodeId: string,
  nowLinkLength: number,
  link: string,
  oriLink: string
) => {
  if (store.get_singleTopoListLength - 1 > nowLinkLength) {
    store.editLinkInNode(nodeId, link, oriLink);
  }
};

// 刪除連線
const deleteLinkItemBtn = (nodeId: string, oriLink: string) => {
  // 應該要跳一個確定刪除?
  store.deleteLinkInNode(nodeId, oriLink);
};

// 刪除節點
const removeItemInGroupBtn = (nodeId: string) => {
  // 應該要跳一個確定刪除?
  store.removeItemInGroup(nodeId);
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
const handelOpenAddLinkModal = (nodeId: string, linkList: string[]) => {
  if (addLinkGroupModal.value !== null) {
    actionNodeId.value = nodeId;
    actionSelectedId.value = linkList;
    addLinkGroupModal.value.show();
  }
};
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
const actionAddFloorAfterNodeNameVal = ref<string>("");
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
    actionAddFloorAfterNodeNameVal.value = "";
  }
};
const addFloorItemAct = () => {
  const floorNameValCheck =
    actionAddFloorNameVal.value.replace(/(^s*)|(s*$)/g, "").length === 0;
  const nodeNameValCheck =
    actionAddFloorAfterNodeNameVal.value.replace(/(^s*)|(s*$)/g, "").length ===
    0;
  if (!floorNameValCheck && !nodeNameValCheck) {
    store.addFloorInGroup(
      String(route.params.tid),
      actionAddFloorNameVal.value,
      actionAddFloorAfterNodeNameVal.value
    );
    handelCloseAddFloorModal();
  }
};

// ====================== 新增節點相關 ======================
const addNodeModalRef = ref<HTMLElement | null>(null);
const addNodeModal = ref<Modal | null>(null);
const actionAddNodeNameVal = ref<string>("");
const actionAddNodeInFloorId = ref<string>("");
const handelOpenAddNodeModal = (floorId: string, nodeListLength: number) => {
  if (addNodeModal.value !== null && route.params.tid && nodeListLength < 8) {
    actionAddNodeInFloorId.value = floorId;
    addNodeModal.value.show();
  }
};
const handelCloseAddNodeModal = () => {
  if (addNodeModal.value !== null) {
    addNodeModal.value.hide();
    actionAddNodeNameVal.value = "";
    actionAddNodeInFloorId.value = "";
  }
};
const addNodeItemAct = () => {
  const nodeNameValCheck =
    actionAddNodeNameVal.value.replace(/(^s*)|(s*$)/g, "").length === 0;
  if (!nodeNameValCheck) {
    store.addItemInGroup(
      String(route.params.tid),
      actionAddNodeNameVal.value,
      actionAddNodeInFloorId.value,
      []
    );
    handelCloseAddNodeModal();
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
  if (addNodeModalRef.value !== null) {
    addNodeModal.value = new Modal(addNodeModalRef.value);
  }
});
</script>
