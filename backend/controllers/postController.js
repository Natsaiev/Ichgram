import Post from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
    console.log("req.user:", req.user);

    const { photo, description } = req.body;

    if (!photo) {
        return res.status(400).json({ message: "Photo is required" });
    }

    try {
        const newPost = new Post({
            photo,
            description,
            user: req.user._id,
        });

        await newPost.save();
        console.log(" Updating postCount for user:", req.user._id);


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


const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id })
            .populate("user", "username avatar")
            .sort({ createdAt: -1 });

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


        await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: -1 } });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user.id;


        const user = await User.findById(userId).populate("following");

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }


        const followingIds = user.following.map(followedUser => followedUser._id);


        const posts = await Post.find({ user: { $in: followingIds } })
            .populate("user", "username avatar")
            .sort({ createdAt: -1 })

        res.status(200).json(posts);
    } catch (error) {
        console.error("Ошибка получения постов ленты:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};



export { createPost, getUserPosts, updatePost, deletePost, getFeedPosts };

