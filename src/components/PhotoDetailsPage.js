import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import './PhotoDetailsPage.css';

function PhotoDetailsPage({ photos }) {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const photo = photos.find(photo => photo.id === parseInt(id, 10));

    return (
        <div className="photo-details-container">
            <button className="back-button" onClick={() => navigate('/gallery')}>
                ← Back to Gallery
            </button>
            {photo ? (
                <div className="details-content">
                    <div className="image-card">
                        <img src={photo.photo} alt={photo.title} />
                    </div>
                    <div className="details-card">
                        <h2>{photo.title}</h2>
                        <p>{photo.description}</p>
                    </div>
                </div>
            ) : (
                <p>Photo not found</p>
            )}
        </div>
    );
}

export default PhotoDetailsPage;
