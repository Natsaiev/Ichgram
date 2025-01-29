import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/api";
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                setUserProfile(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке профиля:", error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!userProfile) return <div>Загрузка...</div>;

    return (
        <div className={styles.profilePage}>
            <h1>{userProfile.username}</h1>
            <img src={userProfile.avatar} alt="Avatar" className={styles.avatar} />
            <p>{userProfile.bio}</p>
            <p><strong>Followers:</strong> {userProfile.followersCount}</p>
            <p><strong>Following:</strong> {userProfile.followingCount}</p>
        </div>
    );
};

export default ProfilePage;