import { useState, useEffect, useRef } from 'react'
import { Upload, InputNumber } from 'antd'
import { Icon } from '@iconify/react'
import uploadIcon from '@iconify/icons-material-symbols/cloud-upload'
import downloadIcon from '@iconify/icons-material-symbols/download'

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
    setIsLoaded(true)
  }, [])

  const presetSizes = [
    { name: '1寸', width: 295, height: 413, icon: '📇' },
    { name: '2寸', width: 413, height: 579, icon: '📋' },
    { name: '身份证', width: 640, height: 480, icon: '🪪' },
    { name: '正方形', width: 500, height: 500, icon: '⬜' }
  ]

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return

    setCropping(true)

    // 模拟裁剪过程
    setTimeout(() => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx || !canvas) return

      const img = imageRef.current
      if (!img) return

      const size = presetSizes.find(s => s.name === selectedSize)
      const width = size ? size.width : parseInt(customWidth) || 500
      const height = size ? size.height : parseInt(customHeight) || 500

      canvas.width = width
      canvas.height = height

      // 简单的居中裁剪
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

      // 转换为DataURL
      const croppedUrl = canvas.toDataURL('image/png')
      setCroppedImage(croppedUrl)
      setCropping(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (!croppedImage) return

    // 创建下载链接
    const link = document.createElement('a')
    link.href = croppedImage
    link.download = 'cropped-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* 背景效果 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 动态网格 */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-color) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* 渐变光晕 */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'linear-gradient(135deg, #0891b2, #5b21b6)', opacity: 0.12 }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', opacity: 0.1, animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-24">
        {/* 头部 */}
        <div 
          className={`mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <h1 
              className="font-bold mb-4"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: '1.1'
              }}
            >
              <span style={{ 
                background: 'var(--primary-gradient)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text'
              }}>
                图片裁剪
              </span>
            </h1>
            <p 
              className="text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              支持多种预设尺寸，轻松裁剪证件照
            </p>
          </div>
        </div>

        {/* 裁剪器内容 */}
        <div 
          className={`max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div 
            className="p-8 md:p-12 rounded-3xl border-2 overflow-hidden"
            style={{ 
              backgroundColor: 'var(--background-card)',
              borderColor: 'var(--border-color)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* 文件上传 */}
            <div className="mb-8">
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
                <div 
                  className="border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 hover:scale-102 hover:border-cyan-500 group"
                  style={{ 
                    borderColor: selectedFile ? 'var(--accent-color)' : 'var(--border-color)',
                    backgroundColor: 'var(--background-tertiary)'
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'var(--primary-gradient)' }}
                    >
                      <Icon icon={uploadIcon} className="text-4xl text-white" />
                    </div>
                    <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {selectedFile ? selectedFile.name : '点击或拖拽图片到此处'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      支持 JPG, PNG 等常见图片格式
                    </p>
                  </div>
                </div>
              </Upload>
            </div>

            {/* 尺寸选择 */}
            <div className="mb-10">
              <h3 
                className="font-bold mb-8"
                style={{ 
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)'
                }}
              >
                选择尺寸
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {presetSizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedSize === size.name ? 'scale-105' : ''
                    }`}
                    style={{
                      backgroundColor: selectedSize === size.name ? 'var(--background-tertiary)' : 'var(--background-tertiary)',
                      borderColor: selectedSize === size.name ? 'var(--accent-color)' : 'var(--border-color)',
                      borderWidth: selectedSize === size.name ? '2px' : '1px',
                      color: selectedSize === size.name ? 'var(--accent-color)' : 'var(--text-primary)',
                      boxShadow: selectedSize === size.name ? '0 0 20px rgba(8, 145, 178, 0.2)' : 'none'
                    }}
                  >
                    <div className="text-3xl mb-2">{size.icon}</div>
                    <div className="font-semibold mb-1">{size.name}</div>
                    <div className="text-xs opacity-60">
                      {size.width} × {size.height}
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setSelectedSize('自定义')}
                className={`w-full py-4 px-6 rounded-xl border-2 font-semibold transition-all duration-300 ${
                  selectedSize === '自定义' ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  backgroundColor: 'var(--background-tertiary)',
                  borderColor: selectedSize === '自定义' ? 'var(--accent-color)' : 'var(--border-color)',
                  borderWidth: selectedSize === '自定义' ? '2px' : '1px',
                  color: selectedSize === '自定义' ? 'var(--accent-color)' : 'var(--text-primary)',
                  boxShadow: selectedSize === '自定义' ? '0 0 20px rgba(8, 145, 178, 0.2)' : 'none'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  🎨 自定义尺寸
                </span>
              </button>

              {/* 自定义尺寸输入 */}
              {selectedSize === '自定义' && (
                <div 
                  className="mt-6 p-6 rounded-2xl border-2 animate-fadeIn"
                  style={{ 
                    backgroundColor: 'var(--background-tertiary)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        宽度 (px)
                      </label>
                      <InputNumber
                        className="w-full"
                        size="large"
                        placeholder="宽度"
                        value={customWidth ? parseInt(customWidth) : undefined}
                        onChange={(value) => setCustomWidth(value?.toString() || '')}
                        min={1}
                        style={{ 
                          backgroundColor: 'var(--background-secondary)',
                          borderColor: 'var(--border-color)'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        高度 (px)
                      </label>
                      <InputNumber
                        className="w-full"
                        size="large"
                        placeholder="高度"
                        value={customHeight ? parseInt(customHeight) : undefined}
                        onChange={(value) => setCustomHeight(value?.toString() || '')}
                        min={1}
                        style={{ 
                          backgroundColor: 'var(--background-secondary)',
                          borderColor: 'var(--border-color)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 图片预览 */}
            {imageUrl && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  图片预览
                </h3>
                <div 
                  className="rounded-2xl p-6 mb-6"
                  style={{ 
                    backgroundColor: 'var(--background-tertiary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="预览"
                    className="max-w-full h-auto mx-auto rounded-lg"
                  />
                </div>

                {/* 裁剪按钮 */}
                <button
                  onClick={handleCrop}
                  disabled={cropping || (selectedSize === '自定义' && (!customWidth || !customHeight))}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                    selectedFile && !cropping ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{
                    background: selectedFile && !cropping ? 'var(--primary-gradient)' : 'var(--background-tertiary)',
                    boxShadow: selectedFile && !cropping ? '0 8px 30px rgba(8, 145, 178, 0.25)' : 'none'
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {cropping ? (
                      <>
                        <span className="animate-spin">⚙️</span>
                        裁剪中...
                      </>
                    ) : (
                      <>
                        ✂️ 开始裁剪
                        <span>⚡</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}

            {/* 裁剪结果 */}
            {croppedImage && (
              <div 
                className="mt-8 p-8 rounded-2xl border-2 animate-fadeIn"
                style={{ 
                  backgroundColor: 'var(--background-tertiary)',
                  borderColor: 'var(--accent-color)'
                }}
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">✨</div>
                  <p className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    裁剪完成！
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    您的图片已准备就绪
                  </p>
                </div>
                <div className="mb-6 flex justify-center">
                  <img src={croppedImage} alt="裁剪结果" className="max-w-full h-auto rounded-lg shadow-lg" />
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'var(--primary-gradient)',
                    boxShadow: '0 8px 30px rgba(8, 145, 178, 0.25)'
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon={downloadIcon} />
                    下载图片
                  </span>
                </button>
              </div>
            )}

            {/* 隐藏的canvas用于裁剪 */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        </div>

        {/* 功能说明 */}
        <div 
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ animationDelay: '0.4s' }}
        >
          {[
            { icon: '📐', title: '精确尺寸', desc: '支持多种标准证件照尺寸' },
            { icon: '🎯', title: '智能裁剪', desc: '自动居中，保持最佳比例' },
            { icon: '📥', title: '即时下载', desc: '一键下载，无需等待' }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--background-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 */}
      <div className="relative z-10 py-8 px-8 text-center">
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
          © 2026 LiteKit. 保留所有权利。
        </p>
      </div>
    </div>
  )
}

export default ImageCropper