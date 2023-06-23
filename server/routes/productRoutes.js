const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const {
  addProduct,
  editProduct,
  upvoteProduct,
  filterProducts,
  addComment,
  getAllProducts,
  getProductDetails,
  getAllCategories,

} = require("../controllers/productController");
const router = express.Router();

router.post("/add", isAuthenticated, addProduct);
router.get("/all", getAllProducts);
router.put("/edit/:id", isAuthenticated, editProduct);
router.put("/upvote/:id", upvoteProduct);
router.get("/filter", filterProducts);
router.put("/comment/:id", addComment);
router.get("/details/:id", getProductDetails);
router.get("/categories", getAllCategories);


module.exports = router;
