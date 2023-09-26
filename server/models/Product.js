const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: { type: [String] },
  logoUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  comments: { type: [String] },
  // refernce to user model
  addedBy: {
    type: String,
  },
}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
