import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const addComment = async (req, res) => {
    const { postId, text } = req.body;
    const userId = req.user._id;

    if (!postId || !text) {
        return res.status(400).json({ message: 'PostId and text are required' });
    }

    try {

        const newComment = new Comment({
            postId,
            text,
            userId,
        });


        await newComment.save();


        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } },
            { new: true }
        );


        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const toggleCommentLike = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const update = comment.likes.includes(userId)
            ? { $pull: { likes: userId } }
            : { $addToSet: { likes: userId } };

        const updatedComment = await Comment.findByIdAndUpdate(commentId, update, { new: true });

        res.json({
            likes: updatedComment.likes.length,
            message: comment.likes.includes(userId) ? "Like removed" : "Like added",
        });
    } catch (error) {
        res.status(500).json({ message: "error while liking comment" });
    }
};


const getLikesForComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId).populate("likedBy", "username avatar");

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment.likedBy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const addReply = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const reply = { userId, text, likes: [], createdAt: new Date() };
        comment.replies.push(reply);
        await comment.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: "error while adding reply" });
    }
};

const getCommentsForPost = async (req, res) => {
    try {
        const { postId } = req.params;


        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }


        const comments = await Comment.find({ postId })
            .populate("userId", "username avatar")
            .populate("replies.userId", "username avatar")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { addComment, toggleCommentLike, addReply, getLikesForComment, getCommentsForPost };