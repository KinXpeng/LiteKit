import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/header'
import Home from './pages/home/index'
import Lab from './pages/lab/index'
import FileConverter from './pages/file-converter/index'
import ImageProcessor from './pages/image-processor/index'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Global animated atmosphere */}
        <div className="bg-pattern" />
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="scanline" />
        <div className="grain" />
        <Header />
        <div className="pt-16 relative" style={{ zIndex: 3 }}>
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/file-converter" element={<FileConverter />} />
              <Route path="/image-processor" element={<ImageProcessor />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
