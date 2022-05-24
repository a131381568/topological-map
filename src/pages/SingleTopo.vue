<template>
  <div class="container relative">
    <main>
      <div
        class="topology-container"
        :style="{ height: Object.keys(groupByCategory).length * 180 + 'px' }"
      >
        <div class="floor-container">
          <div
            v-for="(value, key) in groupByCategory"
            :key="key"
            class="floor d-flex justify-content-between align-items-center"
          >
            <div class="floor-title d-flex justify-content-left h6 mb-0">
              {{ key }}
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
                <div class="h8 server-item-name mt-1">{{ inneritem.id }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import * as d3 from "d3";
let listData = ref([
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
    link: ["ap1130", "ap1131"],
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
]);

const groupByCategory = ref(
  listData.value.reduce((accumulator, currentValue) => {
    const { floor } = currentValue;
    accumulator[floor] = accumulator[floor] ?? [];
    accumulator[floor].push(currentValue);
    return accumulator;
  }, {})
);

onMounted(() => {
  const boardWidth = document.querySelector(".topology-container").offsetWidth;
  const boardDomRect = document
    .querySelector(".topology-container")
    .getBoundingClientRect();
  const boardDomRectTop = boardDomRect.top;
  const boardDomRectLeft = boardDomRect.left;

  const svgboard = d3
    .select(".topology-container")
    .append("svg")
    .attr("id", "svgboard")
    .attr("width", boardWidth)
    .attr("height", Object.keys(groupByCategory.value).length * 180)
    .attr("preserveAspectRatio", "xMinYMin slice");

  //箭頭
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

  function getPosition(className) {
    let element = document.querySelector(className);
    let rect = element.getBoundingClientRect();
    let x = rect.x;
    let y = rect.y;

    // let x = 0;
    // let y = 0;
    // while (element) {
    //   x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    //   y += element.offsetTop - element.scrollLeft + element.clientTop;
    //   element = element.offsetParent;
    // }

    // console.log("x: ", x, " y: ", y, "className: ", className);

    return { x: x, y: y };
  }

  function drawLineAct(x, y, ownX, ownY) {
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
  }
});
</script>
