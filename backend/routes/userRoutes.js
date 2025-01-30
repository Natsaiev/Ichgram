import express from "express";
import {getProfile, updateProfile} from "../controllers/userController.js";
import {createPost, getUserPosts, updatePost, deletePost} from "../controllers/postController.js";
import {getUserByUsername} from "../controllers/searchUserController.js";

const router = express.Router();


// Роуты для работы с пользователями
router.get("/profile", getProfile);
router.put("/profile", updateProfile);


// Роуты для работы с постами
router.post("/create", createPost);
router.get("/posts", getUserPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);


// Роут для поиска пользователя
router.get("/search/:username", getUserByUsername);

// router.get('/profile', (req, res) => {
//
//     res.status(200).json({ message: 'Profile retrieved successfully' });
// });



export default router;