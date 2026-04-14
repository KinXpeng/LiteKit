import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Features, FileConverter, ImageCropper } from './modules';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/file-converter" element={<FileConverter />} />
      <Route path="/image-cropper" element={<ImageCropper />} />
    </Routes>
  );
};

export default AppRoutes;