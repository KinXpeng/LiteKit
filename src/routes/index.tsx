import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Lab, FileConverter, ImageProcessor } from './modules';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lab" element={<Lab />} />
      <Route path="/file-converter" element={<FileConverter />} />
      <Route path="/image-processor" element={<ImageProcessor />} />
    </Routes>
  );
};

export default AppRoutes;