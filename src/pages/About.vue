<template>
  <div class="container-fluid relative about-layout">
    <main class="flex-wrap d-flex justify-content-center">
      <div class="about-block">
        <div class="about-body">
          <div class="about-text">
            <h5>網路拓撲 ( Topological Map ) 是什麼？</h5>
            <p>
              網路拓樸又稱為網路布局，或網路結構。此為電腦網路中，端點間連接的方式。網路上各端點藉由鏈
              ( Link )、節點 ( Node ) 或交換中心 ( Switch )
              互相連接。這種連接的通路分布即為網路拓樸。
            </p>
            <div class="h7">
              此專案為簡易繪製拓樸圖的功能，以下為它們的階層關係：
            </div>
            <ul>
              <li>群組 > 階層 > 節點 > 連線</li>
              <li>一張圖就是一個群組</li>
              <li>一共有三張表：群組對照表 > 階層對照表 > 節點總表</li>
            </ul>
            <p>
              目前沒有開後端 Server 串資料庫，範例資料的 3 支 API 是串 Apiary 的
              Mock Server。
            </p>
            <p>想要了解更多，可查看以下 Github 倉庫：</p>
            <a
              class="btn h8 sp-btn"
              target="_blank"
              href="https://github.com/a131381568/topological-map"
              >了解更多</a
            >
            <div class="disclaimer-block">
              <div class="h7">網站聲明：</div>
              <ul>
                <li>網站內的內容，皆作為學術研究用途，無商業行為。</li>
                <li>
                  素材與資料來源：Reshot、Freepik、國家教育研究院、Wikipedia。
                </li>
              </ul>
            </div>
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
