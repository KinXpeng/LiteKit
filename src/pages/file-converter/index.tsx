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

  const requiresLicense = !!configuredLicenseKey

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleConvert = async () => {
    if (!selectedFile) return

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

  const fileSizeKB = selectedFile ? (selectedFile.size / 1024).toFixed(1) : null

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 w-full max-w-[820px] mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16">

        {/* ── Page header ── */}
        <div className={`mb-10 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          <div className="flex items-baseline justify-between mb-4">
            <div className="section-marker">§ 03 · File Converter</div>
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--mint)', boxShadow: '0 0 6px var(--mint)' }} />
              Cloud · ready
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-chinese-display font-bold leading-[0.92] tracking-tight" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
            文件转换
            <span className="block gradient-text">极速 · 安全</span>
          </h1>

          <div
            className="mt-5 h-px"
            style={{
              width: '120px',
              background: 'linear-gradient(90deg, var(--cyan), var(--violet))',
              boxShadow: '0 0 12px var(--accent-glow)',
            }}
          />

          <p className="mt-6 text-base leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            上传 → 选择格式 → 转换 → 下载。文件通过 <span className="font-mono" style={{ color: 'var(--cyan)' }}>CloudConvert</span> 云端处理，完成后立即销毁。
          </p>
        </div>

        {/* ── Terminal-style workspace ── */}
        <div className={`${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-card)',
              backdropFilter: 'blur(20px) saturate(140%)',
              WebkitBackdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Top scan-line accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), var(--accent), var(--violet), transparent)', opacity: 0.6 }} />

            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5a6e' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ffc94c' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--mint)' }} />
                <span className="ml-3 font-mono text-[11px] tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                  ~/litekit/converter — {conversionType === 'pdf-to-word' ? 'pdf→docx' : 'docx→pdf'}
                </span>
              </div>
              <span className="hidden sm:inline-flex font-mono text-[10px] tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                {selectedFile ? '● ready' : '○ idle'}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Toggle */}
              <div className="flex justify-center mb-8">
                <div className="toggle-group">
                  <button
                    onClick={() => {
                      setConversionType('pdf-to-word')
                      handleReset()
                    }}
                    className={`toggle-item text-sm ${conversionType === 'pdf-to-word' ? 'active' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      PDF → Word
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setConversionType('word-to-pdf')
                      handleReset()
                    }}
                    className={`toggle-item text-sm ${conversionType === 'word-to-pdf' ? 'active' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Word → PDF
                    </span>
                  </button>
                </div>
              </div>

              {/* Upload zone */}
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
                <div className={`upload-zone group ${selectedFile ? 'active' : ''}`} style={{ padding: '52px 24px' }}>
                  <div className="relative mb-4 inline-block">
                    <div
                      className="relative w-14 h-14 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: 'var(--gradient-primary)',
                        boxShadow: '0 8px 32px var(--accent-glow), 0 0 0 1px var(--border-hover)',
                      }}
                    >
                      {selectedFile ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
                        </svg>
                      )}
                    </div>
                    {/* Pulsing ring */}
                    {!selectedFile && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none animate-ringRipple"
                        style={{ border: '2px solid var(--accent)' }}
                      />
                    )}
                  </div>

                  <p className="font-display text-lg font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                    {selectedFile ? selectedFile.name : 'Drop your file here'}
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>
                    {selectedFile && fileSizeKB
                      ? <>SIZE · <span style={{ color: 'var(--cyan)' }}>{fileSizeKB} KB</span> · ready</>
                      : conversionType === 'pdf-to-word'
                      ? 'Accepts · .pdf — max 100 mb'
                      : 'Accepts · .docx · .doc — max 100 mb'}
                  </p>
                </div>
              </Upload>

              {/* License key */}
              {requiresLicense && selectedFile && !convertedFile && (
                <div className="mt-6 animate-scaleIn">
                  <div className="flex items-center gap-2 mb-2.5">
                    <svg className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>
                      License key
                    </span>
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
                    style={{
                      borderRadius: '10px',
                      height: '46px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: licenseError ? 'var(--error)' : 'var(--border)',
                    }}
                  />
                  {licenseError && error?.includes('授权码') && (
                    <p className="mt-2 font-mono text-xs" style={{ color: 'var(--error)' }}>✕ {error}</p>
                  )}
                </div>
              )}

              {/* Convert button */}
              {selectedFile && !convertedFile && (
                <>
                  <button
                    onClick={handleConvert}
                    disabled={converting || (requiresLicense && !licenseKey)}
                    className="btn-gradient w-full py-3.5 mt-6 text-sm inline-flex items-center justify-center gap-2.5"
                  >
                    {converting ? (
                      <>
                        <div className="loading-spinner" style={{ borderTopColor: '#fff', borderRightColor: 'rgba(255,255,255,0.5)' }} />
                        <span className="numeric">CONVERTING · {progress}%</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>开始转换</span>
                      </>
                    )}
                  </button>

                  {/* Progress bar */}
                  {converting && (
                    <div className="mt-4">
                      <div className="h-1.5 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <div
                          className="h-full transition-all duration-300 ease-out relative"
                          style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, var(--cyan), var(--accent), var(--violet))',
                            boxShadow: '0 0 12px var(--accent-glow)',
                          }}
                        >
                          <div className="absolute inset-0 animate-shimmer" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>
                        <span>▸ uploading to cloud</span>
                        <span className="numeric" style={{ color: 'var(--cyan)' }}>{progress}%</span>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div
                      className="mt-4 p-4 rounded-lg text-xs animate-scaleIn relative overflow-hidden"
                      style={{
                        backgroundColor: 'var(--error-bg)',
                        border: '1px solid rgba(255, 90, 110, 0.3)',
                        color: 'var(--error)',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--error), transparent)' }} />
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono mt-px font-bold">✕</span>
                        <span className="leading-relaxed">{error}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Success */}
              {convertedFile && (
                <div className="success-box mt-6">
                  <div className="success-icon">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--mint)' }}>
                    ✓ conversion complete
                  </p>
                  <h3 className="text-2xl font-chinese-display font-bold mb-2" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                    转换完成
                  </h3>
                  <p className="font-mono text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
                    {convertedFile.name}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleDownload}
                      className="btn-gradient px-7 py-3 text-sm inline-flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      下载文件
                    </button>
                    <button onClick={handleReset} className="btn-secondary px-7 py-3 text-sm">
                      重新转换
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className={`mt-6 flex items-center justify-center gap-3 ${isLoaded ? 'animate-slideUp delay-200' : 'opacity-0'}`}>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
            ▸ files self-destruct after conversion
          </span>
          <span className="animate-blink font-mono" style={{ color: 'var(--accent)' }}>▮</span>
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

export default FileConverter
