const Product = require("../models/Product.js");


// ----------------------------------------- add a product  ------------------------------------------------

const addProduct = async (req, res, next) => {
  const { name, category, logoUrl, link, description } = req.body;
  if ((!name, !category, !logoUrl, !link, !description)) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const product = await Product.create({
      name,
      category,
      logoUrl,
      link,
      description,
    });
    res.status(201).json({ success: true, product: product });
  } catch (error) {
    next(new Error("Something went wrong! Please try again."));
  }
};

//----------------------------------------- show all added products -----------------------------------------



const getAllProducts = async (req, res, next) => {
  try {

    const products = await Product.find();

    res.json({ success: true, products: products });
  } catch (error) {
    next(new Error('Something went wrong! Please try again.'));
  }
};



// ----------------------------------------- edit a product  ------------------------------------------------

const editProduct = async (req, res, next) => {

  const  productId  = req.params.id;
  const { name, category, logoUrl, link, description } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, {
      name,
      category,
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

    res.json({ success: true, data: product });
  } catch (error) {
    next(new Error("Something went wrong! Please try again."));
  }
};

// ----------------------------------------- filter products  ------------------------------------------------

const filterProducts = async (req, res, next) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ category });
    res.json({ success: true, data: products });
  } catch (error) {
    next(new Error("Something went wrong! Please try again."));
  }
};

// ----------------------------------------- add comment   ------------------------------------------------

const addComment = async (req, res, next) => {
  const  productId  = req.params.id;
  const { user, comment } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product.comments.push({ user, comment });

    await product.save();

    res.status(201).json({ success: true, data: product });
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
};
