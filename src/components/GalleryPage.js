import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './GalleryPage.css';

function GalleryPage({ photos }) {
    return (
        <div className="container">
            <h1>Photo Gallery</h1>
            <Link to="/" className="back-button">← Back to Upload</Link>
            <div className="photo-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-card">
                        <Link to={`/photo/${photo.id}`}>
                            <img src={photo.photo} alt={photo.title} />
                            <h2>{photo.title}</h2>
                        </Link>
                        <p>{photo.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GalleryPage;
