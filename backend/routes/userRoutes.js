import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers, getUserProfile, updateUserProfile, deleteUserById, getUserById, updateUserById} from "../controllers/userController.js";


import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

// User Site Route
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(authenticate, getUserProfile).put(authenticate, updateUserProfile);


// Admin site Route😎
router.route('/:id')
.delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
.put(authenticate, authorizeAdmin, updateUserById)


export default router;