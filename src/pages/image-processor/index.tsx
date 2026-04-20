import { useState, useEffect, useRef } from 'react'
import { Upload, InputNumber, Slider } from 'antd'

type TabType = 'crop' | 'background' | 'compose' | 'compress'

const ImageProcessor = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('crop')

  // Common state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Crop state
  const [selectedSize, setSelectedSize] = useState<string>('1寸')
  const [customWidth, setCustomWidth] = useState<string>('')
  const [customHeight, setCustomHeight] = useState<string>('')
  const [cropping, setCropping] = useState(false)

  // Background change state
  const [bgColor, setBgColor] = useState<string>('#FFFFFF')
  const [processingBg, setProcessingBg] = useState(false)

  // Compose state
  const [composeCount, setComposeCount] = useState<number>(6)

  // Compress state
  const [quality, setQuality] = useState<number>(80)
  const [compressing, setCompressing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const presetSizes = [
    { name: '1寸', width: 295, height: 413 },
    { name: '2寸', width: 413, height: 579 },
    { name: '身份证', width: 640, height: 480 },
    { name: '签证', width: 600, height: 600 },
    { name: '驾照', width: 600, height: 800 },
  ]

  const bgColors = [
    { name: '白底', color: '#FFFFFF' },
    { name: '蓝底', color: '#1890ff' },
    { name: '红底', color: '#e63946' },
    { name: '灰底', color: '#808080' },
    { name: '浅蓝', color: '#a8dadc' },
    { name: '渐变蓝', color: 'gradient-blue' },
  ]

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setProcessedImage(null)
  }

  // Crop functionality
  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return
    setCropping(true)

    setTimeout(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx || !canvas) return

      const img = imageRef.current
      if (!img) return

      const size = presetSizes.find((s) => s.name === selectedSize)
      const width = size ? size.width : parseInt(customWidth) || 500
      const height = size ? size.height : parseInt(customHeight) || 500

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const resultUrl = canvas.toDataURL('image/png')
      setProcessedImage(resultUrl)
      setCropping(false)
    }, 100)
  }

  // Change background color
  const handleChangeBackground = (targetColor: string) => {
    if (!imageRef.current || !canvasRef.current) return
    setBgColor(targetColor)
    setProcessingBg(true)

    setTimeout(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imageRef.current
      if (!ctx || !img || !canvas) return

      // Create temp canvas for processing
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = img.width
      tempCanvas.height = img.height
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return

      // Draw original image
      tempCtx.drawImage(img, 0, 0)

      canvas.width = img.width
      canvas.height = img.height

      if (targetColor === 'gradient-blue') {
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#4a90d9')
        gradient.addColorStop(1, '#357abd')
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = targetColor
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Simple background replacement (lighten the source color tolerance)
      const imageData = tempCtx.getImageData(0, 0, img.width, img.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Detect white/light background (simple threshold)
        const isWhiteBg = r > 200 && g > 200 && b > 200 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30

        if (isWhiteBg) {
          // Make transparent
          data[i + 3] = 0
        }
      }

      // Draw processed image on top of background
      ctx.drawImage(tempCanvas, 0, 0)
      ctx.putImageData(imageData, 0, 0)

      const resultUrl = canvas.toDataURL('image/png')
      setProcessedImage(resultUrl)
      setProcessingBg(false)
    }, 100)
  }

  // Compose ID photos
  const handleCompose = () => {
    if (!imageRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imageRef.current
    if (!ctx || !img) return

    // Standard 1寸 size: 295x413
    const photoW = 295
    const photoH = 413

    // 6 photos per A4 paper (2x3)
    const cols = 3
    const rows = 2
    const margin = 30

    canvas.width = cols * photoW + (cols + 1) * margin
    canvas.height = rows * photoH + (rows + 1) * margin

    // White background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < composeCount && i < cols * rows; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = margin + col * (photoW + margin)
      const y = margin + row * (photoH + margin)

      ctx.drawImage(img, x, y, photoW, photoH)
    }

    const resultUrl = canvas.toDataURL('image/png')
    setProcessedImage(resultUrl)
  }

  // Compress image
  const handleCompress = () => {
    if (!imageRef.current || !canvasRef.current || !selectedFile) return
    setCompressing(true)

    setTimeout(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imageRef.current
      if (!ctx || !img || !canvas) return

      // Calculate new dimensions (reduce by 50% by default)
      const maxDim = 2000
      let newWidth = img.width
      let newHeight = img.height

      if (newWidth > maxDim || newHeight > maxDim) {
        const ratio = Math.min(maxDim / newWidth, maxDim / newHeight)
        newWidth = Math.round(newWidth * ratio)
        newHeight = Math.round(newHeight * ratio)
      }

      canvas.width = newWidth
      canvas.height = newHeight
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Compress to JPEG with quality
      const resultUrl = canvas.toDataURL('image/jpeg', quality / 100)
      setProcessedImage(resultUrl)
      setCompressing(false)
    }, 100)
  }

  const handleDownload = () => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.href = processedImage
    link.download = `processed-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // SVG Icons
  const CropIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v14M3 7h14M7 21H3v-4M21 3v4h-4" />
    </svg>
  )

  const BgIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  )

  const LayoutIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  )

  const CompressIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )

  const tabs = [
    { key: 'crop', label: '图片裁剪', icon: <CropIcon /> },
    { key: 'background', label: '证件换底', icon: <BgIcon /> },
    { key: 'compose', label: '证件排版', icon: <LayoutIcon /> },
    { key: 'compress', label: '图片压缩', icon: <CompressIcon /> },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background */}
      <div className="bg-pattern" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">
        {/* Page Title */}
        <div className={`text-center mb-8 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
            图片处理
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            一站式图片处理工具，保护隐私，处理速度快
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-6 ${isLoaded ? 'animate-slideUp delay-50' : 'opacity-0'}`}>
          <div className="flex gap-2 p-1.5 rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as TabType)
                  setProcessedImage(null)
                }}
                className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${activeTab === tab.key ? '' : 'hover:bg-[var(--bg-hover)]'
                  }`}
                style={activeTab === tab.key ? {
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                } : {
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="mb-1 flex justify-center">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className={`${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div className="card p-6">
            {/* Upload Zone */}
            <Upload
              name="file"
              accept="image/*"
              showUploadList={false}
              beforeUpload={(file) => {
                handleFileSelect(file)
                return false
              }}
              className="w-full"
            >
              <div className={`upload-zone ${selectedFile ? 'active' : ''}`}>
                <div className="mb-3">
                  <div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
                <p className="font-medium text-sm mb-1" style={{ color: 'var(--text)' }}>
                  {selectedFile ? selectedFile.name : '点击或拖拽图片到此处'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  支持 JPG, PNG 等常见图片格式
                </p>
              </div>
            </Upload>

            {/* Tab Content */}
            {imageUrl && (
              <div className="mt-6">
                {/* Crop Tab */}
                {activeTab === 'crop' && (
                  <>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                      {presetSizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size.name)}
                          className={`py-3 px-2 rounded-xl text-center transition-all ${selectedSize === size.name ? '' : 'hover:bg-[var(--bg-hover)]'
                            }`}
                          style={selectedSize === size.name ? {
                            backgroundColor: 'var(--accent)',
                            color: '#fff',
                          } : {
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                          }}
                        >
                          <div className="text-xs font-medium">{size.name}</div>
                          <div className="text-[10px] opacity-70">{size.width}×{size.height}</div>
                        </button>
                      ))}
                    </div>

                    {selectedSize === 'custom' && (
                      <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div>
                          <label className="text-xs mb-1 block" style={{ color: 'var(--text)' }}>宽度</label>
                          <InputNumber
                            className="w-full"
                            value={customWidth ? parseInt(customWidth) : undefined}
                            onChange={(v) => setCustomWidth(v?.toString() || '')}
                            min={1}
                          />
                        </div>
                        <div>
                          <label className="text-xs mb-1 block" style={{ color: 'var(--text)' }}>高度</label>
                          <InputNumber
                            className="w-full"
                            value={customHeight ? parseInt(customHeight) : undefined}
                            onChange={(v) => setCustomHeight(v?.toString() || '')}
                            min={1}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleCrop}
                      disabled={cropping || (selectedSize === 'custom' && (!customWidth || !customHeight))}
                      className="btn-gradient w-full py-3 text-sm"
                    >
                      {cropping ? '处理中...' : '开始裁剪'}
                    </button>
                  </>
                )}

                {/* Background Change Tab */}
                {activeTab === 'background' && (
                  <>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      选择证件照背景颜色（建议使用纯色背景原图）
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                      {bgColors.map((bg) => (
                        <button
                          key={bg.name}
                          onClick={() => handleChangeBackground(bg.color)}
                          disabled={processingBg}
                          className={`py-3 px-2 rounded-xl text-center transition-all ${bgColor === bg.color ? 'ring-2 ring-offset-2 ring-[var(--accent)]' : ''
                            }`}
                          style={{
                            backgroundColor: bg.color === 'gradient-blue' ? '#4a90d9' : bg.color,
                            border: '1px solid var(--border)',
                            color: bg.color === '#FFFFFF' || bg.color === 'gradient-blue' || bg.color === '#a8dadc' ? '#333' : '#fff',
                          }}
                        >
                          <div className="text-xs font-medium">{bg.name}</div>
                        </button>
                      ))}
                    </div>
                    {processingBg && <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>处理中...</p>}
                  </>
                )}

                {/* Compose Tab */}
                {activeTab === 'compose' && (
                  <>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      将证件照排版为标准 6 寸照（1寸 × 6张，A4 排版）
                    </p>
                    <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <label className="text-xs mb-2 block" style={{ color: 'var(--text)' }}>
                        选择照片数量：{composeCount} 张
                      </label>
                      <Slider
                        min={1}
                        max={6}
                        value={composeCount}
                        onChange={setComposeCount}
                        marks={{ 1: '1', 2: '2', 4: '4', 6: '6' }}
                      />
                    </div>

                    <button
                      onClick={handleCompose}
                      className="btn-gradient w-full py-3 text-sm"
                    >
                      生成排版照
                    </button>
                  </>
                )}

                {/* Compress Tab */}
                {activeTab === 'compress' && (
                  <>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      压缩图片文件大小，保持合理画质
                    </p>
                    <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <label className="text-xs mb-2 block" style={{ color: 'var(--text)' }}>
                        图片质量：{quality}%
                      </label>
                      <Slider
                        min={10}
                        max={100}
                        value={quality}
                        onChange={setQuality}
                        marks={{ 30: '低', 60: '中', 80: '高', 100: '原图' }}
                      />
                    </div>

                    <button
                      onClick={handleCompress}
                      disabled={compressing}
                      className="btn-gradient w-full py-3 text-sm"
                    >
                      {compressing ? '压缩中...' : '压缩图片'}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Image Preview */}
            {imageUrl && !processedImage && (
              <div className="mt-6">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="预览"
                  className="max-w-full h-auto mx-auto rounded-lg"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}

            {/* Processed Result */}
            {processedImage && (
              <div className="success-box mt-6 animate-scaleIn">
                <div className="success-icon mb-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
                  处理完成
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                  您的图片已准备就绪
                </p>
                <div className="mb-4 flex justify-center">
                  <img
                    src={processedImage}
                    alt="处理结果"
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: '300px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className="btn-gradient w-full py-3 text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载图片
                  </span>
                </button>
              </div>
            )}

            {/* Hidden Canvas */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Tips */}
        <div className={`mt-6 text-center ${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            所有处理在本地完成，保护您的隐私安全
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2026 LiteKit. 保留所有权利。
        </p>
      </footer>
    </div>
  )
}

export default ImageProcessor
