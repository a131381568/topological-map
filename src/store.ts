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
      // {
      //   groupId: "city-university",
      //   groupName: "城市大學",
      // },
      // {
      //   groupId: "first-net",
      //   groupName: "第一網絡",
      // },
      // {
      //   groupId: "home-test",
      //   groupName: "家用測試",
      // },
    ],
    singleTopoListData: <listDataType>[
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
    ],
    floorConversion: <floorConversionType>[
      {
        floorId: "cat001",
        floorName: "使用者",
      },
      {
        floorId: "cat002",
        floorName: "中繼站",
      },
      {
        floorId: "cat003",
        floorName: "管理員",
      },
      {
        floorId: "cat004",
        floorName: "主系統",
      },
    ],
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
      const remainder = this.groupConversion.filter(
        (item) => item.groupId !== groupId
      );
      this.groupConversion = remainder;
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
      // const allNodeList: listDataType = JSON.parse(
      //   JSON.stringify(this.singleTopoListData)
      // );
      // allNodeList.forEach((item, order) => {
      //   if (item.id === nodeId) {
      //     // const order = oriLinkList.indexOf(PreviousLink);
      //     oriLinkList.splice(order, 1);
      //   }
      // });
      let ownFloorId = "";
      const newArrayList = this.singleTopoListData.filter((item) => {
        // 移除節點內的 nodeId
        const linkList = item.link;
        const order = linkList.indexOf(nodeId);
        if (order > -1) {
          linkList.splice(order, 1);
        }
        // 還要移除對照表
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
      });
      this.floorConversion = await floorIdNameList;
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
