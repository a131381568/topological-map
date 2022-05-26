<template>
  <main class="d-flex justify-content-between container-fluid">
    <TopoBoard class="w-75"></TopoBoard>
    <div class="w-25 topo-edit-dashboard">
      <div class="topo-floor-container">
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
                class="add-topo-floor"
                @click.prevent="
                  addFloorAct('服務器', String(key), [], value.length)
                "
              >
                +
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
                      <!-- 新增連線 -->
                      <!-- 需開啟燈箱，點選確定後新增 -->
                      <button
                        class="add-node-link-item h8"
                        @click.prevent="
                          addLinkItem(nodeItem.id, nodeItem.link.length, [
                            'ap1129',
                          ])
                        "
                      >
                        Link
                      </button>
                    </div>
                    <ul class="topo-node-link-list">
                      <li
                        v-for="(linkItem, linkKey) in nodeItem.link"
                        :key="linkKey"
                        class="topo-node-link-item h8"
                      >
                        <!-- {{ linkItem }} -->
                        <div class="dropdown">
                          <button
                            id="add-link-dropdown-btn"
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {{ linkItem }}
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
                                    [nodeLink]
                                  )
                                "
                              >
                                {{ nodeLink }}</a
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
  </main>
</template>
<script setup lang="ts">
const route = useRoute();
const store = useStore();
const groupByCategory = computed(() => store.get_groupByCategory);
const groupByCategoryLength = computed(
  () => Object.keys(groupByCategory).length
);

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

const addFloorAct = (
  nodeTitle: string,
  floorId: string,
  link: string[],
  itemLength: number
) => {
  // console.log(itemLength);
  if (route.params.tid && itemLength < 8) {
    store.addItemInGroup(String(route.params.tid), nodeTitle, floorId, link);
  }
};

const addLinkItem = (nodeId: string, nowLinkLength: number, link: string[]) => {
  // console.log(nowLinkLength);
  if (store.get_singleTopoListLength - 1 > nowLinkLength) {
    store.addLinkInNode(nodeId, link);
  }
};

const editLinkItem = (
  nodeId: string,
  nowLinkLength: number,
  link: string[]
) => {
  // console.log(nowLinkLength);
  if (store.get_singleTopoListLength - 1 > nowLinkLength) {
    store.editLinkInNode(nodeId, link);
  }
};
</script>
