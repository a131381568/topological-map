
# 操作流程（Flow）

### 案例 A. 新增群組
從零開始繪製一張：一階層、一節點的拓樸圖。<br />
![add-group](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/01-add-group.png)
<!--
1. 進入首頁。
2. 點選下方的左邊的**新增群組**，或點選上方選單的**GROUP**，都能到達路由`/group`。
3. 點選**新增群組**。
4. 輸入**群組名稱**和**群組代號**，點選**確定**，能夠看到列表已新增一個群組。
5. 點選剛新增的項目**編輯**的鉛筆 Icon。
6. 路由已跳到此群組的編輯模式頁面`/topo-edit/{tid}`，因為尚無資料，會跳出強制新增階層的燈箱，輸入**階層名稱**和**節點名稱**後，點選確定。
7. 最後按右上角的**儲存修改**，就能夠儲存此拓樸圖了。
-->

---

### 案例 B. 新增階層
匯入範例檔案，新增一個階層和一個節點並連線。<br />
![add-floor](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/02-add-floor.png)
<!-- 1. 進入首頁。
2. 點選右邊的**下載**，下載完後，右邊的查看按鈕會從灰色變成綠色。
3. 點選綠色按鈕的**查看**。
4. 路由會跳到`/group`，點選項目為城市大學的**鉛筆按鈕** ( 編輯 )。
5. 會看到一個畫好的四階層連線拓樸圖，在右下角點選**新增階層**。
6. 輸入**階層名稱**和**節點名稱**後按確定，右邊控制台最下面會出現已新增的階層和節點，點選已新增的節點後會展開連線設定，點選**新增連線**。
7. 跳出選擇連線的燈箱， 展開清單後，選擇**總服務器**後，按確定，拓樸圖就會刷新。
8. 最後按右上角的**儲存修改**，就能夠儲存此拓樸圖了。 -->

---

### 案例 C. 新增節點
匯入範例檔案，新增一個節點並連線。<br />
![add-node](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/03-add-node.png)
<!-- 1. 進入首頁。
2. 點選右邊的**下載**，下載完後，右邊的查看按鈕會從灰色變成綠色。
3. 點選綠色按鈕的**查看**。
4. 路由會跳到`/group`，點選項目為城市大學的**鉛筆按鈕** ( 編輯 )。
5. 會看到一個畫好的四階層連線拓樸圖，在右邊**管理員**的區塊，點選**新增節點**。
6. 輸入**節點名稱**後按確定，**管理員**區塊下方會出現已新增的節點，點選後會展開連線設定，點選**新增連線**。
7. 跳出選擇連線的燈箱， 展開清單後，選擇**教學樓**後，按確定，拓樸圖就會刷新。
8. 最後按右上角的**儲存修改**，就能夠儲存此拓樸圖了。 -->

---

### 案例 D. 刪除群組
刪除匯入的群組——城市大學。<br />
![remove-group](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/04-remove-group.png)
<!-- 1. 進入首頁。
2. 點選右邊的**下載**，下載完後，右邊的查看按鈕會從灰色變成綠色。
3. 點選綠色按鈕的**查看**。
4. 路由會跳到`/group`，點選項目為城市大學的**垃圾桶按鈕** ( 刪除 )。
5. 跳出確定燈箱，點選確定，群組的**城市大學**就成功刪除了。
6. 點選上方選單的**LIST**，跳到路由`/list`，此節點列表內隸屬城市大學的都已經被刪除了。 -->

---

### 案例 E. 刪除階層
刪除匯入的群組——城市大學，裡面的使用者階層。<br />
![remove-floor](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/05-remove-floor.jpg)

---

### 案例 F. 刪除節點 ( 內部 + 外部 )
#### 1. 編輯介面刪除
在編輯群組介面，刪除匯入的群組——城市大學，裡面的教學樓節點。<br />
![remove-node-inner](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/06-1-remove-node-inner.jpg)

#### 2. 節點列表刪除
在節點列表介面，刪除匯入的群組——城市大學，裡面的教學樓節點。<br />
![remove-node-outer](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/06-2-remove-node-outer.jpg)

---

### 案例 G. 刪除連線
刪除匯入的群組——城市大學，裡面的使用者 > 教學樓 > 教學樓中繼的連線。<br />
![delete-link](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/07-delete-link.jpg)

---

### 案例 H. 修改群組名稱
刪除匯入的群組——城市大學，名稱改成「社會大學」。<br />
![edit-group-name](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/08-edit-group-name.jpg)
<!-- ... -->

---

### 案例 I. 修改階層名稱
刪除匯入的群組——城市大學，裡面的使用者階層，名稱改成「教職員」。<br />
![edit-floor-name](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/09-edit-floor-name.jpg)

---

### 案例 J. 修改節點名稱
刪除匯入的群組——城市大學，使用者階層的教學樓，名稱改成「勤樸樓」。<br />
![edit-node-name](https://raw.githubusercontent.com/a131381568/topological-map/main/doc/flow/10-edit-node-name.jpg)