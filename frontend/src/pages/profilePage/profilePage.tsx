import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../api/api";
import styles from './ProfilePage.module.css';
import UserPosts from "../../components/profileUserPosts/profileUserPosts";

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);  // Состояние загрузки
    const [error, setError] = useState<string | null>(null);  // Состояние ошибки

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                setUserProfile(response.data);
                setLoading(false); // Загружено
            } catch (error) {
                console.error("Error fetching user profile:", error);
                    setError("Error fetching user profile");
                setLoading(false); // Ошибка загрузки
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.profilePage}>
            <div className={styles.header}>
            <div className={styles.imgContainer}>
                <img src={userProfile.avatar} alt="Avatar" className={styles.avatar} />
            </div>
            <div className={styles.profileInfo}>
                <div className={styles.usernameAndEdit}>
                    <h1 className={styles.username}>{userProfile.username}</h1>
                    <Link to="/edit-profile">
                        <button className={styles.editButton}>Edit Profile</button>
                    </Link>
                </div>
                <div className={styles.countContainer}>
                    <p> {userProfile.postsCount} Posts</p>
                    <p> {userProfile.followersCount} Followers</p>
                    <p> {userProfile.followingCount} Following</p>
                </div>
                <div className={styles.bioContainer}>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            </div>
            <UserPosts />
        </div>
    );
};

export default ProfilePage;