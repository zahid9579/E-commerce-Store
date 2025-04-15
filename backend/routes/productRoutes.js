import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//  Controllers
import { 
    addProduct,
    fetchProducts,
    updateProductDetails,
    removeProduct,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts,

 } from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";


router.route('/')
.get(fetchProducts)
.post(authenticate, authorizeAdmin, formidable(),addProduct)

router.route('/allproducts').get(fetchAllProducts)

// reviews
router.route('/:id/reviews').post(authenticate, checkId, addProductReview)
router.get('/top', fetchTopProducts)
router.get('/new', fetchNewProducts)

router.route('/:id').get(fetchProductById)
.put(authenticate, authorizeAdmin, formidable(), updateProductDetails)

router.route('/:id')
.delete(authenticate, authorizeAdmin, formidable(), removeProduct)

router.route('/filtered-products').post(filterProducts)

export default router;
