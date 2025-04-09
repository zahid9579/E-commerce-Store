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

 } from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { get } from "mongoose";

router.route('/')
.get(fetchProducts)
.post(authenticate, authorizeAdmin, formidable(),addProduct)

router.route('/allproducts').get(fetchAllProducts)
// reviews
router.route('/:id/reviews').post(authenticate, authorizeAdmin, addProductReview)


router.route('/:id').get(fetchProductById)
.put(authenticate, authorizeAdmin, formidable(), updateProductDetails)

router.route('/:id')
.delete(authenticate, authorizeAdmin, formidable(), removeProduct)



export default router;
