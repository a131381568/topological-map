<template>
  <div class="container relative home-layout">
    <main class="flex-wrap d-flex justify-content-center align-items-center">
      <div class="w-100 text-center hero-content">
        <h1>Topological Map</h1>
      </div>
      <div
        class="add-data-card card"
        style="max-width: 320px; padding: 1.5rem 1rem"
      >
        <div class="index-svg-icon text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            xml:space="preserve"
          >
            <path
              fill="#282D33"
              d="M38.518 2.762h36.305v3.999H38.518zM38.518 13.741h36.305v3.999H38.518zM32.648 17.48h-14.84V2.793h14.84V17.48zm-10.84-4h6.841V6.793h-6.841v6.687zM109.756 93.174H85.803v-4h19.953V63.225H21.255v25.949H41.89v4H17.255V59.225h92.501z"
            />
            <path
              fill="#282D33"
              d="M41.05 74.199h44.913v4H41.05zM110.744 21.794H80.77V0h29.975v21.794zm-25.974-4h21.977V3.999H84.77v13.795z"
            />
            <path
              fill="#282D33"
              d="M89.168 8.896h13.18v3.999h-13.18zM38.518 31.409h36.305v3.999H38.518zM38.518 42.388h36.305v3.999H38.518zM32.648 46.128h-14.84V31.441h14.84v14.687zm-10.84-4h6.841V35.44h-6.841v6.688zM110.744 50.44H80.77V28.646h29.975V50.44zM84.77 46.441h21.977V32.646H84.77v13.795z"
            />
            <path
              fill="#282D33"
              d="M89.168 37.543h13.18v4h-13.18zM61.055 81.99h4v7.51h-4zM50.281 88.603l6.596 3.753-1.978 3.477-6.596-3.753zM55.34 100.771l1.978 3.476-6.599 3.755-1.978-3.476zM72.114 100.007l6.6 3.754-1.976 3.475-6.6-3.754zM76.279 87.836l1.978 3.475-6.6 3.757-1.979-3.475z"
            />
            <g>
              <path
                fill="#282D33"
                d="m74.834 121.101-22.699-.203 11.526-19.274 11.173 19.477zm-15.685-4.139 8.746.078-4.304-7.504-4.442 7.426z"
              />
              <path
                fill="#282D33"
                d="m61.506 118.855 3.999.037-.085 9.115-4-.037z"
              />
            </g>
          </svg>
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">建立資料</h5>
          <p class="card-text">
            從零開始建立資料，建立群組、新增節點，需點選右上角儲存修改，才會儲存資料。
          </p>
          <div class="btn-group w-100">
            <router-link class="btn w-50 h8 add-group-btn" to="/group"
              >新增群組</router-link
            >
          </div>
        </div>
      </div>
      <div
        class="example-card card"
        style="max-width: 320px; padding: 1.5rem 1rem"
      >
        <div class="index-svg-icon text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            xml:space="preserve"
          >
            <path fill="#282D33" d="M57.632 79.048h5.549v4h-5.549z" />
            <path
              fill="#282D33"
              d="M116.245 83.048H77.368v-4l37.26.012c.221-.019.415-.015.558-.015l.34.003c4.673 0 8.475-3.863 8.475-8.611 0-4.679-3.607-8.451-8.212-8.59l-2.178-.065.251-2.163c.105-.911.156-1.733.156-2.515 0-11.675-9.364-21.173-20.875-21.173a20.69 20.69 0 0 0-5.639.804l-2.219.63-.31-2.285C82.847 19.338 69.405 7.468 53.711 7.468c-17.409 0-31.573 14.354-31.573 31.997l.005 2.007-1.77.205C11.039 42.757 4 50.762 4 60.297c0 10.34 8.292 18.751 18.485 18.751h21.721v4H22.485C10.087 83.048 0 72.842 0 60.297 0 49.331 7.695 40.03 18.168 37.975c.775-19.162 16.421-34.507 35.543-34.507 16.958 0 31.578 12.278 34.868 28.903a24.242 24.242 0 0 1 4.563-.44c13.716 0 24.875 11.293 24.875 25.173 0 .322-.007.648-.021.982C123.748 59.231 128 64.303 128 70.437c0 6.708-5.208 12.21-11.751 12.591l-.004.02z"
            />
            <path
              fill="#282D33"
              d="m108.864 60.476-3.973-.459c.07-.612.104-1.138.104-1.607 0-7.357-5.896-13.342-13.143-13.342-1.156 0-2.352.173-3.553.514l-1.092-3.848a17.024 17.024 0 0 1 4.645-.666c9.452 0 17.143 7.779 17.143 17.342.001.623-.042 1.299-.131 2.066zM27.167 40.932l-.006-.229c0-15.515 12.488-28.096 27.839-28.096v4c-13.146 0-23.84 10.786-23.84 24.045l.005.179-3.998.101zM13.021 61.601h-4c0-7.583 5.613-13.95 13.057-14.811l.459 3.974c-5.425.627-9.516 5.286-9.516 10.837zM60.473 51.765l-9.491-9.606-9.488 9.606-2.846-2.812 12.334-12.485 12.337 12.485z"
            />
            <path fill="#282D33" d="M48.983 40.259h4v43.207h-4z" />
            <g>
              <path
                fill="#282D33"
                d="m70.102 124.532-12.337-12.484 2.844-2.813 9.493 9.606 9.489-9.605 2.846 2.811z"
              />
              <path fill="#282D33" d="M68.101 78.461h4v42.281h-4z" />
            </g>
          </svg>
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">範例資料</h5>
          <p class="card-text">
            目前預設資料皆為空值，想要直接查看完善資料的狀態，可點選下方下載範例資料。
          </p>
          <div class="btn-group w-100">
            <button
              class="btn h8 download-btn"
              @click.prevent="downloadExampleReq"
            >
              下載
            </button>
            <router-link
              :class="[{ 'can-view': dataState > 0 }, 'btn', 'h8', 'view-btn']"
              to="/group"
              >查看</router-link
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
const store = useStore();
const dataState = computed(() => store.totalTopoListData.length);
const downloadExampleReq = async () => {
  await store.toggleLoadingModal();
  await store.initExampleData();
};

onMounted(() => {
  //
});
</script>
