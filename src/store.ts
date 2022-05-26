import { defineStore } from "pinia";
import {
  groupConversionType,
  listDataType,
  groupListDataType,
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
      {
        id: "nn63rwf5u6xc",
        title: "服務器",
        floor: "cat002",
        time: 1653597446034,
        groupId: "wdwd",
        link: [],
      },
      {
        id: "n4j9pei2bad4",
        title: "服務器",
        floor: "cat002",
        time: 1653597451065,
        groupId: "wdwd",
        link: [],
      },
      {
        id: "nd8vl6ibuzco",
        title: "服務器",
        floor: "cat002",
        time: 1653597749622,
        groupId: "wdwd",
        link: [],
      },
      {
        id: "nr9b3vlwywxc",
        title: "服務器",
        floor: "cat002",
        time: 1653598609201,
        groupId: "wdwd",
        link: [],
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
    editLinkInNode(nodeId: string, link: string[]) {
      const allNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      allNodeList.forEach((item) => {
        if (item.id === nodeId) {
          // const oriLinkList = item.link;
          // const newLinkList = oriLinkList.concat(link);
          // item.link = newLinkList;
          item.link = link;
        }
      });
      this.singleTopoListData = allNodeList;
    },
    addLinkInNode(nodeId: string, link: string[]) {
      const allNodeList: listDataType = JSON.parse(
        JSON.stringify(this.singleTopoListData)
      );
      allNodeList.forEach((item) => {
        if (item.id === nodeId) {
          const oriLinkList = item.link;
          const newLinkList = oriLinkList.concat(link);
          item.link = newLinkList;
        }
      });
      this.singleTopoListData = allNodeList;
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
