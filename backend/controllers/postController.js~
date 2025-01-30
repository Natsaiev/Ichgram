import Post from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
    console.log("🔹 req.user:", req.user);

    const { photo, description } = req.body;

    if (!photo) {
        return res.status(400).json({ message: "Photo is required" });
    }

    try {
        const newPost = new Post({
            photo,
            description,
            user: req.user._id, // ID пользователя
        });

        await newPost.save();
        console.log("🔹 Updating postCount for user:", req.user._id);

        // Увеличиваем количество постов у пользователя
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $inc: { postsCount: 1 } },
            { new: true });

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Получение всех постов пользователя
const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const updatePost = async (req, res) => {
    const { description } = req.body;

    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user._id });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.description = description || post.description;
        await post.save();

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user._id });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await post.deleteOne();

        // Уменьшаем количество постов у пользователя
        await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: -1 } });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { createPost, getUserPosts, updatePost, deletePost };