import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 
import './UploadPage.css';

function UploadPage({ onUpload }) {
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setError(''); 
        setSuccessMessage(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!photo) {
            setError('Please choose a photo before uploading.');
            return;
        }
        if (title.trim() === '' || description.trim() === '') {
            setError('Title and description are required.');
            return;
        }
        setError(''); 

        setUploading(true);
        try {
        
            const formData = new FormData();
            formData.append('file', photo);
            formData.append('upload_preset', 'qy53mbve');

           
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/ds4h9g1ur/image/upload`, 
                formData
            );

           
            const newPhoto = {
                id: Date.now(),
                photo: response.data.secure_url,
                title,
                description,
            };

            onUpload(newPhoto);

            setSuccessMessage('Photo uploaded successfully!');

            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);

            setUploading(false);
            setTitle('');
            setDescription('');
            setPhoto(null);
            e.target.reset(); 
        } catch (error) {
            console.error('Error uploading photo:', error);
            setUploading(false);
            setError('Failed to upload photo. Please try again.');
        }
    };

    const handleGoToGallery = () => {
        navigate('/gallery');
    };

    return (
        <div className="container">
            <h1>Upload Photo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoChange} 
                    />
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                    <textarea 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required
                    />
                </div>
                <div className="error-message-container">
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="button-card">
                    <button type="submit" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button 
                        type="button" 
                        onClick={handleGoToGallery} 
                        className="go-to-gallery-button"
                    >
                        Go to Gallery
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UploadPage;
