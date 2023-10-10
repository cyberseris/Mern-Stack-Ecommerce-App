import express from 'express'
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
    categoryController,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController,
} from "./../controllers/categoryController.js";

//router object
const router = express.Router();
//routing
//1.authRoute.js => 2. authController.js => 3. userModel.js => 4. authHelper.js
//create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//getAll category
router.get("/get-category", categoryController);

//single category
router.get("/single-category:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;