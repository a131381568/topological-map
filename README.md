# Topological Map

## 一、簡述（Description）

**網路拓撲 ( Topological Map )**，又稱為網路布局，或網路結構。此為電腦網路中，端點間連接的方式。網路上各端點藉由鏈 ( Link )、節點 ( Node ) 或交換中心 ( Switch )互相連接。這種連接的通路分布即為**網路拓樸**。

> 繪製**網路拓樸圖**能夠釐清——系統內部，每台電腦之間的關係，對於維運、監控系統、管理主機設備，有很大的功用。

曾經有使用過 jQuery 製作**繪製拓樸圖**的功能，因為不斷的定位 DOM 當下的狀態，並使其更改、刷新......等，使得專案結構上不是這麼好維護。

此專案目的為使用 Vue3 的資料驅動畫面、雙向綁定和資料流的思考方式，搭配 D3.js 來重構**繪製拓樸圖**的功能。

![home](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/demo/01-online-home.png)
- 編輯拓樸圖
![edit](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/demo/02-editer-page.png)


## 二、操作流程（Flow）

### A. 案例-新增群組
從零開始繪製一張：一階層、一節點的拓樸圖。<br />
![add-group](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/01-add-group.png)

### B. 其它案例
> 可至 [Doc Flow](https://github.com/a131381568/topological-map/tree/main/doc/flow) 這個資料夾查看以下案例：
- 新增階層
- 新增節點
- 刪除群組
- 刪除階層
- 刪除節點 ( 內部 + 外部 )
- 刪除連線
- 修改群組名稱
- 修改階層名稱
- 修改節點名稱



## 三、使用技術及套件（NPM）
- vue - SPA 應用框架，版本為 3.2。
- pinia - vuex 的簡化版，管理共用的資料。
- vue-router - vue 的路由系統。
- d3.js - 繪製 SVG 連線。
- vite - 本地開發比起 webpack 更有效率的 dev-server（不進行打包）。
- bootstrap - 版本為 5.1.3，無依賴 jQuery 的版本，作為開發 UI 操作介面的基底。
- sass - 配合 vite 的打包，進行 CSS 的模組化樣式管理。
- typescript - 管理 JS 的 Type。


## 四、前端路由與組件架構（Vue Router & Component）
![route-component](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/demo/03-route-component-2.jpg)


## 五、資料結構相關（Data Sheet & Apiary）

### A. 資料表關係
僅僅為 DEMO 功能，並沒有要將資料存回後端，因為沒有後端，所以這邊就介紹資料結構。
此 Type 可在 `/src/type/type.d.ts` 找到對照。

![type](https://i.imgur.com/Glg8uDF.jpg)


### B. Apiary API

目前沒有開後端 Server 串資料庫，範例資料的三支 API 是串 [Apiary](https://toponet.docs.apiary.io/) 的 Mock Server。
- [groupConversion ( 群組對照 )](https://toponet.docs.apiary.io/#/reference/0/all-group/data-in-group-conversion/200?mc=reference%2F0%2Fall-group%2Fdata-in-group-conversion%2F200)
- [floorConversion ( 階層對照 )](https://toponet.docs.apiary.io/#/reference/0/all-floor/data-in-totalfloor-conversion/200?mc=reference%2F0%2Fall-floor%2Fdata-in-totalfloor-conversion%2F200)
- [nodeList ( 節點資料 )](https://toponet.docs.apiary.io/#/reference/0/all-node/data-in-total-topo-list-data/200?mc=reference%2F0%2Fall-node%2Fdata-in-total-topo-list-data%2F200)


## 六、本機開發（Local Development）
 安裝 NPM 依賴並運行。
```shell
npm install
npm run dev
# 顯示 > Local: http://localhost:3000/
```


## 七、聲明（Disclaimer）
- 網站內的內容，皆作為學術研究用途，無商業行為。
- 素材與資料來源：Reshot、Freepik、國家教育研究院、Wikipedia。
