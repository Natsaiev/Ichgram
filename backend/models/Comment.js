import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Лайки
        replies: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                text: { type: String, required: true },
                likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;