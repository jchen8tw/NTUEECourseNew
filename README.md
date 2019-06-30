[107-2] Web Programming Final

# Group 16 - NTUEE 選課系統

## 服務內容

系上的預選系統

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

### 操作方式

    登入後，可在首頁看到已經選的課程以及還未選的課程
    可以從首頁點進去課程，修改志願序
    選課可以看到所有年級的課程
    評價可以看到其他人對課程的評價，可以發表文章或是回應
    點右上角的頭像可以修改個人資料以及登出

### 按鈕功能

### 搜尋功能

    plaintext: 關鍵字搜尋
    :all :顯示所有用戶與貼文
    :random :隨機挑選一份貼文

## 使用與參考之框架/模組/原始碼

### 前端

| Package          | Description                                              |
| ---------------- | -------------------------------------------------------- |
| apollo-client    | client 端 access graphql                                 |
| babel            | transpile 新版 ECMA-262 語法                             |
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

## [Demo 影片連結](https://youtu.be/Kx_SXw9Mqy4)

## 每位組員之貢獻 (請詳述)

### B06901048 電機二 陳昱行

### B06901049 電機二 林泓均

### B05902127 資工三 劉俊緯

## 專題製作心得

### B06901048 電機二 陳昱行

### B06901049 電機二 林泓均

這次的專題我主要有負責以下部分:

1.管理員頁面(Admin)之前端、及後端學生、課程之資料儲存

2.過去電機課程地圖之評價資料建檔

3.整個課程評價網頁(從前端乃至 CRUD 皆是)

這次的專題我們不只使用了 webpack、redux 等新潮技術，在 API 部分更是選擇了上課教過但比較不熟悉，資料也十分有限的 GraphQL。而從學期結束前零零星星的隨意寫一些課程爬蟲的部分，結果後來發現實用度太低只好捨棄，到後來用了不到一週的時間，把電機課程地圖網站給生出來，整個過程絕非易事。而「整整」一個禮拜都在系 K，從早上連續打扣到晚上的生活，對我來說也是非常辛苦。然而，最支持著我的動力，就是想到未來一屆一屆的電機系同學可以真正的使用我的網頁的那個時候。想到自己從學期初甚麼也不會，到現在寫的網頁已經可以真實的解決現在的問題，就令人感到十分振奮!謝謝這門課讓我成長了不少，也要感謝我的組員們，在打扣和 debug 部分都給了非常多的建議!

### B05902127 資工三 劉俊緯
