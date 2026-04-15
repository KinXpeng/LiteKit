import { useState, useEffect, useRef } from 'react'
import { Upload, InputNumber } from 'antd'

const ImageCropper = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('1寸')
  const [customWidth, setCustomWidth] = useState<string>('')
  const [customHeight, setCustomHeight] = useState<string>('')
  const [cropping, setCropping] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const presetSizes = [
    {
      name: '1寸',
      width: 295,
      height: 413,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
    },
    {
      name: '2寸',
      width: 413,
      height: 579,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: '身份证',
      width: 640,
      height: 480,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
    },
    {
      name: '正方形',
      width: 500,
      height: 500,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9h16" />
        </svg>
      ),
    },
  ]

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

      const imgWidth = img.width
      const imgHeight = img.height
      const imgRatio = imgWidth / imgHeight
      const cropRatio = width / height

      let drawWidth, drawHeight, offsetX, offsetY

      if (imgRatio > cropRatio) {
        drawHeight = imgHeight
        drawWidth = imgHeight * cropRatio
        offsetX = (imgWidth - drawWidth) / 2
        offsetY = 0
      } else {
        drawWidth = imgWidth
        drawHeight = imgWidth / cropRatio
        offsetX = 0
        offsetY = (imgHeight - drawHeight) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight, 0, 0, width, height)

      const croppedUrl = canvas.toDataURL('image/png')
      setCroppedImage(croppedUrl)
      setCropping(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (!croppedImage) return

    const link = document.createElement('a')
    link.href = croppedImage
    link.download = 'cropped-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background */}
      <div className="bg-pattern" />
      
      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-6 pt-32 pb-20">
        {/* Quick Guide */}
        <div className={`mb-6 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--text)' }}>使用提示</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>上传图片 → 选择尺寸 → 裁剪 → 下载</p>
            </div>
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
                setSelectedFile(file)
                const url = URL.createObjectURL(file)
                setImageUrl(url)
                setCroppedImage(null)
                return false
              }}
              className="w-full"
            >
              <div className={`upload-zone ${selectedFile ? 'active' : ''}`}>
                <div className="mb-3">
                  <div 
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Size Selection */}
            <div className="mt-6">
              {/* Size Grid */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetSizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`size-card py-3 ${selectedSize === size.name ? 'active' : ''}`}
                  >
                    <div className="mb-1" style={{ color: selectedSize === size.name ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {size.icon}
                    </div>
                    <div className="font-medium text-xs mb-0.5" style={{ color: 'var(--text)' }}>
                      {size.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {size.width}×{size.height}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Size */}
              <button
                onClick={() => setSelectedSize('自定义')}
                className="w-full py-2.5 rounded-xl transition-all duration-200 text-xs font-medium"
                style={{
                  backgroundColor: selectedSize === '自定义' ? 'var(--bg-hover)' : 'var(--bg-secondary)',
                  border: `1px solid ${selectedSize === '自定义' ? 'var(--accent)' : 'var(--border)'}`,
                  color: selectedSize === '自定义' ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                自定义尺寸
              </button>

              {/* Custom Size Input */}
              {selectedSize === '自定义' && (
                <div 
                  className="mt-3 p-4 rounded-xl animate-fadeIn"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                        宽度 (px)
                      </label>
                      <InputNumber
                        className="w-full"
                        placeholder="宽度"
                        value={customWidth ? parseInt(customWidth) : undefined}
                        onChange={(value) => setCustomWidth(value?.toString() || '')}
                        min={1}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                        高度 (px)
                      </label>
                      <InputNumber
                        className="w-full"
                        placeholder="高度"
                        value={customHeight ? parseInt(customHeight) : undefined}
                        onChange={(value) => setCustomHeight(value?.toString() || '')}
                        min={1}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {imageUrl && !croppedImage && (
              <div className="mt-6">
                <div 
                  className="rounded-xl p-3 mb-4"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="预览"
                    className="max-w-full h-auto mx-auto rounded-lg"
                  />
                </div>

                {/* Crop Button */}
                <button
                  onClick={handleCrop}
                  disabled={cropping || (selectedSize === '自定义' && (!customWidth || !customHeight))}
                  className="btn-gradient w-full py-3 text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    {cropping ? (
                      <>
                        <div className="loading-spinner" />
                        裁剪中...
                      </>
                    ) : (
                      <>
                        开始裁剪
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}

            {/* Cropped Result */}
            {croppedImage && (
              <div className="success-box mt-6 animate-scaleIn">
                <div className="success-icon mb-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
                  裁剪完成
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                  您的图片已准备就绪
                </p>
                <div className="mb-4 flex justify-center">
                  <img
                    src={croppedImage}
                    alt="裁剪结果"
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxHeight: '200px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
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
            所有裁剪在本地完成，保护您的隐私安全
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

export default ImageCropper
