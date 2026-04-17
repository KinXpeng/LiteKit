import axios from 'axios'

// CloudConvert API 配置
// 请访问 https://cloudconvert.com/api 注册获取免费 API Key
const API_KEY = import.meta.env.VITE_CLOUDCONVERT_API_KEY || ''
const API_URL = 'https://api.cloudconvert.com/v2'

interface ConversionTask {
  id: string
  name: string
  operation: string
  status: string
  result?: {
    progress?: number
    files?: Array<{ url: string; filename: string }>
  }
}

interface ConversionJob {
  id: string
  status: 'queued' | 'processing' | 'finished' | 'error' | 'cancelled'
  tasks?: Record<string, ConversionTask>
}

interface ConversionResult {
  url: string
  filename: string
}

// 获取请求头
function getHeaders() {
  if (!API_KEY) {
    throw new Error('请设置 VITE_CLOUDCONVERT_API_KEY 环境变量')
  }
  return {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
}

/**
 * 等待任务完成
 */
async function waitForJob(
  jobId: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  const maxAttempts = 180 // 最多等待 6 分钟 (180 * 2秒)
  let attempts = 0

  while (attempts < maxAttempts) {
    const response = await axios.get(`${API_URL}/jobs/${jobId}`, {
      headers: getHeaders(),
      timeout: 30000,
    })

    const job = response.data.data
    const status = job.status

    // 更新进度 - tasks 是数组
    if (job.tasks?.length) {
      const importTask = job.tasks.find((t: ConversionTask) => t.operation === 'import/upload')
      const convertTask = job.tasks.find((t: ConversionTask) => t.operation === 'convert')
      
      let progressText = ''
      let percent = 0
      
      // 根据任务状态显示不同的进度
      if (convertTask?.status === 'processing') {
        percent = convertTask.result?.progress || 0
        progressText = `转换中: ${percent}%`
      } else if (convertTask?.status === 'queued') {
        percent = 0
        progressText = '等待转换...'
      } else if (importTask?.status === 'processing') {
        percent = 0
        progressText = '处理中...'
      } else if (importTask?.status === 'finished' && convertTask?.status !== 'finished') {
        percent = 0
        progressText = '转换即将开始...'
      }
      
      console.log(`Job ${status}: ${progressText}`, { importTask: importTask?.status, convertTask: convertTask?.status })
      
      if (onProgress) {
        onProgress(percent)
      }
    }

    if (status === 'finished') {
      console.log('转换完成!')
      return
    }

    if (status === 'error' || status === 'cancelled') {
      // 获取错误信息
      const errorTask = job.tasks?.find((t: ConversionTask) => t.status === 'error')
      const errorMsg = errorTask?.result?.error || status
      throw new Error(`转换失败: ${errorMsg}`)
    }

    // 等待 2 秒后重试
    await new Promise((resolve) => setTimeout(resolve, 2000))
    attempts++
  }

  throw new Error('转换超时，请重试')
}

/**
 * 获取转换结果
 */
async function getResult(jobId: string): Promise<ConversionResult> {
  const response = await axios.get(`${API_URL}/jobs/${jobId}`, {
    headers: getHeaders(),
    timeout: 30000,
  })

  const tasks = response.data.data.tasks as ConversionTask[]
  const exportTask = tasks.find((t) => t.operation === 'export/url')

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
 * 下载文件
 */
async function downloadFile(url: string, filename: string): Promise<File> {
  const response = await axios.get(url, {
    responseType: 'blob',
    timeout: 300000, // 5分钟超时
  })

  return new File([response.data], filename, {
    type: response.headers['content-type'] || 'application/octet-stream',
  })
}

/**
 * 通过 S3 presigned URL 上传文件
 */
async function uploadToS3(
  uploadUrl: string,
  parameters: Record<string, string>,
  file: File
): Promise<void> {
  const uploadFormData = new FormData()
  
  // 添加所有必需的 AWS S3 参数
  const fileKey = parameters.key.replace('${filename}', file.name)
  uploadFormData.append('key', fileKey)
  uploadFormData.append('acl', parameters.acl)
  uploadFormData.append('success_action_status', parameters.success_action_status)
  uploadFormData.append('X-Amz-Credential', parameters['X-Amz-Credential'])
  uploadFormData.append('X-Amz-Algorithm', parameters['X-Amz-Algorithm'])
  uploadFormData.append('X-Amz-Date', parameters['X-Amz-Date'])
  uploadFormData.append('Policy', parameters.Policy)
  uploadFormData.append('X-Amz-Signature', parameters['X-Amz-Signature'])
  uploadFormData.append('file', file)

  // 上传到 S3
  const response = await axios.post(uploadUrl, uploadFormData, {
    timeout: 300000, // 5分钟超时
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // S3 presigned URL 不返回 JSON
    transformResponse: [(data) => data],
  })
  
  console.log('S3 上传响应状态:', response.status)
}

/**
 * 通过 base64 上传文件（备选方案，适用于小文件 < 50MB）
 * CloudConvert v2: 在创建 job 时直接包含 base64 数据
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
        
        // 直接在 job 中包含 base64 数据
        const response = await axios.post(
          `${API_URL}/jobs`,
          {
            tasks: {
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
            },
            tag: `litekit-${file.name}`,
          },
          {
            headers: getHeaders(),
            timeout: 60000,
          }
        )
        
        console.log('Base64 job 创建成功:', response.data.data.id)
        resolve(response.data.data.id)
      } catch (error: any) {
        console.error('Base64 上传失败:', error.response?.data || error.message)
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
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
  // 创建 job 获取上传 URL
  const createResponse = await axios.post(
    `${API_URL}/jobs`,
    {
      tasks: {
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
      },
      tag: `litekit-${file.name}`,
    },
    {
      headers: getHeaders(),
      timeout: 30000,
    }
  )

  console.log('Job 创建成功:', createResponse.data.data.id)

  const jobId = createResponse.data.data.id
  
  // tasks 是数组，找到 import-file 任务获取上传表单
  const tasks = createResponse.data.data.tasks as Array<{
    name: string
    result?: {
      form?: {
        url: string
        parameters: Record<string, string>
      }
    }
  }>
  const uploadTask = tasks.find(t => t.name === 'import-file')
  const formInfo = uploadTask?.result?.form

  if (!formInfo) {
    throw new Error('未获取到上传表单数据')
  }

  console.log('上传 URL:', formInfo.url)
  console.log('尝试 S3 上传...')
  await uploadToS3(formInfo.url, formInfo.parameters, file)
  console.log('S3 上传成功')
  
  return jobId
}

/**
 * 创建转换任务并上传文件
 */
async function createAndUploadJob(
  inputFormat: string,
  outputFormat: string,
  file: File
): Promise<string> {
  // 根据文件大小选择上传方式
  // 小文件 (< 2MB) 使用 base64，大文件使用 S3
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
  console.log('API Key:', API_KEY ? '已配置' : '未配置')
  console.log('文件大小:', (file.size / 1024 / 1024).toFixed(2), 'MB')

  try {
    const jobId = await createAndUploadJob('pdf', 'docx', file)

    // 等待完成
    await waitForJob(jobId, onProgress)

    // 获取结果
    const result = await getResult(jobId)

    // 下载文件
    const outputFilename = result.filename || file.name.replace('.pdf', '.docx')
    const convertedFile = await downloadFile(result.url, outputFilename)

    return convertedFile
  } catch (error: any) {
    console.error('转换错误:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Word 转 PDF
 */
export async function wordToPdf(
  file: File,
  onProgress?: (percent: number) => void
): Promise<File> {
  console.log('API Key:', API_KEY ? '已配置' : '未配置')
  console.log('文件大小:', (file.size / 1024 / 1024).toFixed(2), 'MB')

  try {
    const jobId = await createAndUploadJob('docx', 'pdf', file)

    // 等待完成
    await waitForJob(jobId, onProgress)

    // 获取结果
    const result = await getResult(jobId)

    // 下载文件
    const outputFilename = result.filename || file.name.replace(/\.(docx|doc)$/, '.pdf')
    const convertedFile = await downloadFile(result.url, outputFilename)

    return convertedFile
  } catch (error: any) {
    console.error('转换错误:', error.response?.data || error.message)
    throw error
  }
}

/**
 * 检查 API 是否配置
 */
export function isApiConfigured(): boolean {
  return !!API_KEY
}
