import { useState } from "react";
import { $api } from "../../api/api.tsx";
import styles from "./EditProfilePage.module.css";

const EditProfilePage = ({ userProfile, onSubmit }) => {
    const [username, setUsername] = useState(userProfile?.username || "");
    const [bio, setBio] = useState(userProfile?.bio || "");
    const [avatar, setAvatar] = useState(userProfile?.avatar || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result); // Превью аватара
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {

        document.getElementById("avatarInput")?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            const formData = {};

            if (username && username !== userProfile?.username) {
                formData.username = username;
            }
            if (bio !== userProfile?.bio) {
                formData.bio = bio;
            }
            if (avatar !== userProfile?.avatar) {
                formData.avatar = avatar;
            }

            if (Object.keys(formData).length === 0) {
                console.log("Нет изменений для обновления.");
                return;
            }

            const response = await $api.put("/api/user/profile", formData);
            console.log(response.data);

            onSubmit(response.data);

        } catch (error) {
            console.error("Ошибка при обновлении профиля:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.editForm} onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>

            <div className={styles.profileImageWrapper} onClick={handleAvatarClick}>
                {/* Отображаем текущий аватар, с круглыми углами */}
                <img
                    src={avatar || userProfile?.avatar || '/default-avatar.png'}
                    alt="Avatar"
                    className={styles.avatar}
                />

                {/* Скрытый input для выбора аватара */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{display: 'none'}}
                    id="avatarInput"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                />
            </div>

            <button type="submit" className={styles.saveButton} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default EditProfilePage;