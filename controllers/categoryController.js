import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//server.js => categoryController.js
//create category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category Already Exisits",
            });
        }

        const category = await new categoryModel({
            name,
            slug: slugify(name), //轉成羅馬拼音
        }).save();

        res.status(201).send({
            success: true,
            message: "new category created",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category",
        });
    }
};

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category Updated Succesfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Eooro while updating category"
        })
    }
}

//get all categories
export const categoryController = async (req, res) => {

}

//single category
export const singleCategoryController = async (req, res) => {

}

//delete category
export const deleteCategoryController = async (req, res) => {

}
