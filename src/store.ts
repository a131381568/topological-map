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
    groupConversion: <groupConversionType>[
      {
        groupId: "city-university",
        groupName: "城市大學",
      },
      {
        groupId: "first-net",
        groupName: "第一網絡",
      },
      {
        groupId: "home-test",
        groupName: "家用測試",
      },
    ],
    totalTopoListData: <listDataType>[
      {
        id: "ap1126",
        title: "教學樓",
        floor: "cat001",
        time: 1653344520000,
        groupId: "city-university",
        link: ["ap1130"],
      },
      {
        id: "ap1127",
        title: "宿舍樓",
        floor: "cat001",
        time: 1653344580000,
        groupId: "city-university",
        link: ["ap1126", "ap1131"],
      },
      {
        id: "ap1128",
        title: "辦公樓",
        floor: "cat001",
        time: 1653344640000,
        groupId: "city-university",
        link: ["ap1132"],
      },
      {
        id: "ap1129",
        title: "活動樓",
        floor: "cat001",
        time: 1653344700000,
        groupId: "city-university",
        link: ["ap1133"],
      },
      {
        id: "ap1130",
        title: "教學樓中繼",
        floor: "cat002",
        time: 1653344760000,
        groupId: "city-university",
        link: ["ap1134"],
      },
      {
        id: "ap1131",
        title: "宿舍樓中繼",
        floor: "cat002",
        time: 1653344820000,
        groupId: "city-university",
        link: ["ap1134"],
      },
      {
        id: "ap1132",
        title: "辦公樓中繼",
        floor: "cat002",
        time: 1653344880000,
        groupId: "city-university",
        link: ["ap1135"],
      },
      {
        id: "ap1133",
        title: "活動樓中繼",
        floor: "cat002",
        time: 1653344940000,
        groupId: "city-university",
        link: ["ap1135"],
      },
      {
        id: "ap1134",
        title: "內部服務",
        floor: "cat003",
        time: 1653345000000,
        groupId: "city-university",
        link: ["ap1136"],
      },
      {
        id: "ap1135",
        title: "外部服務",
        floor: "cat003",
        time: 1653345060000,
        groupId: "city-university",
        link: ["ap1136"],
      },
      {
        id: "ap1136",
        title: "總服務器",
        floor: "cat004",
        time: 1653345120000,
        groupId: "city-university",
        link: [],
      },
      {
        id: "ap1137",
        title: "第一網路---1",
        floor: "rewgewgrwgwegg",
        time: 1653345220000,
        groupId: "first-net",
        link: [],
      },
      {
        id: "ap1138",
        title: "家用測試---1",
        floor: "eqfqewfqwdwdd",
        time: 1653345320000,
        groupId: "home-test",
        link: [],
      },
      {
        id: "n82hgomn5weo",
        title: "bbbbbbb",
        floor: "3ydh6iwcpe",
        time: 1653740831315,
        groupId: "home-test",
        link: ["nhj2lf9btzgo", "n5vt8tauuuh4"],
      },
      {
        id: "nhj2lf9btzgo",
        title: "cccccccccc",
        floor: "968rtipgw9",
        time: 1653740836810,
        groupId: "home-test",
        link: [],
      },
      {
        id: "n5vt8tauuuh4",
        title: "c2",
        floor: "968rtipgw9",
        time: 1653740841930,
        groupId: "home-test",
        link: [],
      },
      {
        id: "nnvpebzx7dsw",
        title: "c3",
        floor: "968rtipgw9",
        time: 1653740846754,
        groupId: "home-test",
        link: ["ap1138"],
      },
      {
        id: "nek1i2739dgo",
        title: "電腦 A",
        floor: "8vly0dmn3e",
        time: 1653741415275,
        groupId: "first-net",
        link: ["ap1137"],
      },
    ],
    singleTopoListData: <listDataType>[],
    totalfloorConversion: <floorConversionType>[
      {
        floorId: "cat001",
        floorName: "使用者",
        groupId: "city-university",
      },
      {
        floorId: "cat002",
        floorName: "中繼站",
        groupId: "city-university",
      },
      {
        floorId: "cat003",
        floorName: "管理員",
        groupId: "city-university",
      },
      {
        floorId: "cat004",
        floorName: "主系統",
        groupId: "city-university",
      },
      {
        floorId: "rewgewgrwgwegg",
        floorName: "網路系統 A",
        groupId: "first-net",
      },
      {
        floorId: "eqfqewfqwdwdd",
        floorName: "社區 A",
        groupId: "home-test",
      },
    ],
    floorConversion: <floorConversionType>[],
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
    async removeItemInGroup(nodeId: string) {
      const devAllNodeList: listDataType = await JSON.parse(
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
    saveSingleEditToTotalData(groupId: string) {
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
    },
  },
  getters: {
    isReady: (state) => {
      return !state.isInitialized;
    },
    get_groupConversion: (state) => {
      // console.log("get_groupConversion");
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
  },
});
