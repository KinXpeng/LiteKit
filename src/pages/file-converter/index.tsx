import { useState, useEffect } from 'react'
import { Upload } from 'antd'

const FileConverter = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [conversionType, setConversionType] = useState<'pdf-to-word' | 'word-to-pdf'>('pdf-to-word')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [convertedFile, setConvertedFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleConvert = () => {
    if (!selectedFile) return

    setConverting(true)

    setTimeout(() => {
      const mockConvertedFile = new File(
        ['Mock converted content'],
        'converted-file.' + (conversionType === 'pdf-to-word' ? 'docx' : 'pdf'),
        {
          type: conversionType === 'pdf-to-word'
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : 'application/pdf',
        }
      )
      setConvertedFile(mockConvertedFile)
      setConverting(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = convertedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setConvertedFile(null)
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--text)' }}>使用提示</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>上传文件 → 选择格式 → 转换 → 下载</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className={`${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div className="card p-8">
            {/* Type Toggle */}
            <div className="toggle-group w-full mb-6">
              <button
                onClick={() => {
                  setConversionType('pdf-to-word')
                  handleReset()
                }}
                className={`toggle-item flex-1 ${conversionType === 'pdf-to-word' ? 'active' : ''}`}
              >
                PDF → Word
              </button>
              <button
                onClick={() => {
                  setConversionType('word-to-pdf')
                  handleReset()
                }}
                className={`toggle-item flex-1 ${conversionType === 'word-to-pdf' ? 'active' : ''}`}
              >
                Word → PDF
              </button>
            </div>

            {/* Upload Zone */}
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
                  {selectedFile ? selectedFile.name : '点击或拖拽文件到此处'}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {conversionType === 'pdf-to-word'
                    ? '支持 .pdf 格式'
                    : '支持 .docx, .doc 格式'}
                </p>
              </div>
            </Upload>

            {/* Convert Button */}
            {selectedFile && !convertedFile && (
              <button
                onClick={handleConvert}
                disabled={converting}
                className="btn-gradient w-full py-3.5 mt-5 text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  {converting ? (
                    <>
                      <div className="loading-spinner" />
                      转换中...
                    </>
                  ) : (
                    <>
                      开始转换
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            )}

            {/* Success Result */}
            {convertedFile && (
              <div className="success-box mt-5 animate-scaleIn">
                <div className="success-icon mb-3">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
                  转换完成
                </h3>
                <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
                  您的文件已准备就绪
                </p>
                <button
                  onClick={handleDownload}
                  className="btn-gradient w-full py-3 text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载文件
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className={`mt-6 text-center ${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            所有转换在本地完成，保护您的隐私安全
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

export default FileConverter
