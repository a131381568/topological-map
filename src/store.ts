import { topoListReq, topoGroupReq, topoFloorReq } from "@/api/topological";

import { defineStore } from "pinia";
import {
  groupConversionType,
  listDataType,
  groupListDataType,
  floorConversionType,
} from "@/type/types";

const versionString =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_APP_VERSION + "-dev"
    : import.meta.env.VITE_APP_VERSION;

export const useStore = defineStore("main", {
  state: () => ({
    debug: import.meta.env.MODE === "development",
    version: versionString,
    isInitialized: false,
    count: 0,
    groupConversion: <groupConversionType>[],
    totalTopoListData: <listDataType>[],
    singleTopoListData: <listDataType>[],
    totalfloorConversion: <floorConversionType>[],
    floorConversion: <floorConversionType>[],
    loadingModal: false,
  }),
  actions: {
    initApp() {
      this.isInitialized = true;
      console.log("app initialized!");
    },
    increment(value = 1) {
      this.count += value;
    },
    genNonDuplicateID(randomLength: number) {
      return Number(
        Math.random().toString().substring(3, randomLength) + Date.now()
      ).toString(36);
    },
    changeDate(timestamp: number) {
      let display = "";
      const ts = new Date(timestamp);
      const year = ts.getFullYear();
      const date = ts.getDate();
      const month = ts.getMonth() + 1;

      if (String(month).length === 1) {
        display = year + "-" + "0" + month;
      } else {
        display = year + "-" + month;
      }
      if (String(date).length === 1) {
        display = display + "-" + "0" + date;
      } else {
        display = display + "-" + date;
      }
      return display;
    },
    changeGroupName(groupId: string) {
      const searchCatAct = this.groupConversion.filter(
        (item) => item.groupId === groupId
      );
      if (searchCatAct.length > 0) {
        return String(searchCatAct[0].groupName);
      } else {
        return "";
      }
    },
    changeFloorName(floorId: string) {
      const searchFloorAct = this.floorConversion.filter(
        (item) => item.floorId === floorId
      );
      if (searchFloorAct.length > 0) {
        return String(searchFloorAct[0].floorName);
      } else {
        return "新階層";
      }
    },
    changeNodeName(nodeId: string) {
      const searchNodeAct = this.singleTopoListData.filter(
        (item) => item.id === nodeId
      );
      if (searchNodeAct.length > 0) {
        return String(searchNodeAct[0].title);
      } else {
        return "節點";
      }
    },
    checkGroupIdIsRepeat(groupId: string) {
      const repeatItem = this.get_groupConversion.filter((item) => {
        return item.groupId === groupId;
      });
      if (repeatItem.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    addGroupToList(groupId: string, groupName: string) {
      const groupInfo = {
        groupId: groupId,
        groupName: groupName,
      };
      this.groupConversion.push(groupInfo);
    },
    editGroupToList(groupId: string, groupName: string) {
      this.groupConversion.forEach((item) => {
        if (item.groupId === groupId) {
          item.groupName = groupName;
        }
      });
      // this.groupConversion = remainder;
    },
    async addItemInGroup(
      groupId: string,
      nodeTitle: string,
      floorId: string,
      link: string[]
    ) {
      const allNodeList: listDataType = await JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      const itemId = await this.genNonDuplicateID(7);
      // const floorId = await this.genNonDuplicateID(5);
      const newTopoItem = await {
        id: "n" + itemId,
        title: nodeTitle,
        floor: floorId,
        time: new Date().getTime(),
        groupId: groupId,
        link: link,
      };
      await allNodeList.push(newTopoItem);
      this.singleTopoListData = await allNodeList;
    },
    delGroupToList(groupId: string) {
      // 刪除群組對照表
      const remainder = this.groupConversion.filter(
        (item) => item.groupId !== groupId
      );
      this.groupConversion = remainder;
      // 刪除關聯 node
      const newTotalTopoListData = this.totalTopoListData.filter(
        (item) => item.groupId !== groupId
      );
      this.totalTopoListData = newTotalTopoListData;
      // 儲存至 cache
      this.saveStoreDataInCache();
      // 開啟 loading 燈箱
      this.toggleLoadingModal();
    },
    removeItemInGroup(nodeId: string) {
      const devAllNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      let ownFloorId = "";
      const newArrayList = devAllNodeList.filter((item) => {
        // 移除節點內的 nodeId
        const linkList = item.link;
        const order = linkList.indexOf(nodeId);
        if (order > -1) {
          linkList.splice(order, 1);
        }
        // 還要移除階層對照表
        if (linkList.length === 1) {
          ownFloorId = item.floor;
        }
        return item.id !== nodeId;
      });
      const newFloorConversion = this.floorConversion.filter(
        (item) => item.floorId !== ownFloorId
      );
      this.floorConversion = newFloorConversion;
      this.singleTopoListData = newArrayList;
    },
    editLinkInNode(nodeId: string, link: string, PreviousLink: string) {
      const allNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      allNodeList.forEach((item) => {
        if (item.id === nodeId) {
          const oriLinkList = item.link;
          if (oriLinkList.length === 1) {
            item.link = [link];
          } else {
            const order = oriLinkList.indexOf(PreviousLink);
            if (order > -1) {
              oriLinkList.splice(order, 1, link);
              item.link = oriLinkList;
            }
          }
        }
      });
      this.singleTopoListData = allNodeList;
    },
    addLinkInNode(nodeId: string, link: string) {
      const allNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      allNodeList.forEach((item) => {
        if (item.id === nodeId) {
          const oriLinkList = item.link;
          const newLinkList = oriLinkList.concat([link]);
          item.link = newLinkList;
        }
      });
      this.singleTopoListData = allNodeList;
    },
    deleteLinkInNode(nodeId: string, PreviousLink: string) {
      const allNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      allNodeList.forEach((item) => {
        if (item.id === nodeId) {
          const oriLinkList = item.link;
          const order = oriLinkList.indexOf(PreviousLink);
          if (order > -1) {
            oriLinkList.splice(order, 1);
            item.link = oriLinkList;
          }
        }
      });
      this.singleTopoListData = allNodeList;
    },
    async addFloorInGroup(
      groupId: string,
      floorName: string,
      nodeName: string
    ) {
      const allNodeList: listDataType = await JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      const itemId = await this.genNonDuplicateID(7);
      const floorId = await this.genNonDuplicateID(5);
      const newTopoItem = await {
        id: "n" + itemId,
        title: nodeName,
        floor: floorId,
        time: new Date().getTime(),
        groupId: groupId,
        link: [],
      };
      await allNodeList.push(newTopoItem);
      this.singleTopoListData = await allNodeList;
      // 新增至階層對照表
      const floorIdNameList = await JSON.parse(
        JSON.stringify(this.floorConversion)
      );
      await floorIdNameList.push({
        floorId: floorId,
        floorName: floorName,
        groupId: groupId,
      });
      this.floorConversion = await floorIdNameList;
    },
    removeFloorInGroup(floorId: string) {
      // 移除對照表
      const newFloorConversion = this.floorConversion.filter(
        (item) => item.floorId !== floorId
      );
      this.floorConversion = newFloorConversion;
      // 移除清單內，隸屬此 floor 的 node
      const excludedNodeIdSet: string[] = [];
      const newArrayList = this.singleTopoListData.filter((item) => {
        if (item.floor === floorId) {
          excludedNodeIdSet.push(item.id);
        }
        return item.floor !== floorId;
      });
      this.singleTopoListData = newArrayList;
      // 遍歷所有 link 欄位，有包含的都刪除
      const allNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      allNodeList.forEach((outer_item) => {
        const oriLinkList = outer_item.link;
        const noRepeatLink = oriLinkList.filter((item) => {
          const check = excludedNodeIdSet.indexOf(item);
          if (check === -1) {
            return item;
          }
        });
        outer_item.link = noRepeatLink;
      });
      this.singleTopoListData = allNodeList;
    },
    getNodeListDataInGroup(groupId: string) {
      this.singleTopoListData = [];
      const remainder = this.totalTopoListData.filter(
        (item) => item.groupId === groupId
      );
      this.singleTopoListData = remainder;
    },
    getFloorListDataInGroup(groupId: string) {
      this.floorConversion = [];
      const remainder = this.totalfloorConversion.filter(
        (item) => item.groupId === groupId
      );
      this.floorConversion = remainder;
    },
    saveSingleEditToTotalData(groupId: string, newGroupName: string) {
      // 先將總表的舊 node 資料刪除
      const remainderNode = this.totalTopoListData.filter(
        (item) => item.groupId !== groupId
      );
      // 更新修改後的 node 資料
      const newTotalNodeData = remainderNode.concat(this.singleTopoListData);
      this.totalTopoListData = newTotalNodeData;
      // 先將總表的舊 floor 資料刪除
      const remainderFloor = this.totalfloorConversion.filter(
        (item) => item.groupId !== groupId
      );
      // 更新修改後的 floor 資料
      const newTotalFlorData = remainderFloor.concat(this.floorConversion);
      this.totalfloorConversion = newTotalFlorData;
      // 更新群組名稱
      const allGroupList: groupConversionType = JSON.parse(
        JSON.stringify(this.groupConversion)
      );
      allGroupList.forEach((item) => {
        if (item.groupId === groupId) {
          item.groupName = newGroupName;
        }
      });
      this.groupConversion = allGroupList;
      // 開啟 loading 燈箱
      this.toggleLoadingModal();
    },
    delItemToTotalList(nodeId: string) {
      const devAllNodeList: listDataType = JSON.parse(
        JSON.stringify(this.totalTopoListData)
      );
      let ownFloorId = "";
      const newArrayList = devAllNodeList.filter((item) => {
        // 移除節點內的 nodeId
        const linkList = item.link;
        const order = linkList.indexOf(nodeId);
        if (order > -1) {
          linkList.splice(order, 1);
        }
        // 還要移除階層對照表
        if (linkList.length === 1) {
          ownFloorId = item.floor;
        }
        return item.id !== nodeId;
      });
      const newFloorConversion = this.totalfloorConversion.filter(
        (item) => item.floorId !== ownFloorId
      );
      this.totalfloorConversion = newFloorConversion;
      this.totalTopoListData = newArrayList;
      // 開啟 loading 燈箱
      this.toggleLoadingModal();
    },
    toggleLoadingModal() {
      const vm = this;
      vm.loadingModal = true;
      setTimeout(() => {
        vm.loadingModal = false;
      }, 1000);
    },
    updateFloorConversion(floorId: string, newFloorName: string) {
      const allFloorList: floorConversionType = JSON.parse(
        JSON.stringify(this.floorConversion)
      );
      allFloorList.forEach((item) => {
        if (item.floorId === floorId) {
          item.floorName = newFloorName;
        }
      });
      this.floorConversion = allFloorList;
    },
    updateNodeName(nodeId: string, newNodeName: string) {
      const singleNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      singleNodeList.forEach((item) => {
        if (item.id === nodeId) {
          item.title = newNodeName;
        }
      });
      this.singleTopoListData = singleNodeList;
    },
    async initExampleData() {
      const list = await topoListReq();
      this.totalTopoListData = list.data.data;
      const group = await topoGroupReq();
      this.groupConversion = group.data.data;
      const floor = await topoFloorReq();
      this.totalfloorConversion = floor.data.data;
    },
    saveStoreDataInCache() {
      const groupList: groupConversionType = this.groupConversion;
      const floorList: floorConversionType = this.totalfloorConversion;
      const nodeList: listDataType = this.totalTopoListData;
      localStorage.setItem("topo-group-cache", JSON.stringify(groupList));
      localStorage.setItem("topo-floor-cache", JSON.stringify(floorList));
      localStorage.setItem("topo-node-cache", JSON.stringify(nodeList));
      console.log("Save In Local Browser");
    },
    async initStoreDataByCache() {
      const groupCache = await localStorage.getItem("topo-group-cache");
      if (groupCache) {
        this.groupConversion = JSON.parse(groupCache);
      }
      const floorCache = await localStorage.getItem("topo-floor-cache");
      if (floorCache) {
        this.totalfloorConversion = JSON.parse(floorCache);
      }
      const nodeCache = await localStorage.getItem("topo-node-cache");
      if (nodeCache) {
        this.totalTopoListData = JSON.parse(nodeCache);
      }
    },
  },
  getters: {
    isReady: (state) => {
      return !state.isInitialized;
    },
    get_groupConversion: (state) => {
      return state.groupConversion;
    },
    get_singleTopoListData: (state) => {
      // console.log("get_singleTopoListData");
      const result = state.singleTopoListData;
      return result;
    },
    get_singleTopoListLength: (state) => {
      // console.log("get_singleTopoListLength");
      return state.singleTopoListData.length;
    },
    get_groupByCategory: (state) => {
      // console.log("get_groupByCategory");
      const catResult = state.singleTopoListData.reduce(
        (accumulator: groupListDataType, currentValue) => {
          const { floor } = currentValue;
          accumulator[`${floor}`] = accumulator[`${floor}`] ?? [];
          accumulator[`${floor}`].push(currentValue);
          return accumulator;
        },
        {}
      );
      return catResult;
    },
    get_loadingModal: (state) => {
      return state.loadingModal;
    },
  },
});
