import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const addComment = async (req, res) => {
    try {
        const { postId, text } = req.body;
        const { user } = req;

        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({
            user: user._id,
            username: user.username,
            userAvatar: user.avatar,
            text,
        });

        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const likeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const { user } = req;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.likes.includes(user._id)) {
            return res.status(400).json({ message: "You have already liked this comment" });
        }

        comment.likes.push(user._id);
        await comment.save();

        res.status(200).json({ message: "Comment liked successfully", likesCount: comment.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const replyToComment = async (req, res) => {
    try {
        const { commentId, text } = req.body;
        const { user } = req;

        if (!text) {
            return res.status(400).json({ message: "Reply text is required" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const newReply = new Comment({
            user: user._id,
            username: user.username,
            userAvatar: user.avatar,
            text,
        });

        await newReply.save();

        comment.replies.push(newReply._id);
        await comment.save();

        res.status(201).json({ message: "Reply added successfully", reply: newReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { addComment, likeComment, replyToComment };