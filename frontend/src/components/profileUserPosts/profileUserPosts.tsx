import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./profileUserPosts.module.css";
import LikeButton from "../../customItems/LikeButton/LikeButton.tsx";

const UserPosts = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalPost, setModalPost] = useState<any | null>(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<any[]>([]);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState<string>("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/user/posts", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setPosts(response.data);
        } catch (err) {
            setError("Ошибка при загрузке постов");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (modalPost) {
            fetchComments(modalPost._id);
        }
    }, [modalPost]);

    const fetchComments = async (postId: string) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/comments/${postId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setComments(response.data);
        } catch (err) {
            console.error("Ошибка при загрузке комментариев", err);
        }
    };

    const openModal = (post: any) => {
        setModalPost(post);
    };

    const closeModal = () => {
        setModalPost(null);
        setComment("");
        setComments([]);
    };

    const handleAddComment = async () => {
        if (!modalPost || !comment.trim()) return;
        try {
            const response = await axios.post("http://localhost:4000/api/user/comments", {
                postId: modalPost._id,
                text: comment
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });


            fetchComments(modalPost._id);
            setComment("");
        } catch (err) {
            console.error("Ошибка при добавлении комментария", err);
        }
    };

    const handleLike = async (commentId: string) => {
        try {

            await axios.put(
                `http://localhost:4000/api/user/comments/${commentId}/like`,
                {},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );


            const likesResponse = await axios.get(
                `http://localhost:4000/api/user/comments/${commentId}/likes`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            const updatedLikes = likesResponse.data;


            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId ? { ...comment, likes: updatedLikes } : comment
                )
            );
        } catch (err) {
            console.error("Ошибка при лайке", err);
        }
    };

    const toggleReplyInput = (commentId: string) => {
        setReplyingTo(replyingTo === commentId ? null : commentId);
    };

    const handleAddReply = async (commentId: string) => {
        if (!replyText.trim()) return;

        try {
            const response = await axios.post(
                `http://localhost:4000/api/user/comments/${commentId}/replies`,
                { text: replyText },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );


            const updatedComment = await axios.get(`http://localhost:4000/api/user/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setComments(comments.map(comment =>
                comment._id === commentId ? updatedComment.data : comment
            ));

            setReplyText("");
            setReplyingTo(null);
        } catch (err) {
            console.error("Ошибка при добавлении ответа", err);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className={styles.posts}>
                {posts.length === 0 ? (
                    <div>Нет постов</div>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className={styles.post} onClick={() => openModal(post)}>
                            <img src={post.photo} alt="Post" />
                        </div>
                    ))
                )}
            </div>
            {modalPost && (
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={closeModal}>&times;</button>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalImage}>
                            <img src={modalPost.photo} alt="Modal Post" />
                        </div>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <img src={modalPost.user?.avatar || "/default-avatar.jpg"} alt="Avatar"
                                     className={styles.userAvatar}/>
                                <span className={styles.userName}>{modalPost.user?.username || "Unknown"}</span>
                            </div>
                            <div className={styles.modalDescriptionContainer}>
                                <img src={modalPost.user?.avatar || "/default-avatar.jpg"} alt="Avatar"
                                     className={styles.userAvatarDescription}/>
                                <span
                                    className={styles.userNameDescription}>{modalPost.user?.username || "Unknown"}</span>
                                <p className={styles.modalDescription}>{modalPost.description}</p>
                            </div>
                            <div className={styles.commentsList}>
                                {comments.length === 0 ? (
                                    <p>Комментариев пока нет</p>
                                ) : (
                                    comments.map((comment) => (
                                        <div key={comment._id} className={styles.commentContainer}>

                                            <div className={styles.comment}>
                                                <div className={styles.profileComment}>
                                                <img src={comment.userId?.avatar || "/default-avatar.jpg"} alt="Avatar"
                                                     className={styles.commentAvatar}/>
                                                <span className={styles.commentContent}>
                                                    <b>{comment.userId?.username || "Unknown"}:</b> {comment.text}
                                                </span>
                                                </div>

                                                <div className={styles.commentActions}>
                                                    <button onClick={() => handleLike(comment._id)}>
                                                            👍 {comment.likes?.length || 0}
                                                    </button>
                                                    <button onClick={() => toggleReplyInput(comment._id)} >Reply
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Контейнер для ответов */}
                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className={styles.repliesContainer}>
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply._id} className={styles.reply}>
                                                            <img src={reply.userId?.avatar || "/default-avatar.jpg"}
                                                                 alt="Avatar" className={styles.commentAvatar}/>
                                                            <span className={styles.commentContent}>
                                                                <b>{reply.userId?.username || "Unknown"}:</b> {reply.text}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}


                                            {replyingTo === comment._id && (
                                                <div className={styles.replyInputContainer}>
                                                    <input
                                                        type="text"
                                                        placeholder="Ваш ответ..."
                                                        className={styles.replyInput}
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                    />
                                                    <button className={styles.replyButton} onClick={() => handleAddReply(comment._id)}>Send
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                            <LikeButton/>
                            <div className={styles.commentInputContainer}>
                                <input
                                    type="text"
                                    placeholder="Добавьте комментарий..."
                                    className={styles.commentInput}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button className={styles.commentButton} onClick={handleAddComment}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPosts;

