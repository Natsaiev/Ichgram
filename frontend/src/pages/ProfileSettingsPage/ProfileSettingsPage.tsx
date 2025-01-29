import  { useState } from "react";
import { updateUserProfile } from "../../api/api";
import styles from './ProfileSettingsPage.module.css';

const ProfileSettingsPage = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleProfileUpdate = async () => {
        try {
            const formData = {
                username,
                bio,
                avatar,
            };

            await updateUserProfile(formData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className={styles.profileSettings}>
            <h1>Settings profile</h1>
            <div>
                <label>Никнейм:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Био:</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div>
                <label>Аватар:</label>
                <input
                    type="file"
                    onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
                />
            </div>
            <button onClick={handleProfileUpdate}>Save</button>
        </div>
    );
};

export default ProfileSettingsPage;