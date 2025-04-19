import express  from "express";
const router = express.Router();

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { 
    createOrder, 
    getAllOrders, 
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalsByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,

 } from "../controllers/orderController.js";


router.route('/').post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sale-by-date").get(calculateTotalsByDate);
router.route("/:id").get(authenticate, findOrderById);

// Payment Routes
router.route('/:id/pay').put(authenticate, markOrderAsPaid);
router.route("/:id/deliver").put(authenticate, authorizeAdmin, markOrderAsDelivered);









export default router;