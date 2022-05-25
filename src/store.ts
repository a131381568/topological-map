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
    // changeCatName(array: ArtistsCategories, catId: string) {
    //   const searchCatAct = array.filter(
    //     (item) => item.post_category_id === catId
    //   );
    //   if (searchCatAct.length > 0) {
    //     return String(searchCatAct[0].post_category_name);
    //   } else {
    //     return "";
    //   }
    // }
  },
  getters: {
    isReady: (state) => {
      return !state.isInitialized;
    },
  },
});
