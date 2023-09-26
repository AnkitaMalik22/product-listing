const mongoose = require("mongoose");
const Product = require("../models/Product.js");


// ----------------------------------------- add a product  ------------------------------------------------

const addProduct = async (req, res, next) => {
  const { name, categories, logoUrl, link, description ,addedBy} = req.body;
  if ((!name, !categories, !logoUrl, !link, !description )) {
    return res.status(400).send({ success: false,message: "Missing required fields" });
  }
  

  const lowercaseCategories =  categories.map((category) => category.toLowerCase());
  try {
    const product = await Product.create({
      name,
      categories : lowercaseCategories,
      logoUrl,
      link,
      description,
      addedBy 
    });

    res.status(201).send({ success: true, product: product ,message:"Product added successfully" });
  } catch (error) {
  console.log(error)
    next(new Error("Something went wrong! Please try again."));
  }
};
// ----------------------------------------- get product details  ------------------------------------------------

const getProductDetails = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(new Error('Something went wrong! Please try again.'));
  }
};


//----------------------------------------- show all added products -----------------------------------------



const getAllProducts = async (req, res, next) => {
  try {

    const products = await Product.find().populate('addedBy').sort({ createdAt: -1 });

    res.json({ success: true, products: products });
  } catch (error) {

    next(new Error('Something went wrong! Please try again.'));
  }
};



// ----------------------------------------- edit a product  ------------------------------------------------

const editProduct = async (req, res, next) => {

  const  productId  = req.params.id;
  const { name, categories, logoUrl, link, description } = req.body;
  const lowercaseCategories =  categories.map((category) => category.toLowerCase());


  try {
    const product = await Product.findByIdAndUpdate(productId, {
      name,
      categories : lowercaseCategories,
      logoUrl,
      link,
      description,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product: product });
  } catch (error) {
    next(new Error("Something went wrong! Please try again."));
  }
};

// ---------------------------------------------- upvote ----------------------------------------------------

const upvoteProduct = async (req, res, next) => {
  const  productId  = req.params.id;
  const product = await Product.findOne({ _id: productId });
  try {
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.upvotes++;

    await product.save();

    res.json({ success: true, data: product ,upvotes: product.upvotes });
  } catch (error) {

    next(new Error("Something went wrong! Please try again."));
  }
};

// ----------------------------------------- filter products  ------------------------------------------------

const filterProducts = async (req, res, next) => {
  const { category } = req.query;

  try {
    let products;
    if (category.toLowerCase() === "all") {
      products = await Product.find();
    } else {
      products = await Product.find({ categories: category.toLowerCase() });
    }
    res.json({ success: true, products: products });
  } catch (error) {
    next(new Error("Something went wrong! Please try again."));
  }
};


// ----------------------------------------- add comment   ------------------------------------------------

const addComment = async (req, res, next) => {
  const productId = req.params.id;
  const { comment } = req.body;


  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.comments.push(comment);

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    next(new Error("Something went wrong! Please try again."));
  }
};



// get all categories

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('categories');
    res.status(200).json(categories);
  } catch (error) {
    next(new Error("Something went wrong! Please try again."));
  }
};




// ---------export--------------

module.exports = {
  addProduct,
  getAllProducts,
  editProduct,
  upvoteProduct,
  filterProducts,
  addComment,
  getProductDetails,
  getAllCategories,


};
