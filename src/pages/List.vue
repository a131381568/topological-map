<template>
  <main class="container">
    <div class="d-flex justify-content-end mb-3">
      <button type="button" class="btn add-btn">+</button>
    </div>
    <table class="table ap-list-table">
      <thead>
        <tr>
          <th scope="col">代號</th>
          <th scope="col">名稱</th>
          <th scope="col">群組</th>
          <th scope="col">新增時間</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody class="border-0">
        <tr v-for="(value, key) in listData" :key="key">
          <td>{{ value.id }}</td>
          <td>{{ value.title }}</td>
          <td>{{ store.changeGroupName(value.groupId) }}</td>
          <td>{{ store.changeDate(value.time) }}</td>
          <td>
            <router-link :to="'/topo-edit/' + value.id">
              <svg
                class="svg-icon-outer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <g id="pen">
                  <path
                    class="svg-icon"
                    d="M46.66,1.33a4.53,4.53,0,0,0-6.41,0l-2,2c-1.59-.5-2.33.67-4,2.32l-1-1a3.42,3.42,0,0,0-4.74,0L16.94,16.31A1,1,0,0,0,17.65,18c.59,0-.09.5,10-9.58l1.92,1.92C2.1,37.82,3.5,36.34,3.38,36.69-.25,47.61-.29,47.11.3,47.71a1,1,0,0,0,1,.24c10.78-3.61,10.09-3.33,10.34-3.56.88-.82,12.39-12.38,32.5-32.49a2.16,2.16,0,0,0,.52-2.19l2-2A4.53,4.53,0,0,0,46.66,1.33ZM30,6.07a1.4,1.4,0,0,1,1.92,0l7.62,7.62-1.92,1.92L29.05,7Zm6.21,11L21,32.26,15.73,27,31,11.77ZM11,42.25,5.74,37l8.58-8.58,5.25,5.25Zm-6.22-3.4,4.37,4.37-6.55,2.2Zm38-28.37L41,12.28,35.71,7c1.83-1.82,1.87-2,2-1.79C43.13,10.61,42.93,10.3,42.75,10.48Zm2.5-4.16L43.46,8.11c-2.2-2.19-1.38-1.38-3.58-3.58l1.79-1.79a2.53,2.53,0,0,1,3.58,3.58Z"
                  />
                </g>
              </svg>
            </router-link>
          </td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="d-flex justify-content-center load-more-outer">
      <button type="button" class="btn load-more-btn">載入更多</button>
    </div> -->
  </main>
</template>
<script setup lang="ts">
import { listDataType } from "@/type/types";
// import { topoList } from "@/api/user";
// const route = useRoute();
const store = useStore();

onMounted(() => {
  //
});
const listData = ref<listDataType>([]);
// const getApList = async () => {
//   let res = await topoList();
//   // console.log(res);
//   listData.value = res.data.data;
// };
// getApList();
</script>
<style scoped lang="scss">
// .ap-list {
//   @extend %subBg;
// }
</style>
