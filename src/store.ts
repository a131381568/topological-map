import { defineStore } from "pinia";

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
    groupConversion: [
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
  }),
  actions: {
    initApp() {
      this.isInitialized = true;
      console.log("app initialized!");
    },
    increment(value = 1) {
      this.count += value;
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
  },
  getters: {
    isReady: (state) => {
      return !state.isInitialized;
    },
    get_groupConversion: (state) => {
      return state.groupConversion;
    },
  },
});
