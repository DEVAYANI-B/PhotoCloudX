import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './components/UploadPage';
import GalleryPage from './components/GalleryPage';
import PhotoDetailsPage from './components/PhotoDetailsPage';


function App() {
    const [photos, setPhotos] = useState([]);

    const handleUpload = (newPhoto) => {
        setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UploadPage onUpload={handleUpload} />} />
                <Route path="/gallery" element={<GalleryPage photos={photos} />} />
                <Route path="/photo/:id" element={<PhotoDetailsPage photos={photos} />} />
            </Routes>
        </Router>
    );
}

export default App;
