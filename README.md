## 功能

- [x] 登入
- [x] 登出
- [x] 註冊
- [x] 修改個人檔案
- [x] 密碼重設
- [x] 使用者檔案瀏覽
- [x] 商品列表
- [x] 使用者瀏覽單一類別商品
- [x] 使用者瀏覽某價格區間商品
- [x] 使用者瀏覽商品詳細內容，下方列出相似商品
- [x] 使用者查詢商品
- [x] 首頁預設 6 項商品，使用者可藉由 load more 功能分次瀏覽更多商品
- [x] 購物車
- [x] 使用者訂單查詢
- [x] 管理者建立商品類別
- [x] 管理者更新商品類別
- [x] 管理者取得商品類別
- [x] 管理者刪除商品類別
- [x] 管理者建立商品
- [x] 管理者更新商品
- [x] 管理者取得商品
- [x] 管理者刪除商品
- [x] 管理者瀏覽所有訂單
- [x] 管理者更新訂單處理狀態

## api 列表
## api 列表
* /register
* /login
* /forgot-password
* /user-auth
* /admin-auth
* /profile
* /users
* /orders
* /all-orders
* /order-status/:orderId
* /order-status/:orderId
* /create-category
* /update-category/:id
* /get-category
* /single-category/:slug
* /delete-category/:id
* /create-product
* /get-product
* /get-product/:slug
* /product-photo/:pid
* /delete-product/:pid
* /update-product/:pid
* /product-filters
* /product-count
* /product-list/:page
* /search/:keyword
* /related-product/:pid/:cid
* /product-category/:slug
* /braintree/payment


### 取得專案

```bash
git clone https://github.com/cyberseris/Mern-Stack-Ecommerce-App.git
(https://github.com/cyberseris/Mern-Stack-Ecommerce-App.git)
```

### 安裝套件

```bash
npm install
```

### 環境變數設定
client 端
.env 檔案
```
REACT_APP_API = http://localhost:8080/
```

server 端
.env 檔案
```
PORT = 8080
DEV_MODE = XXX
MONGO_URL = XXX
JWT_SECRET = 

```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8080/
```

## 專案技術
- React v18.2.0
- react-dom v18.2.0
- react-router-dom v6.16.0
- react-hot-toast v2.4.1
- react-helmet v6.1.0
- Vite v8.5.5
- axios v1.5.1
- antd v5.10.0
- moment v2.29.4
- bootstrap v5.1.1
- mongoose v7.6.0
- express v4.18.2
- Node.js v17.8.0
- bcrypt v5.1.1
- jsonwebtoken v9.0.2
- slugify 1.6.6
- concurrently 8.2.1
- express-formidable 1.2.0
- cors v2.8.5
- dotenv: v16.3.1
- morgan: .1.10.0
- ...

## 參考來源
- [Youtube 學習資源 - Techinfo YT](https://www.youtube.com/watch?v=A_-fn_ij59c)


## 畫面
- 登入
![](https://hackmd.io/_uploads/S1PEFOcWp.jpg)

- 註冊
![](https://hackmd.io/_uploads/BkVUFuqbp.jpg)

- 使用者檔案瀏覽
![](https://hackmd.io/_uploads/ry_dY_qZ6.jpg)

- 商品列表
![](https://hackmd.io/_uploads/HkZ5YuqWT.jpg)

- 使用者瀏覽單一類別商品
![](https://hackmd.io/_uploads/Hy4hKOcZp.jpg)

- 使用者瀏覽某價格區間商品
![](https://hackmd.io/_uploads/SyBaYu9-6.jpg)

- 使用者查詢商品
![](https://hackmd.io/_uploads/rJZD5d9Z6.jpg)

- 購物車
![](https://hackmd.io/_uploads/B1nD5uqZp.jpg)

- 使用者訂單查詢
![](https://hackmd.io/_uploads/H19dqd9-p.jpg)

![](https://hackmd.io/_uploads/HJ8Ycdc-a.jpg)

- 管理者建立商品類別
![](https://hackmd.io/_uploads/H1Ij9OqWa.jpg)

- 管理者建立商品
![](https://hackmd.io/_uploads/BJzA9uqZa.jpg)

- 管理者更新訂單處理狀態
Not Prcess => deliverd
![](https://hackmd.io/_uploads/SJk6iucbT.jpg)

![](https://hackmd.io/_uploads/BySFs_qZT.jpg)

![](https://hackmd.io/_uploads/r16Kj_qZ6.jpg)
