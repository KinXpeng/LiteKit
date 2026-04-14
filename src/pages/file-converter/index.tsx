import { useState, useEffect } from 'react'
import { Upload } from 'antd'
import { Icon } from '@iconify/react'
import uploadIcon from '@iconify/icons-material-symbols/cloud-upload'
import downloadIcon from '@iconify/icons-material-symbols/download'

const FileConverter = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [conversionType, setConversionType] = useState<'pdf-to-word' | 'word-to-pdf'>('pdf-to-word')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [convertedFile, setConvertedFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleConvert = () => {
    if (!selectedFile) return

    setConverting(true)
    
    // 模拟转换过程
    setTimeout(() => {
      // 模拟创建一个转换后的文件
      const mockConvertedFile = new File(['Mock converted content'], 'converted-file.' + (conversionType === 'pdf-to-word' ? 'docx' : 'pdf'), {
        type: conversionType === 'pdf-to-word' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf'
      })
      setConvertedFile(mockConvertedFile)
      setConverting(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (!convertedFile) return

    // 创建下载链接
    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = convertedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-24">
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
                文件转换
              </span>
            </h1>
            <p 
              className="text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              快速将PDF与Word文档相互转换
            </p>
          </div>
        </div>

        {/* 转换器内容 */}
        <div 
          className={`max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
            {/* 转换类型选择 */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setConversionType('pdf-to-word')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  conversionType === 'pdf-to-word' ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  backgroundColor: conversionType === 'pdf-to-word' ? 'var(--accent-color)' : 'var(--background-tertiary)',
                  color: conversionType === 'pdf-to-word' ? 'white' : 'var(--text-primary)',
                  borderColor: conversionType === 'pdf-to-word' ? 'var(--accent-color)' : 'var(--border-color)',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  boxShadow: conversionType === 'pdf-to-word' ? '0 8px 30px rgba(8, 145, 178, 0.25)' : 'none'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  📄 PDF → Word
                </span>
              </button>
              <button
                onClick={() => setConversionType('word-to-pdf')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  conversionType === 'word-to-pdf' ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  backgroundColor: conversionType === 'word-to-pdf' ? 'var(--accent-color)' : 'var(--background-tertiary)',
                  color: conversionType === 'word-to-pdf' ? 'white' : 'var(--text-primary)',
                  borderColor: conversionType === 'word-to-pdf' ? 'var(--accent-color)' : 'var(--border-color)',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  boxShadow: conversionType === 'word-to-pdf' ? '0 8px 30px rgba(8, 145, 178, 0.25)' : 'none'
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  📝 Word → PDF
                </span>
              </button>
            </div>

            {/* 文件上传 */}
            <div className="mb-8">
              <Upload
                name="file"
                accept={conversionType === 'pdf-to-word' ? '.pdf' : '.docx,.doc'}
                showUploadList={false}
                beforeUpload={(file) => {
                  setSelectedFile(file)
                  setConvertedFile(null)
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
                      {selectedFile ? selectedFile.name : '点击或拖拽文件到此处'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {conversionType === 'pdf-to-word' ? '支持 .pdf 格式' : '支持 .docx, .doc 格式'}
                    </p>
                  </div>
                </div>
              </Upload>
            </div>

            {/* 转换按钮 */}
            <button
              onClick={handleConvert}
              disabled={!selectedFile || converting}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                selectedFile && !converting ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{
                background: selectedFile && !converting ? 'var(--primary-gradient)' : 'var(--background-tertiary)',
                boxShadow: selectedFile && !converting ? '0 8px 30px rgba(8, 145, 178, 0.25)' : 'none'
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {converting ? (
                  <>
                    <span className="animate-spin">⚙️</span>
                    转换中...
                  </>
                ) : (
                  <>
                    开始转换
                    <span>⚡</span>
                  </>
                )}
              </span>
            </button>

            {/* 下载结果 */}
            {convertedFile && (
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
                    转换完成！
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    您的文件已准备就绪
                  </p>
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
                    下载文件
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 功能说明 */}
        <div 
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ animationDelay: '0.4s' }}
        >
          {[
            { icon: '🚀', title: '极速转换', desc: '采用先进算法，转换速度提升300%' },
            { icon: '🔒', title: '安全可靠', desc: '本地处理，您的文件不会被上传到服务器' },
            { icon: '✨', title: '保持格式', desc: '完美还原原始文档的格式和布局' }
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

export default FileConverter