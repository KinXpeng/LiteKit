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
      edgeColors.forEach(c => { avgBg[0] += c[0]; avgBg[1] += c[1]; avgBg[2] += c[2] })
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
          const r = data[idx], g = data[idx + 1], b = data[idx + 2]
          const diff = Math.abs(r - avgBg[0]) + Math.abs(g - avgBg[1]) + Math.abs(b - avgBg[2])
          let alpha = 255
          if (diff < tolerance) alpha = 0
          else if (diff < tolerance * 2) alpha = Math.round(((diff - tolerance) / tolerance) * 255)
          alphaData[idx] = r; alphaData[idx + 1] = g; alphaData[idx + 2] = b; alphaData[idx + 3] = alpha
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

  const handleCompose = () => {
    if (!imageRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imageRef.current
    if (!ctx || !img) return
    const photoW = 295, photoH = 413, cols = 3, rows = 2, margin = 30
    canvas.width = cols * photoW + (cols + 1) * margin
    canvas.height = rows * photoH + (rows + 1) * margin
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < composeCount && i < cols * rows; i++) {
      const col = i % cols, row = Math.floor(i / cols)
      const x = margin + col * (photoW + margin)
      const y = margin + row * (photoH + margin)
      ctx.drawImage(img, x, y, photoW, photoH)
    }
    const resultUrl = canvas.toDataURL('image/png')
    setProcessedImage(resultUrl)
  }

  const handleCompress = () => {
    if (!imageRef.current || !canvasRef.current || !selectedFile) return
    setCompressing(true)
    setTimeout(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imageRef.current
      if (!ctx || !img || !canvas) return
      const maxDim = 2000
      let newWidth = img.width, newHeight = img.height
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
      key: 'crop' as TabType, label: '图片裁剪', en: 'Crop', num: '01',
      glow: 'var(--cyan)',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v14M3 7h14M7 21H3v-4M21 3v4h-4" />
      </svg>,
    },
    {
      key: 'background' as TabType, label: '证件换底', en: 'Background', num: '02',
      glow: 'var(--violet)',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
    },
    {
      key: 'compose' as TabType, label: '证件排版', en: 'Compose', num: '03',
      glow: 'var(--mint)',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>,
    },
    {
      key: 'compress' as TabType, label: '图片压缩', en: 'Compress', num: '04',
      glow: 'var(--pink)',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>,
    },
  ]

  const activeTabMeta = tabs.find(t => t.key === activeTab)!

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16">

        {/* ── Page header ── */}
        <div className={`mb-10 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          <div className="flex items-baseline justify-between mb-4">
            <div className="section-marker">§ 04 · Image Atelier</div>
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--mint)', boxShadow: '0 0 6px var(--mint)' }} />
              local · only
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h1 className="text-5xl sm:text-6xl font-chinese-display font-bold leading-[0.92] tracking-tight" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
              图片处理
              <span className="block gradient-text">在你的浏览器里。</span>
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              一站式图片工作台 — 裁剪、换底、排版、压缩。
              <br />
              全部在 <span style={{ color: 'var(--cyan)' }} className="font-mono">Canvas API</span> 本地完成。
            </p>
          </div>

          <div
            className="mt-6 h-px"
            style={{
              width: '140px',
              background: 'linear-gradient(90deg, var(--cyan), var(--violet))',
              boxShadow: '0 0 12px var(--accent-glow)',
            }}
          />
        </div>

        {/* ── Tabs ── */}
        <div className={`mb-6 ${isLoaded ? 'animate-slideUp delay-50' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {tabs.map(tab => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as TabType)
                    setProcessedImage(null)
                    if (tab.key === 'background') {
                      setProcessingSource(imageUrl)
                    }
                  }}
                  className="relative px-4 py-3.5 rounded-xl text-left transition-all duration-300 group overflow-hidden"
                  style={{
                    background: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${isActive ? 'var(--border-hover)' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 8px 24px -8px ${tab.glow}` : 'none',
                  }}
                >
                  {/* Active wash */}
                  {isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${tab.glow}26, transparent 70%)` }}
                    />
                  )}
                  {/* Top neon line on active */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-3 right-3 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${tab.glow}, transparent)`, boxShadow: `0 0 8px ${tab.glow}` }}
                    />
                  )}

                  <div className="relative flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive ? tab.glow + '26' : 'var(--bg-secondary)',
                        color: isActive ? tab.glow : 'var(--text-muted)',
                        boxShadow: isActive ? `0 0 12px ${tab.glow}40` : 'none',
                      }}
                    >
                      {tab.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] tracking-[0.22em] uppercase mb-0.5" style={{ color: isActive ? tab.glow : 'var(--text-muted)' }}>
                        {tab.num} · {tab.en}
                      </div>
                      <div className="text-sm font-medium font-chinese-display truncate" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: isActive ? 'var(--text)' : 'var(--text-secondary)' }}>
                        {tab.label}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Main card ── */}
        <div className={`${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div
            className="relative rounded-2xl overflow-hidden p-6 md:p-8"
            style={{
              backgroundColor: 'var(--bg-card)',
              backdropFilter: 'blur(20px) saturate(140%)',
              WebkitBackdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Top neon line tied to active tab */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeTabMeta.glow}, var(--accent), transparent)`,
                opacity: 0.6,
              }}
            />

            {/* Upload zone */}
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
              <div className={`upload-zone group ${selectedFile ? 'active' : ''}`} style={{ padding: '44px 24px' }}>
                <div className="mb-3 inline-block relative">
                  <div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: '0 8px 24px var(--accent-glow)',
                    }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="font-display text-base font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                  {selectedFile ? selectedFile.name : 'Drop your image here'}
                </p>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  Accepts · jpg · png · webp
                </p>
              </div>
            </Upload>

            {/* Tab content */}
            {imageUrl && (
              <div className="mt-6">
                {/* CROP */}
                {activeTab === 'crop' && (
                  <div className="animate-scaleIn">
                    <div className="flex items-baseline justify-between mb-3">
                      <p className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                        ▸ 选择预设尺寸
                      </p>
                      <span className="chip">{presetSizes.length} presets</span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5">
                      {presetSizes.map((size) => {
                        const isSel = selectedSize === size.name
                        return (
                          <button
                            key={size.name}
                            onClick={() => setSelectedSize(size.name)}
                            className="relative px-2 py-4 rounded-xl text-center transition-all duration-300 group overflow-hidden"
                            style={{
                              background: isSel ? 'var(--bg-card-hover)' : 'var(--bg-secondary)',
                              border: `1px solid ${isSel ? 'var(--accent)' : 'var(--border)'}`,
                              boxShadow: isSel ? '0 0 0 3px var(--accent-glow), 0 6px 20px -6px var(--accent-glow)' : 'none',
                              color: 'var(--text)',
                            }}
                          >
                            {isSel && (
                              <div className="absolute top-0 left-1 right-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                            )}
                            <div className="text-sm font-medium font-chinese-display" style={{ fontFamily: 'AlimamaShuHeiTi-Bold' }}>{size.name}</div>
                            <div className="font-mono text-[10px] mt-1 numeric" style={{ color: isSel ? 'var(--cyan)' : 'var(--text-muted)' }}>{size.width}×{size.height}</div>
                          </button>
                        )
                      })}
                    </div>

                    {selectedSize === 'custom' && (
                      <div className="grid grid-cols-2 gap-3 mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <div>
                          <label className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2 block" style={{ color: 'var(--text-muted)' }}>· Width</label>
                          <InputNumber className="w-full" value={customWidth ? parseInt(customWidth) : undefined}
                            onChange={(v) => setCustomWidth(v?.toString() || '')} min={1} />
                        </div>
                        <div>
                          <label className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2 block" style={{ color: 'var(--text-muted)' }}>· Height</label>
                          <InputNumber className="w-full" value={customHeight ? parseInt(customHeight) : undefined}
                            onChange={(v) => setCustomHeight(v?.toString() || '')} min={1} />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleCrop}
                      disabled={cropping || (selectedSize === 'custom' && (!customWidth || !customHeight))}
                      className="btn-gradient w-full py-3.5 mt-5 text-sm inline-flex items-center justify-center gap-2.5"
                    >
                      {cropping ? (
                        <>
                          <div className="loading-spinner" style={{ borderTopColor: '#fff' }} />
                          <span className="numeric">PROCESSING</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          开始裁剪
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* BACKGROUND */}
                {activeTab === 'background' && (
                  <div className="animate-scaleIn">
                    <div className="flex items-baseline justify-between mb-3">
                      <p className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                        ▸ 选择背景颜色
                      </p>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>建议纯色原图</span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
                      {bgColors.map((bg) => (
                        <button
                          key={bg.name}
                          onClick={() => handleChangeBackground(bg.color)}
                          disabled={processingBg}
                          className="group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                          style={{
                            border: bgColor === bg.color ? '2px solid var(--accent)' : '1px solid var(--border)',
                            background: bg.color === 'gradient-blue' ? 'linear-gradient(135deg,#4a90d9,#357abd)' : bg.color,
                            boxShadow: bgColor === bg.color ? '0 0 0 3px var(--accent-glow)' : 'none',
                          }}
                        >
                          <span className="absolute bottom-2 left-2 right-2 font-mono text-[10px] tracking-[0.18em] uppercase text-center font-medium"
                            style={{ color: ['#FFFFFF', '#a8dadc'].includes(bg.color) ? '#0b0d1a' : '#fff', textShadow: ['#FFFFFF', '#a8dadc'].includes(bg.color) ? 'none' : '0 1px 2px rgba(0,0,0,0.3)' }}
                          >
                            {bg.name}
                          </span>
                          {bgColor === bg.color && (
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
                          )}
                        </button>
                      ))}
                    </div>
                    {processingBg && (
                      <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>
                        <div className="loading-spinner" style={{ width: '14px', height: '14px' }} />
                        Processing
                        <span className="animate-blink">▮</span>
                      </div>
                    )}
                  </div>
                )}

                {/* COMPOSE */}
                {activeTab === 'compose' && (
                  <div className="animate-scaleIn">
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                      ▸ 6 寸照排版 · A4
                    </p>
                    <div className="p-5 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                      <div className="flex items-baseline justify-between mb-3">
                        <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                          照片数量
                        </label>
                        <span className="font-display text-3xl font-bold numeric" style={{ background: 'linear-gradient(135deg, var(--cyan), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          {composeCount}<span className="text-sm opacity-50 ml-1" style={{ WebkitTextFillColor: 'var(--text-muted)' }}>/ 6</span>
                        </span>
                      </div>
                      <Slider min={1} max={6} value={composeCount} onChange={setComposeCount}
                        marks={{ 1: '1', 2: '2', 4: '4', 6: '6' }} />
                    </div>
                    <button onClick={handleCompose} className="btn-gradient w-full py-3.5 mt-5 text-sm inline-flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z" />
                      </svg>
                      生成排版照
                    </button>
                  </div>
                )}

                {/* COMPRESS */}
                {activeTab === 'compress' && (
                  <div className="animate-scaleIn">
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                      ▸ 压缩图片，保持画质
                    </p>
                    <div className="p-5 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                      <div className="flex items-baseline justify-between mb-3">
                        <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                          图片质量
                        </label>
                        <span className="font-display text-3xl font-bold numeric" style={{ background: 'linear-gradient(135deg, var(--violet), var(--pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                          {quality}<span className="text-sm opacity-50 ml-0.5" style={{ WebkitTextFillColor: 'var(--text-muted)' }}>%</span>
                        </span>
                      </div>
                      <Slider min={10} max={100} value={quality} onChange={setQuality}
                        marks={{ 30: '低', 60: '中', 80: '高', 100: '原图' }} />
                    </div>
                    <button
                      onClick={handleCompress}
                      disabled={compressing}
                      className="btn-gradient w-full py-3.5 mt-5 text-sm inline-flex items-center justify-center gap-2"
                    >
                      {compressing ? (
                        <>
                          <div className="loading-spinner" style={{ borderTopColor: '#fff' }} />
                          <span className="numeric">COMPRESSING</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          压缩图片
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Image preview */}
            {imageUrl && !processedImage && (
              <div className="mt-6 p-4 rounded-xl flex justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                {/* Subtle checker pattern via gradient */}
                <div className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, var(--border) 25%, transparent 25%), linear-gradient(-45deg, var(--border) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--border) 75%), linear-gradient(-45deg, transparent 75%, var(--border) 75%)',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
                  }}
                />
                <img
                  ref={imageRef}
                  src={processingSource || imageUrl}
                  alt="预览"
                  className="relative max-w-full h-auto rounded-lg"
                  style={{ maxHeight: '340px', objectFit: 'contain', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                />
              </div>
            )}

            {/* Processed result */}
            {processedImage && (
              <div className="success-box mt-6">
                <div className="success-icon">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--mint)' }}>
                  ✓ processing complete
                </p>
                <h3 className="text-2xl font-chinese-display font-bold mb-1" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                  处理完成
                </h3>
                <p className="font-mono text-[11px] mb-5" style={{ color: 'var(--text-muted)' }}>image ready</p>
                <div className="mb-6 flex justify-center">
                  <img
                    src={processedImage}
                    alt="处理结果"
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: '320px', boxShadow: '0 12px 32px rgba(0,0,0,0.2), 0 0 32px var(--accent-glow)' }}
                  />
                </div>
                <button onClick={handleDownload} className="btn-gradient px-7 py-3 text-sm inline-flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载图片
                </button>
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Footer tip */}
        <div className={`mt-6 flex items-center justify-center gap-3 ${isLoaded ? 'animate-slideUp delay-150' : 'opacity-0'}`}>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
            ▸ all processing in your browser · zero upload
          </span>
        </div>
      </div>

      <footer className="relative z-10 py-10 text-center">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
          {appConfig.copyright}
        </p>
      </footer>
    </div>
  )
}

export default ImageProcessor
