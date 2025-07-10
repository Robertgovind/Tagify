import slugify from "slugify";
import Categories from "../models/Categories.js";
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find(); // fetches all the categories
    if (!categories)
      return res
        .status(400)
        .json({ success: false, message: "No categories found!" });
    res.status(200).json({
      success: true,
      message: "All categories fetched",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while fetching categories",
      error: error,
    });
  }
};
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const simpleName = slugify(name, { lower: true, strict: true });
    let category = await Categories.findOne({ simpleName });
    if (category)
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    category = await Categories.create({ name, simpleName });
    await category.save();
    res
      .status(201)
      .json({ success: true, message: "Category created!", data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while adding category!",
      error: error,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, simpleName } = req.body;
    const category = await Categories.findByIdAndUpdate(
      { _id: _id },
      { name, simpleName }
    );
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category not found!" });
    res
      .status(200)
      .json({ success: true, message: "Category updated!", data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while updating category!",
      error: error,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const category = await Categories.findByIdAndDelete({ _id: _id });
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category not found!" });
    res
      .status(200)
      .json({ success: true, message: "Category deleted!", data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while deleting category!",
      error: error,
    });
  }
};

export { getAllCategories, addCategory, updateCategory, deleteCategory };
