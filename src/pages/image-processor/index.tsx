import { useState, useEffect, useRef } from 'react'
import { Upload, InputNumber, Slider } from 'antd'
import { appConfig } from '../../configs'

type TabType = 'crop' | 'background' | 'compose' | 'compress'

const ImageProcessor = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('crop')

  // Common state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [processingSource, setProcessingSource] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const processedImgRef = useRef<{ img: HTMLImageElement | null }>({ img: null })

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
    setProcessingSource(url)
    processedImgRef.current.img = null
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
    if (!processingSource && !imageRef.current) return
    setBgColor(targetColor)
    setProcessingBg(true)

    setTimeout(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx || !canvas) return

      const img = processedImgRef.current.img || imageRef.current
      if (!img) return

      const width = img.naturalWidth || img.width
      const height = img.naturalHeight || img.height

      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = width
      tempCanvas.height = height
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return

      tempCtx.drawImage(img, 0, 0)

      const imageData = tempCtx.getImageData(0, 0, width, height)
      const data = imageData.data

      const edgeColors: number[][] = []
      const sampleSize = Math.min(20, width, height)
      for (let i = 0; i < sampleSize; i++) {
        edgeColors.push([data[i * 4], data[i * 4 + 1], data[i * 4 + 2]])
        const bottomIdx = (height - 1) * width * 4 + i * 4
        edgeColors.push([data[bottomIdx], data[bottomIdx + 1], data[bottomIdx + 2]])
        const leftIdx = i * width * 4
        edgeColors.push([data[leftIdx], data[leftIdx + 1], data[leftIdx + 2]])
        const rightIdx = i * width * 4 + (width - 1) * 4
        edgeColors.push([data[rightIdx], data[rightIdx + 1], data[rightIdx + 2]])
      }

      const avgBg = [0, 0, 0]
      edgeColors.forEach(c => {
        avgBg[0] += c[0]
        avgBg[1] += c[1]
        avgBg[2] += c[2]
      })
      avgBg[0] = Math.round(avgBg[0] / edgeColors.length)
      avgBg[1] = Math.round(avgBg[1] / edgeColors.length)
      avgBg[2] = Math.round(avgBg[2] / edgeColors.length)

      const tolerance = 50

      const alphaCanvas = document.createElement('canvas')
      alphaCanvas.width = width
      alphaCanvas.height = height
      const alphaCtx = alphaCanvas.getContext('2d')
      if (!alphaCtx) return

      const alphaImageData = alphaCtx.createImageData(width, height)
      const alphaData = alphaImageData.data

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          const diff = Math.abs(r - avgBg[0]) + Math.abs(g - avgBg[1]) + Math.abs(b - avgBg[2])
          let alpha = 255
          if (diff < tolerance) {
            alpha = 0
          } else if (diff < tolerance * 2) {
            alpha = Math.round(((diff - tolerance) / tolerance) * 255)
          }
          alphaData[idx] = r
          alphaData[idx + 1] = g
          alphaData[idx + 2] = b
          alphaData[idx + 3] = alpha
        }
      }

      alphaCtx.putImageData(alphaImageData, 0, 0)

      canvas.width = width
      canvas.height = height

      if (targetColor === 'gradient-blue') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#4a90d9')
        gradient.addColorStop(1, '#357abd')
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = targetColor
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(alphaCanvas, 0, 0)

      const resultUrl = canvas.toDataURL('image/png')
      setProcessedImage(resultUrl)

      const newImg = new Image()
      newImg.onload = () => {
        processedImgRef.current.img = newImg
        setProcessingSource(resultUrl)
        setProcessingBg(false)
      }
      newImg.src = resultUrl
    }, 100)
  }

  // Compose ID photos
  const handleCompose = () => {
    if (!imageRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imageRef.current
    if (!ctx || !img) return

    const photoW = 295
    const photoH = 413
    const cols = 3
    const rows = 2
    const margin = 30

    canvas.width = cols * photoW + (cols + 1) * margin
    canvas.height = rows * photoH + (rows + 1) * margin

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

  const tabs = [
    {
      key: 'crop' as TabType, label: '图片裁剪',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v14M3 7h14M7 21H3v-4M21 3v4h-4" />
      </svg>,
      color: '#3b82f6',
    },
    {
      key: 'background' as TabType, label: '证件换底',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>,
      color: '#8b5cf6',
    },
    {
      key: 'compose' as TabType, label: '证件排版',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>,
      color: '#10b981',
    },
    {
      key: 'compress' as TabType, label: '图片压缩',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>,
      color: '#f59e0b',
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12">
        {/* Page Title */}
        <div className={`text-center mb-7 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
            图片处理
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            一站式图片处理工具，保护隐私，处理速度快
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`mb-5 ${isLoaded ? 'animate-slideUp delay-50' : 'opacity-0'}`}>
          <div className="flex gap-1.5 p-1.5 rounded-2xl flex-wrap" style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(12px)',
          }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as TabType)
                  setProcessedImage(null)
                  if (tab.key === 'background') {
                    setProcessingSource(imageUrl)
                  }
                }}
                className={`flex-1 min-w-[72px] py-2.5 px-2 rounded-xl text-xs font-medium transition-all duration-250
                  ${activeTab === tab.key ? '' : 'hover:bg-[var(--bg-hover)]'}
                `}
                style={activeTab === tab.key ? {
                  backgroundColor: tab.color,
                  color: '#fff',
                  boxShadow: `0 4px 14px ${tab.color}40`,
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
          <div className="card p-5 md:p-6">
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
                    className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
              <div className="mt-5">
                {/* Crop Tab */}
                {activeTab === 'crop' && (
                  <div className="animate-scaleIn">
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                      {presetSizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size.name)}
                          className={`py-3 px-2 rounded-xl text-center transition-all duration-250
                            ${selectedSize === size.name ? '' : 'hover:bg-[var(--bg-hover)]'}
                          `}
                          style={selectedSize === size.name ? {
                            background: 'var(--gradient-primary)',
                            color: '#fff',
                            boxShadow: '0 4px 14px var(--accent-glow)',
                          } : {
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                          }}
                        >
                          <div className="text-xs font-semibold">{size.name}</div>
                          <div className="text-[10px] opacity-70 mt-0.5">{size.width}x{size.height}</div>
                        </button>
                      ))}
                    </div>

                    {selectedSize === 'custom' && (
                      <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div>
                          <label className="text-xs mb-1.5 block font-medium" style={{ color: 'var(--text)' }}>宽度</label>
                          <InputNumber className="w-full" value={customWidth ? parseInt(customWidth) : undefined}
                            onChange={(v) => setCustomWidth(v?.toString() || '')} min={1} />
                        </div>
                        <div>
                          <label className="text-xs mb-1.5 block font-medium" style={{ color: 'var(--text)' }}>高度</label>
                          <InputNumber className="w-full" value={customHeight ? parseInt(customHeight) : undefined}
                            onChange={(v) => setCustomHeight(v?.toString() || '')} min={1} />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleCrop}
                      disabled={cropping || (selectedSize === 'custom' && (!customWidth || !customHeight))}
                      className="btn-gradient w-full py-3 text-sm rounded-xl"
                    >
                      {cropping ? '处理中...' : '开始裁剪'}
                    </button>
                  </div>
                )}

                {/* Background Change Tab */}
                {activeTab === 'background' && (
                  <div className="animate-scaleIn">
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      选择证件照背景颜色（建议使用纯色背景原图）
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 mb-4">
                      {bgColors.map((bg) => (
                        <button
                          key={bg.name}
                          onClick={() => handleChangeBackground(bg.color)}
                          disabled={processingBg}
                          className={`py-3 px-2 rounded-xl text-center text-xs font-medium transition-all duration-250
                            ${bgColor === bg.color ? 'ring-2 ring-offset-2' : 'hover:scale-105'}
                          `}
                          style={{
                            backgroundColor: bg.color === 'gradient-blue' ? '#4a90d9' : bg.color,
                            border: '1px solid var(--border)',
                            color: ['#FFFFFF', 'gradient-blue', '#a8dadc'].includes(bg.color) ? '#333' : '#fff',
                            ...(bgColor === bg.color ? { ringColor: 'var(--accent)' } : {}),
                          }}
                        >
                          {bg.name}
                        </button>
                      ))}
                    </div>
                    {processingBg && (
                      <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <div className="loading-spinner" style={{ width: '16px', height: '16px' }} />
                        处理中...
                      </div>
                    )}
                  </div>
                )}

                {/* Compose Tab */}
                {activeTab === 'compose' && (
                  <div className="animate-scaleIn">
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      将证件照排版为标准 6 寸照（1寸 x 6张，A4 排版）
                    </p>
                    <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <label className="text-xs mb-2 block font-medium" style={{ color: 'var(--text)' }}>
                        选择照片数量：{composeCount} 张
                      </label>
                      <Slider min={1} max={6} value={composeCount} onChange={setComposeCount}
                        marks={{ 1: '1', 2: '2', 4: '4', 6: '6' }} />
                    </div>
                    <button onClick={handleCompose} className="btn-gradient w-full py-3 text-sm rounded-xl">
                      生成排版照
                    </button>
                  </div>
                )}

                {/* Compress Tab */}
                {activeTab === 'compress' && (
                  <div className="animate-scaleIn">
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                      压缩图片文件大小，保持合理画质
                    </p>
                    <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <label className="text-xs mb-2 block font-medium" style={{ color: 'var(--text)' }}>
                        图片质量：{quality}%
                      </label>
                      <Slider min={10} max={100} value={quality} onChange={setQuality}
                        marks={{ 30: '低', 60: '中', 80: '高', 100: '原图' }} />
                    </div>
                    <button
                      onClick={handleCompress}
                      disabled={compressing}
                      className="btn-gradient w-full py-3 text-sm rounded-xl"
                    >
                      {compressing ? '压缩中...' : '压缩图片'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Image Preview */}
            {imageUrl && !processedImage && (
              <div className="mt-5 p-3 rounded-xl flex justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <img
                  ref={imageRef}
                  src={processingSource || imageUrl}
                  alt="预览"
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: '320px', objectFit: 'contain' }}
                />
              </div>
            )}

            {/* Processed Result */}
            {processedImage && (
              <div className="success-box mt-5">
                <div className="success-icon mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text)' }}>处理完成</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>您的图片已准备就绪</p>
                <div className="mb-4 flex justify-center">
                  <img
                    src={processedImage}
                    alt="处理结果"
                    className="max-w-full h-auto rounded-xl"
                    style={{ maxHeight: '320px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                  />
                </div>
                <button onClick={handleDownload} className="btn-gradient w-full py-3 text-sm rounded-xl">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载图片
                  </span>
                </button>
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Tip */}
        <div className={`mt-5 text-center ${isLoaded ? 'animate-slideUp delay-150' : 'opacity-0'}`}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            所有处理在本地完成，保护您的隐私安全
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {appConfig.copyright}
        </p>
      </footer>
    </div>
  )
}

export default ImageProcessor
