import express from 'express'
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable"; //檔案處理專家
import {
    /* brainTreePaymentController,
    brainTreeTokenController, */
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    /* productCategoryController, */
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    /* relatedProductController,
    searchProductController, */
    updateProductController,
} from "../controllers/productController.js";


//router object
const router = express.Router();
//routing
//1.server.js => 2. productRoutes 3. productController.js => 4. authMiddleware.js
//create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/single-product/:slug", getSingleProductController);

//update product
router.put("/update-product/:id", requireSignIn, isAdmin, formidable(), updateProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.post("/product-count", productCountController);

//product per page
router.post("/product-list/:page", productListController);

//search product
/* router.post("/search/:keyword", searchProductController); */

//similar product
/* router.post("/related-product/:pid/:cid", relatedProductController); */

//category wise product
/* router.post("/product-category/:slug", productCategoryController); */

//payments routes
//token
/* router.post("/braintree/token", brainTreeTokenController); */

//payments
/* router.post("/braintree/payment", requireSignIn, brainTreePaymentController); */

export default router;