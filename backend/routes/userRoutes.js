import express from "express";
import {getProfile, updateProfile} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

// router.get('/profile', (req, res) => {
//
//     res.status(200).json({ message: 'Profile retrieved successfully' });
// });

export default router;