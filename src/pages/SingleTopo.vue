<template>
  <main class="container">
    <TopoBoard></TopoBoard>
    <div class="topo-edit-dashboard">
      <div class="topo-floor-container">
        <div class="topo-edit-dashboard-title h8">
          <svg
            :class="[
              { 'dashboard-show': toggleDashboardState.height === 'auto' },
              { 'dashboard-hide': toggleDashboardState.height === 0 },
            ]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#fff"
            @click.prevent="toggleDashboardAction"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
          <span>Topology map editer</span>
          <button
            class="btn save-btn"
            @click.prevent="
              store.saveSingleEditToTotalData(String(route.params.tid))
            "
          >
            儲存修改
          </button>
        </div>
        <!-- 階層區塊 -->
        <perfect-scrollbar :style="toggleDashboardState">
          <ul class="topo-floor-list list-group" :style="{ height: '80vh' }">
            <button
              :class="[
                'add-topo-floor',
                'btn',
                'h8',
                { 'dashboard-hide': toggleDashboardState.height === 0 },
              ]"
              @click.prevent="handelOpenAddFloorModal"
            >
              新增階層
            </button>

            <li
              v-for="(value, key) in groupByCategory"
              :key="key"
              class="topo-floor-item list-group-item accordion-item"
            >
              <div class="topo-floor-header d-flex justify-content-between">
                <!-- 階層標題 -->
                <h6 class="topo-floor-title">
                  {{ store.changeFloorName(String(key)) }}
                </h6>
              </div>
              <div class="topo-node-container">
                <!-- 節點列表 -->
                <ol
                  :id="'accordion-flush-' + key"
                  class="topo-node-list accordion accordion-flush"
                >
                  <li
                    v-for="(nodeItem, nodeKey) in value"
                    :key="nodeKey"
                    class="topo-node-item"
                  >
                    <div
                      class="topo-node-header d-flex justify-content-left align-items-center"
                    >
                      <!-- 刪除 node -->
                      <div
                        class="del-node-btn-outer d-flex justify-content-center align-items-center"
                      >
                        <button
                          class="btn-close btn"
                          @click.prevent="removeItemInGroupBtn(nodeItem.id)"
                        ></button>
                      </div>
                      <!-- 手風琴標題 -->
                      <span
                        :id="'flush-heading-' + nodeKey + '-' + key"
                        class="topo-node-title h7 accordion-header"
                      >
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="
                            '#flush-collapse-' + nodeKey + '-' + key
                          "
                          aria-expanded="false"
                          :aria-controls="
                            'flush-collapse-' + nodeKey + '-' + key
                          "
                        >
                          {{ nodeItem.title }}
                        </button>
                      </span>
                    </div>
                    <div
                      :id="'flush-collapse-' + nodeKey + '-' + key"
                      class="topo-node-link-container accordion-collapse collapse"
                      :aria-labelledby="'flush-heading-' + nodeKey + '-' + key"
                      :data-bs-parent="'accordion-flush-' + key"
                    >
                      <!-- 連線項目 -->
                      <!-- <div class="topo-node-link-header">
                        <span class="topo-node-link-title h8">連線項目</span>
                      </div> -->
                      <ul class="topo-node-link-list">
                        <li
                          v-for="(linkItem, linkKey) in nodeItem.link"
                          :key="linkKey"
                          class="topo-node-link-item h8"
                        >
                          <div class="dropdown">
                            <button
                              id="add-link-dropdown-btn"
                              class="btn dropdown-toggle h8"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {{ store.changeNodeName(linkItem) }}
                            </button>
                            <button
                              class="btn delete-link-trash"
                              @click.prevent="
                                deleteLinkItemBtn(nodeItem.id, linkItem)
                              "
                            >
                              <svg
                                class="svg-icon-outer"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 25 25"
                              >
                                <g id="trash">
                                  <path
                                    class="svg-icon"
                                    d="M22.5,2H2.5a.5.5,0,0,0,0,1H3l2.4,19.61A1.59,1.59,0,0,0,7,24H17.9a1.61,1.61,0,0,0,1.61-1.39L21.91,3h.59a.5.5,0,0,0,0-1ZM19.35,15.68l-.67-.88.92-1.22Zm-.74,6L16,18.29l2-2.66,1.09,1.43,0,0Zm-12.28,0-.56-4.6,0,0,1.12-1.47,2,2.66ZM4.22,4.44,6.11,6.93,4.75,8.79ZM8.44,3l.28.37-2,2.72L4.38,3Zm6.77,0,0,0L12.47,6.65,10,3.36,10.23,3Zm5.35,0L18.35,5.91l-1.9-2.84L16.5,3Zm-.72,8.65a.46.46,0,0,0-.07.07L18.05,14l-2.29-3,2.53-3.32L20,10.23Zm-4.71-1.51-2-2.67,2.71-3.56L17.7,6.76Zm-10,1.43-.16-1.33L6.75,7.76,9.19,11l-2.27,3-1.74-2.3ZM7.36,6.92l2-2.72,2.49,3.27-2,2.67ZM12.47,8.3l2,2.66-2,2.67-2-2.67ZM5.33,13.49l1,1.27-.69.92Zm2.22,1.27,2.26-3,2,2.66-2.26,3Zm4.92.52,2.3,3-2.26,3-2.3-3Zm.63-.83,2-2.66,2.29,3-2,2.67Zm7.1-5.74L18.93,6.8l1.79-2.36ZM6.68,22.88l2.9-3.81,2.3,3-.69.91H7A.65.65,0,0,1,6.68,22.88Zm5.83,0,.06.08h-.13Zm1.32.08-.69-.91,2.26-3,2.86,3.76a.62.62,0,0,1-.36.12Z"
                                  />
                                </g>
                              </svg>
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="add-link-dropdown-btn"
                            >
                              <li>
                                <a
                                  v-for="(
                                    nodeLink, nodeLinkIndex
                                  ) in canLinkMenu(nodeItem.id, nodeItem.link)"
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
                      <!-- 新增連線，需開啟燈箱，點選確定後新增 -->
                      <button
                        class="add-node-link-item h8 btn"
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
                  </li>
                </ol>
              </div>
              <div class="topo-floor-footer">
                <button
                  class="add-topo-node-del-btn btn h8"
                  @click.prevent="store.removeFloorInGroup(String(key))"
                >
                  刪除階層
                </button>
                <button
                  class="add-topo-node btn h8"
                  @click.prevent="
                    handelOpenAddNodeModal(String(key), value.length)
                  "
                >
                  新增節點
                </button>
              </div>
            </li>
          </ul>
        </perfect-scrollbar>
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
                class="btn dropdown-toggle"
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
              class="btn"
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
              class="btn"
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
              class="btn"
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
type scrollbarHeight = {
  height: string | number;
};
const toggleDashboardState = ref<scrollbarHeight>({
  height: "auto",
});

const toggleDashboardAction = () => {
  if (toggleDashboardState.value.height === "auto") {
    toggleDashboardState.value.height = 0;
  } else {
    toggleDashboardState.value.height = "auto";
  }
};

// 按 groupId 取得初始化資料
store.getNodeListDataInGroup(String(route.params.tid));
store.getFloorListDataInGroup(String(route.params.tid));

// 將列表資料依據階層分群
const groupByCategory = computed(() => store.get_groupByCategory);
const groupByCategoryLength = computed(() => {
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
