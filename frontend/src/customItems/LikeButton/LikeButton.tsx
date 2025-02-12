import { useState } from "react";
import styles from "./LikeButton.module.css";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    return (
        <div className={styles.likeContainer}>
            <button
                className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
                onClick={() => setLiked(!liked)}
            >
                {liked ? "❤️" : "🤍"}
            </button>
        </div>
    );
};

export default LikeButton;