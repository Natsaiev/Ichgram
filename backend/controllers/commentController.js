import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";

const addComment = async (req, res) => {
    const { postId, text } = req.body;
    const userId = req.user._id;  // Получаем userId из токена

    if (!postId || !text) {
        return res.status(400).json({ message: 'PostId and text are required' });
    }

    try {
        // Создаем новый комментарий
        const newComment = new Comment({
            postId,
            text,
            userId,  // userId из токена
        });

        // Сохраняем новый комментарий в коллекцию
        await newComment.save();

        // Обновляем пост, добавляем новый комментарий в массив comments
        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } },  // Добавляем ID нового комментария в массив comments
            { new: true }  // Возвращаем обновленный пост
        );

        // Возвращаем успешный ответ
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
        if (!comment) return res.status(404).json({ message: "Комментарий не найден" });

        const update = comment.likes.includes(userId)
            ? { $pull: { likes: userId } }
            : { $addToSet: { likes: userId } };

        const updatedComment = await Comment.findByIdAndUpdate(commentId, update, { new: true });

        res.json({
            likes: updatedComment.likes.length,
            message: comment.likes.includes(userId) ? "Лайк убран" : "Лайк добавлен",
        });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при лайке комментария" });
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
        if (!comment) return res.status(404).json({ message: "Комментарий не найден" });

        const reply = { userId, text, likes: [], createdAt: new Date() };
        comment.replies.push(reply);
        await comment.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при добавлении ответа" });
    }
};

const getCommentsForPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .populate("user", "username avatar")  // Заполняем информацию о пользователе
            .populate("replies");

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { addComment, toggleCommentLike, addReply, getLikesForComment, getCommentsForPost };