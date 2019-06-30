[107-2] Web Programming Final
Group 16 - NTUEE選課系統
##### 服務內容
系上的預選系統
##### 安裝方式
從 https://github.com/bearhsiang/faceFood 連結裡下載整份檔案，在 backend/ 裡面執行
$ npm install
$ npm start
在 frontend/ 裡面執行
$ npm install
$ npm start
Deployment
https://course.ntuee.org
操作方式

    在未 Login 時，可觀看其他人的美食貼文以及收藏清單
    在第一次 Login 之前，請先 SignUp
    Login 之後，擁有屬於自己的美食日誌，可新增貼文與新增收藏
    主頁可點選不同 user 以觀看他們的美食日誌
    最上排的 SearchBar 可搜尋關鍵字

按鈕功能

    左上 FaceFood：回到主頁
    右上 Login/Profile 時：隨著是否登入有所改變，Login 為登入頁面、Profile為個人頁面
    右下的 +：新增發文，只出現在個人美食日誌或個人收藏頁面
    右下的愛心：此頁面的人的收藏名單
    右下的門：登出按鈕，只出現在個人美食日誌或個人收藏頁面
    每篇文章的小愛心：點一次收藏，點第二次取消收藏
    點擊 Read More 可以閱讀整篇文章

搜尋功能

    plaintext: 關鍵字搜尋
    :all :顯示所有用戶與貼文
    :random :隨機挑選一份貼文

其他說明
使用與參考之框架/模組/原始碼
前端

    js-cookie(紀錄用戶登入資訊)
    react-router-dom(網頁架構)
    react-bootstrap(基本網頁元件)
    semantic-ui-react (UI icon)
    react-autosuggest(search bar)
    socket.io-client(前後端連接)
    react-responsive-carousel(動態顯示相片)

後端

    babel(js 編譯器)
    crypto-js(用戶密碼加密)
    express(http server)
    mongoose(與mongodb連接)
    nodemon(協助開發)
    socket.io(前後端連接)

Demo 影片連結
https://youtu.be/Kx_SXw9Mqy4
每位組員之貢獻 (請詳述)
B05902066 資工三 蔡翔陞
後端、前端 (登入/註冊頁面與功能，search)、後端與前端溝通、ppt
B05902102 資工三 黃麗璿
UIUX、前端（users dashboard、create post的功能、post主頁, search)、po文
B05902118 資工三 陳盈如
UIUX、前端 (user主頁、收藏清單、登入頁面)、demo影片錄製＆剪輯
專題製作心得
B05902066 資工三 蔡翔陞
這次的final除了讓我更加熟悉js的語法，也加強了套件的使用以及如何搜尋想要的套件的能力。由於我們需要做前後端的溝通，同時又要保持使用流暢、動態顯示與效能，很多非同步的邏輯錯誤都會跑出來，在設計上得要更小心，不然每次都有一堆warning跳出來。前端的部份感謝其他兩位組員的美術天分，介面美的嫑嫑的！！
B05902102 資工三 黃麗璿
我覺得自己可以學很多東西，可以跟別人討論， 真好玩！我本來不太懂怎麼用socket ， 然後這次final project有用到讓我更多了解怎麼用它了。
B05902118 資工三 陳盈如
一開始想修這門課主要是因為對UIUX、網頁有興趣，所以不意外final project是負責前端的部分，做的過程中一邊實作整學期的課程內容React、Router，即便是沒有負責到的部分，遇到問題時仍是大家一起討論找出解決辦法，有時也需要自己找尋現有的資源加以利用，總之，呵呵，獲益良多！

