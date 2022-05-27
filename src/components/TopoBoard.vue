<template>
  <div
    class="topology-container"
    :style="{ height: groupByCategoryLength * 180 + 'px' }"
  >
    <div class="floor-container">
      <div
        v-for="(value, key) in groupByCategory"
        :key="key"
        class="floor d-flex justify-content-between align-items-center"
      >
        <div class="floor-title d-flex h6 mb-0 wdwdwdwd">
          {{ store.changeFloorName(String(key)) }}
        </div>
        <div class="floor-content d-flex justify-content-around">
          <div
            v-for="(inneritem, innerkey) in value"
            :key="innerkey"
            class="server-item text-center"
          >
            <div :class="['server-item-bg', inneritem.id]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                class="server-icon"
              >
                <g id="server-icon-inner">
                  <path
                    d="M57,5H7A1,1,0,0,0,6,6V34a1,1,0,0,0,1,1H57a1,1,0,0,0,1-1V6A1,1,0,0,0,57,5ZM56,33H8V7H56Z"
                  />
                  <path
                    d="M57,1H7A5.0059,5.0059,0,0,0,2,6V42a5.0059,5.0059,0,0,0,5,5H24v4H14a1,1,0,0,0-.8945.5527l-5,10A1,1,0,0,0,9,63H55a1,1,0,0,0,.8945-1.4473l-5-10A1,1,0,0,0,50,51H40V47H57a5.0059,5.0059,0,0,0,5-5V6A5.0059,5.0059,0,0,0,57,1ZM4,6A3.0033,3.0033,0,0,1,7,3H57a3.0033,3.0033,0,0,1,3,3V37H4ZM38,52a6.0066,6.0066,0,0,0,6,6,1,1,0,0,0,0-2,3.9958,3.9958,0,0,1-3.858-3h9.24l4,8H10.6182l4-8h9.24A3.9958,3.9958,0,0,1,20,56a1,1,0,0,0,0,2,6.0066,6.0066,0,0,0,6-6V47H38ZM60,42a3.0033,3.0033,0,0,1-3,3H7a3.0033,3.0033,0,0,1-3-3V39H60Z"
                  />
                  <path d="M7,43h6a1,1,0,0,0,0-2H7a1,1,0,0,0,0,2Z" />
                  <path d="M16,43h2a1,1,0,0,0,0-2H16a1,1,0,0,0,0,2Z" />
                </g>
              </svg>
            </div>
            <div class="h8 server-item-name mt-1">{{ inneritem.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as d3 from "d3";
const store = useStore();
// type groupListDataType = { [index: string]: listDataType };
// type listDataType = {
//   id: string;
//   title: string;
//   floor: string;
//   time: number;
//   groupId: string;
//   link: string[];
// }[];

// const listData = ref<listDataType>();
// const groupByCategory = ref([]);
const listData = computed(() => store.get_singleTopoListData);
const groupByCategory = computed(() => store.get_groupByCategory);
const groupByCategoryLength = computed(
  () => Object.keys(store.get_groupByCategory).length
);

const topoBoardInit = () => {
  // 取得座標函式
  const getPosition = (className: string) => {
    let element: HTMLElement | null = document.querySelector(className);
    let rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    let x = 0;
    let y = 0;
    if (element !== null) {
      rect = element.getBoundingClientRect();
      x = rect.x;
      y = rect.y;
    }
    return { x: x, y: y };
  };
  // 畫線函式
  const drawLineAct = (x: number, y: number, ownX: number, ownY: number) => {
    const drawLine = svgboard.append("line");
    drawLine.attr("marker-end", "url(#arrow-dom)");
    drawLine.attr("stroke-width", 1);
    drawLine.attr("stroke", "#bed441");
    drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    drawLine.attr("y1", ownY - boardDomRectTop + 45);
    drawLine.attr("x2", x - boardDomRectLeft + 45);
    drawLine.attr("y2", y - boardDomRectTop + 45);
    // // ↑
    // if (ownY > y && ownX === x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 45);
    //   drawLine.attr("y2", y - boardDomRectTop + 90 + 30);
    // }
    // // ↗
    // if (ownY > y && ownX < x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 0);
    //   drawLine.attr("y2", y - boardDomRectTop + 90 + 30);
    // }
    // // →
    // if (ownY === y && ownX < x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft - 15);
    //   drawLine.attr("y2", y - boardDomRectTop + 45);
    // }
    // // ↘
    // if (ownY < y && ownX < x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 20);
    //   drawLine.attr("y2", y - boardDomRectTop - 10);
    // }
    // // ↓
    // if (ownY < y && ownX === x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 45);
    //   drawLine.attr("y2", y - boardDomRectTop - 10);
    // }
    // // ↙
    // if (ownY < y && ownX > x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 65);
    //   drawLine.attr("y2", y - boardDomRectTop - 10);
    // }
    // // ←
    // if (ownY === y && ownX > x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 90 + 15);
    //   drawLine.attr("y2", y - boardDomRectTop + 45);
    // }
    // // ↖
    // if (ownY > y && ownX > x) {
    //   drawLine.attr("x1", ownX - boardDomRectLeft + 45);
    //   drawLine.attr("y1", ownY - boardDomRectTop + 45);
    //   drawLine.attr("x2", x - boardDomRectLeft + 90);
    //   drawLine.attr("y2", y - boardDomRectTop + 90 + 30);
    // }
  };
  // 宣告畫布
  const topoDom: HTMLElement | null = document.querySelector(
    ".topology-container"
  );
  // 有 svg 就移除
  const topoSvgDom: HTMLElement | null = document.getElementById("svgboard");
  if (topoSvgDom) {
    topoSvgDom.remove();
  }
  // 取得寬度資訊
  let boardWidth = 0;
  let boardDomRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  if (topoDom !== null) {
    boardWidth = topoDom.offsetWidth;
    boardDomRect = topoDom.getBoundingClientRect();
  }
  const boardDomRectTop = boardDomRect.top;
  const boardDomRectLeft = boardDomRect.left;
  const svgboard = d3
    .select(".topology-container")
    .append("svg")
    .attr("id", "svgboard")
    .attr("width", boardWidth)
    .attr("height", Object.keys(groupByCategory.value).length * 180)
    .attr("preserveAspectRatio", "xMinYMin slice");

  // 定義箭頭樣式
  svgboard.append("defs");
  const defs = svgboard.append("defs");
  const arrowMarker = defs
    .append("marker")
    .attr("id", "arrow-dom")
    .attr("class", "link_node_some_arrow")
    .attr("markerUnits", "userSpaceOnUse")
    .attr("markerWidth", "30")
    .attr("markerHeight", "30")
    .attr("viewBox", "0 0 30 30")
    .attr("refX", "6")
    .attr("refY", "6")
    .attr("orient", "auto");
  arrowMarker
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", "#bed441");

  // 0.3 秒後畫圖才抓地到畫面的 id
  setTimeout(() => {
    // 針對取得資料繪製線條
    listData.value.forEach((item) => {
      // 取得自己的座標
      let positionInfo = getPosition("." + item.id);
      if (item.link.length > 0) {
        item.link.forEach((linkItem) => {
          // 取得連線座標
          let linkpositionInfo = getPosition("." + linkItem);
          // 畫線
          drawLineAct(
            linkpositionInfo.x,
            linkpositionInfo.y,
            positionInfo.x,
            positionInfo.y
          );
        });
      }
    });
  }, 300);
};

// 節流
const flag = ref(true);
type GreetFunction = () => void;
const throttled = (fn: GreetFunction, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  let starttime = Date.now();
  return () => {
    if (!flag.value) return false;
    let curTime = Date.now(); // 當前時間
    let remaining = delay - (curTime - starttime); // 從上一次到現在，還剩下多少多餘時間
    const vm = this;
    // const args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(vm); // ,args
      starttime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
};

const onResize = () => {
  topoBoardInit();
};

watch(
  () => store.get_singleTopoListData,
  () => {
    // console.log(val, old);
    topoBoardInit();
  }
);

onMounted(() => {
  flag.value = true;
  window.addEventListener("resize", throttled(onResize, 1000), false);
  topoBoardInit();
});

onBeforeUnmount(() => {
  flag.value = false;
  window.removeEventListener("resize", onResize, false);
});
</script>
