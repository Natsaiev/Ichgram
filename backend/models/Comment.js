import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Связь с пользователем
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String,
        default: "/default-avatar.png", // Фото пользователя
    },
    text: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Массив с id пользователей, которые лайкнули комментарий
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Ответы на комментарии
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;