import { useState, useEffect } from 'react'
import { Upload, Input } from 'antd'
import { pdfToWord, wordToPdf } from '../../utils/fileConverter'
import { isApiConfigured } from '../../api/file'
import { appConfig } from '../../configs'

const { licenseKey: configuredLicenseKey } = appConfig.fileConverter

const FileConverter = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [conversionType, setConversionType] = useState<'pdf-to-word' | 'word-to-pdf'>('pdf-to-word')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [convertedFile, setConvertedFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [licenseKey, setLicenseKey] = useState('')
  const [licenseError, setLicenseError] = useState(false)

  // 检查是否需要授权码
  const requiresLicense = !!configuredLicenseKey

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleConvert = async () => {
    if (!selectedFile) return

    // 授权码验证
    if (requiresLicense) {
      if (!licenseKey || licenseKey.trim() === '') {
        setLicenseError(true)
        setError('请输入授权码')
        return
      }
      if (licenseKey !== configuredLicenseKey) {
        setLicenseError(true)
        setError('授权码错误，请检查后重试')
        return
      }
      setLicenseError(false)
    }

    if (!isApiConfigured()) {
      setError('请先配置 CloudConvert API Key\n\n1. 访问 https://cloudconvert.com 注册账号\n2. 获取免费 API Key\n3. 在项目根目录创建 .env 文件\n4. 添加: VITE_CLOUDCONVERT_API_KEY=你的APIKey')
      return
    }

    setConverting(true)
    setError(null)
    setProgress(0)

    try {
      let result: File

      if (conversionType === 'pdf-to-word') {
        result = await pdfToWord(selectedFile, (p) => setProgress(Math.round(p)))
      } else {
        result = await wordToPdf(selectedFile, (p) => setProgress(Math.round(p)))
      }

      setConvertedFile(result)
    } catch (err: any) {
      const errorData = err.response?.data
      let message = '转换失败，请查看浏览器控制台获取详情'
      
      if (errorData?.message) {
        message = errorData.message
      } else if (err instanceof Error) {
        message = err.message
      }
      
      setError(message)
      console.error('转换错误详情:', errorData || err)
    } finally {
      setConverting(false)
      setProgress(0)
    }
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
    setLicenseKey('')
    setLicenseError(false)
    setError(null)
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background */}
      <div className="bg-pattern" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">
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

            {/* License Key Input */}
            {requiresLicense && selectedFile && !convertedFile && (
              <div className="mt-4 animate-scaleIn">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>授权码</span>
                </div>
                <Input.Password
                  size="large"
                  placeholder="请输入授权码"
                  value={licenseKey}
                  onChange={(e) => {
                    setLicenseKey(e.target.value)
                    setLicenseError(false)
                    setError(null)
                  }}
                  status={licenseError ? 'error' : undefined}
                  className="license-input"
                  style={{
                    borderRadius: '12px',
                    height: '48px',
                    backgroundColor: 'var(--bg-card)',
                    borderColor: licenseError ? '#ef4444' : 'var(--border)',
                  }}
                />
                {licenseError && error?.includes('授权码') && (
                  <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>{error}</p>
                )}
              </div>
            )}

            {/* Convert Button */}
            {selectedFile && !convertedFile && (
              <>
                <button
                  onClick={handleConvert}
                  disabled={converting || (requiresLicense && !licenseKey)}
                  className="btn-gradient w-full py-3.5 mt-5 text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    {converting ? (
                      <>
                        <div className="loading-spinner" />
                        转换中 {progress}%
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
                {/* Error Message */}
                {error && (
                  <div className="mt-3 p-3 rounded-lg text-xs" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', whiteSpace: 'pre-line' }}>
                    {error}
                  </div>
                )}
              </>
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
            文件将通过 CloudConvert 云端处理，转换完成后自动删除
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
