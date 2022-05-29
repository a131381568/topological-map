<template>
  <div class="container-fluid relative about-layout">
    <main class="flex-wrap d-flex justify-content-center align-items-center">
      <div class="w-100 text-center hero-content">
        <h1>About</h1>
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
    </main>
  </div>
</template>
<script setup lang="ts">
// const store = useStore();
onMounted(() => {
  //
});
</script>
