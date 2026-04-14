import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home/index'
import Features from './pages/features/index'
import FileConverter from './pages/file-converter/index'
import ImageCropper from './pages/image-cropper/index'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
        {/* 使用公共Header组件 */}
        <Header />

        {/* 主内容 */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/file-converter" element={<FileConverter />} />
            <Route path="/image-cropper" element={<ImageCropper />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App