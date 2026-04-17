import axios from 'axios'

// CloudConvert API 配置
// 请访问 https://cloudconvert.com/api 注册获取免费 API Key
export const API_KEY = import.meta.env.VITE_CLOUDCONVERT_API_KEY || ''
const API_URL = 'https://api.cloudconvert.com/v2'

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

// CloudConvert API 请求封装
export const cloudConvertApi = {
  /**
   * 创建转换任务
   */
  createJob: async (tasks: Record<string, any>, tag?: string) => {
    const response = await axios.post(
      `${API_URL}/jobs`,
      { tasks, tag },
      { headers: getHeaders(), timeout: 30000 }
    )
    return response.data.data
  },

  /**
   * 查询任务状态
   */
  getJob: async (jobId: string) => {
    const response = await axios.get(`${API_URL}/jobs/${jobId}`, {
      headers: getHeaders(),
      timeout: 30000,
    })
    return response.data.data
  },

  /**
   * 上传文件到 S3 presigned URL
   */
  uploadToS3: async (
    uploadUrl: string,
    parameters: Record<string, string>,
    file: File
  ) => {
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

    const response = await axios.post(uploadUrl, formData, {
      timeout: 300000,
      headers: { 'Content-Type': 'multipart/form-data' },
      transformResponse: [(data) => data],
    })
    return response
  },

  /**
   * 下载文件
   */
  downloadFile: async (url: string) => {
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
