import { useState } from 'react';
import axios from 'axios';
import styles from './CreatePostModal.module.css';

const CreatePostModal = ({}) => {
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('description', description);

        try {
            const response = await axios.post('/api/user/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log('Post created:', response.data);

        } catch (err) {
            console.error('Error creating post:', err);
            setError('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create a Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.photoInput}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            required
                        />
                        {photo && <img src={photo} alt="preview" className="preview" />}
                    </div>
                    <div className={styles.description}>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a description..."
                required
            />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.buttonContainer}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Post'}
                        </button>
                        <button type="button" >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;