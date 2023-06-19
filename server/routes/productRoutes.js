const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { addProduct, editProduct, upvoteProduct, filterProducts, addComment, getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/add',isAuthenticated,addProduct);
router.get('/all',getAllProducts);
router.post('/edit/:id',isAuthenticated,editProduct);
router.post('/upvote/:id',upvoteProduct);
router.get('/filter',filterProducts);
router.post('/comment/:id',addComment)

module.exports = router ;