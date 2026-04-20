import { cloudConvertApi } from '@/api/file'

// 类型定义
interface ConversionTask {
  id: string
  name: string
  operation: string
  status: string
  result?: {
    progress?: number
    files?: Array<{ url: string; filename: string }>
    error?: string
    form?: {
      url: string
      parameters: Record<string, string>
    }
  }
}

interface ConversionJob {
  id: string
  status: string
  tasks: ConversionTask[]
}

interface ConversionResult {
  url: string
  filename: string
}

/**
 * 等待任务完成
 */
async function waitForJob(
  jobId: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  const maxAttempts = 180
  let attempts = 0
  let lastKnownPercent = 0
  let isIncreasingPhase = true

  while (attempts < maxAttempts) {
    const job: ConversionJob = await cloudConvertApi.getJob(jobId)
    const status = job.status

    if (job.tasks?.length) {
      const importTask = job.tasks.find((t) => t.operation === 'import/upload')
      const convertTask = job.tasks.find((t) => t.operation === 'convert')

      let progressText = ''
      let percent = 0

      if (convertTask?.status === 'processing') {
        const apiProgress = convertTask.result?.progress || 0
        percent = apiProgress
        lastKnownPercent = apiProgress
        isIncreasingPhase = false
        progressText = `转换中: ${percent}%`
      } else if (convertTask?.status === 'queued') {
        progressText = '等待转换...'
      } else if (importTask?.status === 'processing') {
        progressText = '上传中...'
      } else if (importTask?.status === 'finished' && convertTask?.status !== 'finished') {
        progressText = '准备转换...'
      }

      console.log(`Job ${status}: ${progressText}`, {
        importTask: importTask?.status,
        convertTask: convertTask?.status,
      })

      if (onProgress) {
        if (percent > 0) {
          // API 返回了真实进度
          onProgress(percent)
        } else {
          // 模拟进度动画
          if (isIncreasingPhase) {
            // 初始阶段: 0 -> 30 缓慢增长
            const animatedPercent = Math.min(30, Math.floor((attempts * 2.5)))
            onProgress(animatedPercent)
          } else if (lastKnownPercent < 95) {
            // 已有进度但未完成: 继续缓慢增长到 95
            const animatedPercent = Math.min(95, lastKnownPercent + Math.floor((attempts % 5) * 2))
            onProgress(animatedPercent)
          } else {
            // 已接近完成: 95 -> 99
            onProgress(99)
          }
        }
      }
    }

    if (status === 'finished') {
      console.log('转换完成!')
      if (onProgress) {
        onProgress(100)
      }
      return
    }

    if (status === 'error' || status === 'cancelled') {
      const errorTask = job.tasks?.find((t) => t.status === 'error')
      const errorMsg = errorTask?.result?.error || status
      throw new Error(`转换失败: ${errorMsg}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    attempts++
  }

  throw new Error('转换超时，请重试')
}

/**
 * 获取转换结果
 */
async function getResult(jobId: string): Promise<ConversionResult> {
  const job: ConversionJob = await cloudConvertApi.getJob(jobId)
  const exportTask = job.tasks.find((t) => t.operation === 'export/url')

  if (!exportTask?.result?.files?.[0]) {
    throw new Error('获取转换结果失败')
  }

  const file = exportTask.result.files[0]
  return {
    url: file.url,
    filename: file.filename,
  }
}

/**
 * 下载文件并转换为 File 对象
 */
async function downloadConvertedFile(url: string, filename: string): Promise<File> {
  const blob = await cloudConvertApi.downloadFile(url)
  return new File([blob], filename, {
    type: (blob as Blob).type || 'application/octet-stream',
  })
}

/**
 * 通过 S3 上传文件
 */
async function uploadViaS3(
  inputFormat: string,
  outputFormat: string,
  file: File
): Promise<string> {
  const job: ConversionJob = await cloudConvertApi.createJob({
    'import-file': {
      operation: 'import/upload',
    },
    'convert-file': {
      operation: 'convert',
      input: 'import-file',
      input_format: inputFormat,
      output_format: outputFormat,
      engine: 'libreoffice',
    },
    'export-file': {
      operation: 'export/url',
      input: 'convert-file',
      inline: false,
      archive_multiple_files: false,
    },
  }, `litekit-${file.name}`)

  console.log('Job 创建成功:', job.id)

  const uploadTask = job.tasks.find((t) => t.name === 'import-file')
  const formInfo = uploadTask?.result?.form

  if (!formInfo) {
    throw new Error('未获取到上传表单数据')
  }

  console.log('上传 URL:', formInfo.url)
  console.log('尝试 S3 上传...')
  await cloudConvertApi.uploadToS3(formInfo.url, formInfo.parameters, file)
  console.log('S3 上传成功')

  return job.id
}

/**
 * 通过 base64 上传文件（适用于小文件 < 2MB）
 */
async function uploadViaBase64(
  inputFormat: string,
  outputFormat: string,
  file: File
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1]
        console.log('使用 base64 方式创建 job...')

        const job: ConversionJob = await cloudConvertApi.createJob({
          'import-file': {
            operation: 'import/base64',
            file: base64,
            filename: file.name,
          },
          'convert-file': {
            operation: 'convert',
            input: 'import-file',
            input_format: inputFormat,
            output_format: outputFormat,
            engine: 'libreoffice',
          },
          'export-file': {
            operation: 'export/url',
            input: 'convert-file',
            inline: false,
            archive_multiple_files: false,
          },
        }, `litekit-${file.name}`)

        console.log('Base64 job 创建成功:', job.id)
        resolve(job.id)
      } catch (error: any) {
        console.error('Base64 上传失败:', error.message)
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}

/**
 * 创建转换任务并上传文件
 */
async function createAndUploadJob(
  inputFormat: string,
  outputFormat: string,
  file: File
): Promise<string> {
  const MAX_DIRECT_UPLOAD_SIZE = 2 * 1024 * 1024

  if (file.size <= MAX_DIRECT_UPLOAD_SIZE) {
    return await uploadViaBase64(inputFormat, outputFormat, file)
  } else {
    return await uploadViaS3(inputFormat, outputFormat, file)
  }
}

/**
 * PDF 转 Word
 */
export async function pdfToWord(
  file: File,
  onProgress?: (percent: number) => void
): Promise<File> {
  console.log('文件大小:', (file.size / 1024 / 1024).toFixed(2), 'MB')

  const jobId = await createAndUploadJob('pdf', 'docx', file)
  await waitForJob(jobId, onProgress)
  const result = await getResult(jobId)
  const outputFilename = result.filename || file.name.replace('.pdf', '.docx')
  return await downloadConvertedFile(result.url, outputFilename)
}

/**
 * Word 转 PDF
 */
export async function wordToPdf(
  file: File,
  onProgress?: (percent: number) => void
): Promise<File> {
  console.log('文件大小:', (file.size / 1024 / 1024).toFixed(2), 'MB')

  const jobId = await createAndUploadJob('docx', 'pdf', file)
  await waitForJob(jobId, onProgress)
  const result = await getResult(jobId)
  const outputFilename = result.filename || file.name.replace(/\.(docx|doc)$/, '.pdf')
  return await downloadConvertedFile(result.url, outputFilename)
}
