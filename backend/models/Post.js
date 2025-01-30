import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
        photo: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;