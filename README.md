# 餐廳清單
註冊登入成為會員，收集你最喜愛的餐廳，有餐廳的資料和評分，並可依關鍵字做搜尋! 也可以新增、修改、刪除餐廳資訊。

## 功能
註冊登入為會員後：
使用者可以在首頁看到所有餐廳與它們的簡單資料:<br />
*餐廳照片<br />
*餐廳名稱<br />
*餐廳分類<br />
*餐廳評分<br />
*點擊照片或i按鈕可以看到個別詳細資訊<br />
*點擊圖示筆可以修改<br />
*點擊圖示垃圾桶可以刪除<br />

使用者可以再點進去看餐廳的詳細資訊:<br />
*類別<br />
*地址<br />
*電話<br />
*描述<br />
*圖片<br />

使用者可以透過搜尋餐廳名稱來找到特定的餐廳

使用者可以透過nav bar上的sort下拉式選項，分別進行以下分類排列順序:
*餐廳名稱A-Z
*餐廳名稱Z-A
*餐廳類別
*餐廳地區


## 開發環境 <br />
Node.js: v10.15.0 <br />
Express: 4.17.1<br />
Express-handlebars: 5.1.0<br />
Visual Studio Code<br />
Mongo DB<br />
"bcryptjs": "^2.4.3"<br />
"body-parser": "^1.19.0"<br />
"connect-flash": "^0.1.1"<br />
"dotenv": "^8.2.0"<br />
"express-session": "^1.17.1"<br />
"method-override": "^3.0.0"<br />
"mongoose": "^5.10.5"<br />
"passport": "^0.4.1"<br />
"passport-facebook": "^3.0.0"<br />
"passport-local": "^1.0.0"<br />

## 安裝與執行步驟
使用 git clone 複製專案到本機端<br />
在你電腦的terminal輸入以下指令: 看到done表示成功<br />

```
git clone https://github.com/Sharon-Liu-go/dine-remote.git
```

至存放檔案路徑下，安裝npm及nodemon套件:
```
npm install
```
```
npm install -g nodemon //若電腦已安裝nodemon為全域則不用
```

開啟 
```
nodemon app.js 或 nodemon 或 npm run dev
```
顯示 `http://localhost:3000` 後複製貼上至網頁

備註: 如果要匯入種子資料
```
npm run seed
```
然後再執行開啟
```
nodemon app.js 或 nodemon dev 或 npm run dev
```


<!-- ## API Reference
restaurant API -->

















