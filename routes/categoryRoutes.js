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
//1.server.js => 2. categoryRoutes 3. categoryController.js => 4. authMiddleware.js 
//create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//getAll category
router.get("/get-category", categoryController);

//single category /single-category:slug
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;