[107-2] Web Programming Final

# Group 16 - NTUEE 選課及課程評價系統

## 服務內容

電機系的預選系統及課程評價網站

## 安裝方式

從 [repo](https://github.com/jchen8tw/NTUEECourseNew) clone 下來之後

```sh
$ cd backend
$ npm install
$ npm start
$ cd ../frontend
$ npm install
$ npm run watch
```

### [Deployment](https://course.ntuee.org)

### 選課系統操作方式

    登入後，可在首頁看到已經選的課程以及還未選的課程
    可以從首頁點進去課程，修改志願序
    選課可以看到所有年級的課程
    評價可以看到其他人對課程的評價，可以發表文章或是回應
    點右上角的頭像可以修改個人資料以及登出

### NTUEE課程評價地圖使用攻略

    使用者可以在右上角的「編輯個人資料」裡面修改暱稱(或是用我們的「隨機產生按鈕」隨機生成一個)，然後瀏覽他人的文章並留言回覆。
    
    回覆頁面中點擊重新整理即可刷新評論。文章部分提供用課程名稱以及老師名稱來搜尋。除了瀏覽外，使用者也可以自己發表評論。「載入模板」按鍵可以load出ptt ntu_course版的課程評價格式，讓評價內容更有架構性。發表後，使用者亦可找到自己之前發表過的文章，進行修改或是刪除。
    
    另外，我們也有充分考慮到響應式網頁的設計，讓手機使用者可以極為方便地進行操作。

    如果發生更新後看不到網頁的狀況，屬於react router 使用client side render的問題，請到/commentlist下進行重新整理即可

## 使用與參考之框架/模組/原始碼

### 前端

| Package          | Description                                              |
| ---------------- | -------------------------------------------------------- |
| apollo-client    | client 端 access graphql                                 |
| babel            | compile 新版 ECMA-262 語法                               |
| classnames       | 將陣列/物件/字串組合成 classname                         |
| graphql          | graphql 本體                                             |
| js-file-download | 下載檔案                                                 |
| material ui      | material design 的界面                                   |
| react            | react 本體                                               |
| react-dropzone   | 透過拖曳或點擊上傳檔案                                   |
| react-redux      | react 連接 redux                                         |
| react-router-dom | client-side routing                                      |
| react-scripts    | create-react-app 的 module                               |
| react-smooth-dnd | 提供平滑的 element drag and drop                         |
| redux            | redux 本體                                               |
| webpack          | 比 create-react-script 啟動更快的 hot-module-replacement |

### 後端

| Package               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| apollo-server-express | 結合 apollo-server 與 express，在 server 加上 graphql |
| bcrypt                | 安全、簡單的 hash 密碼                                |
| express               | server 本體                                           |
| graphql               | graphql 本體                                          |
| jsonwebtoken          | jwt，用來驗證用戶身份                                 |
| mongoose              | 連接 mongoDB                                          |

## [Demo 影片連結](https://youtu.be/)

## 每位組員之貢獻 (請詳述)

### B06901048 電機二 陳昱行

    選課系統頁面前端及後端、資料格式設計

### B06901049 電機二 林泓均

    1. 管理員頁面(Admin)之前端及後端學生、課程之資料格是設計及儲存
    2. 過去電機課程地圖之評價資料建檔
    3. 整個課程評價網頁(從前端乃至 CRUD 皆是)

### B05902127 資工三 劉俊緯

    這次的專題我主要負責的部份是整個志願序確認以後，分發的相關事宜。



## 專題製作心得

### B06901048 電機二 陳昱行

### B06901049 電機二 林泓均

這次的專題我們不只使用了 webpack、redux 等新潮技術，在 API 部分更是選擇了上課教過但比較不熟悉，資料也十分有限的 GraphQL。而從學期結束前零零星星的隨意寫一些課程爬蟲的部分，結果後來發現實用度太低只好捨棄，到後來用了不到一週的時間，把電機課程地圖網站給生出來，整個過程絕非易事。而「整整」一個禮拜都在系 K，從早上連續打扣到晚上的生活，對我來說也是非常辛苦。然而，最支持著我的動力，就是想到未來一屆一屆的電機系同學可以真正的使用我的網頁的那個時候。想到自己從學期初甚麼也不會，到現在寫的網頁已經可以真實的解決現在的問題，就令人感到十分振奮!謝謝這門課讓我成長了不少，也要感謝我的組員們，在打扣和 debug 部分都給了非常多的建議!

### B05902127 資工三 劉俊緯

事實上，我並非EE的一分子，因此對於EE的選課機制不甚了解。再此之前，也不知道過往的選課機制為何，與其他系的選課機制有何不同。這就要感謝我的組員們，讓我可以快速的了解到整個選課的特別之處，包括十選二的分組課程等等。並且將其實做出來，乃至於汰換以前不太合理的志願序機制。
雖然我負責的部份與Web Programming比較有交集的是「為了銜接DB的資料，而實做各種由gql定義的interface/format的轉換」，其他地方丟就比較偏DSnP那邊的事情，但我認為我還是學習到的了不少事情：到底該怎麼tune每個年級的priority的gaussian distribution才會比較「公平」？又到底如何在整個志願序的大系統下如何分發課程？分組的話又該如何做priority分發比較適當？這些問題看似瑣碎，但其實背後都有挺深的緣由與邏輯。在這也要感謝我的組員們，如果是一個人在思考這些事情，想必是非常無趣的。因為他們的存在，整個問題才可以更深入的探討下去，讓EE的選課系統一代比一代成熟，一代比一代還要公正。