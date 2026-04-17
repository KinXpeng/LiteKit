import axios, { AxiosInstance } from 'axios'

// CloudConvert API 配置
// 请访问 https://cloudconvert.com/api 注册获取免费 API Key
export const API_KEY = import.meta.env.VITE_CLOUDCONVERT_API_KEY || ''
const API_URL = 'https://api.cloudconvert.com/v2'

// 创建 CloudConvert 专用 axios 实例
const cloudConvertInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加认证
cloudConvertInstance.interceptors.request.use(
  (config) => {
    if (!API_KEY) {
      throw new Error('请设置 VITE_CLOUDCONVERT_API_KEY 环境变量')
    }
    config.headers.Authorization = `Bearer ${API_KEY}`
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器 - 统一错误处理
cloudConvertInstance.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    if (axios.isCancel(error)) {
      console.warn('⚠️ 请求被取消')
      return Promise.reject(error)
    }

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return Promise.reject(new Error('请求超时'))
    }

    if (!error.response) {
      return Promise.reject(new Error('网络连接失败'))
    }

    const status = error.response.status
    const errorMsg = error.response.data?.message || error.response.data?.error || ''

    switch (status) {
      case 401:
        return Promise.reject(new Error('API Key 无效或已过期'))
      case 402:
        return Promise.reject(new Error('API 配额已用尽，请充值'))
      case 429:
        return Promise.reject(new Error('请求过于频繁，请稍后重试'))
      default:
        return Promise.reject(new Error(errorMsg || `请求失败 (${status})`))
    }
  }
)

// CloudConvert API
export const cloudConvertApi = {
  /**
   * 创建转换任务
   */
  createJob: (tasks: Record<string, any>, tag?: string): Promise<any> => {
    return cloudConvertInstance.post('/jobs', { tasks, tag })
  },

  /**
   * 查询任务状态
   */
  getJob: (jobId: string): Promise<any> => {
    return cloudConvertInstance.get(`/jobs/${jobId}`)
  },

  /**
   * 上传文件到 S3 presigned URL
   */
  uploadToS3: async (
    uploadUrl: string,
    parameters: Record<string, string>,
    file: File
  ): Promise<void> => {
    const formData = new FormData()
    const fileKey = parameters.key.replace('${filename}', file.name)
    formData.append('key', fileKey)
    formData.append('acl', parameters.acl)
    formData.append('success_action_status', parameters.success_action_status)
    formData.append('X-Amz-Credential', parameters['X-Amz-Credential'])
    formData.append('X-Amz-Algorithm', parameters['X-Amz-Algorithm'])
    formData.append('X-Amz-Date', parameters['X-Amz-Date'])
    formData.append('Policy', parameters.Policy)
    formData.append('X-Amz-Signature', parameters['X-Amz-Signature'])
    formData.append('file', file)

    // S3 上传使用独立的 axios 实例（较长超时，不走统一拦截）
    await axios.post(uploadUrl, formData, {
      timeout: 300000,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * 下载文件
   */
  downloadFile: async (url: string): Promise<Blob> => {
    const response = await axios.get(url, {
      responseType: 'blob',
      timeout: 300000,
    })
    return response.data
  },
}

/**
 * 检查 API 是否配置
 */
export function isApiConfigured(): boolean {
  return !!API_KEY
}
