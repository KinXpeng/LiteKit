import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home/index'
import Lab from './pages/lab/index'
import FileConverter from './pages/file-converter/index'
import ImageProcessor from './pages/image-processor/index'

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
            <Route path="/lab" element={<Lab />} />
            <Route path="/file-converter" element={<FileConverter />} />
            <Route path="/image-processor" element={<ImageProcessor />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App