import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


//  To Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "This Category Already exists" });
    }

    const category = await new Category({ name }).save();
    res.status(202).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//  To Update the Category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ errror: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  To delete a category

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const remove = await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json(remove);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  To list out all the categories 
const listCategory = asyncHandler (async(req, res) => {
    try{
        const all = await Category.find({});
        res.status(200).json(all)


    }catch(error){
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }

});


// To get specific category
const readCategory = asyncHandler (async(req, res) => {
    try{
        const category = await Category.findOne({_id: req.params.id})
        res.json(category) 

    }catch(error){
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }

});


export { createCategory, updateCategory, removeCategory, listCategory, readCategory };
