import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  // 基础 URL，可根据环境配置
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  // 请求超时时间
  timeout: 30000,
  // 请求头配置
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求队列，用于取消重复请求
const pendingMap = new Map<string, AbortController>()

/**
 * 生成请求的唯一标识
 */
function generateRequestKey(config: InternalAxiosRequestConfig): string {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 添加请求到队列
 */
function addPendingRequest(config: InternalAxiosRequestConfig): void {
  const requestKey = generateRequestKey(config)
  if (pendingMap.has(requestKey)) {
    // 取消之前的重复请求
    const controller = pendingMap.get(requestKey)
    controller?.abort()
    pendingMap.delete(requestKey)
  }
  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(requestKey, controller)
}

/**
 * 移除请求 from 队列
 */
function removePendingRequest(config: InternalAxiosRequestConfig): void {
  const requestKey = generateRequestKey(config)
  if (pendingMap.has(requestKey)) {
    pendingMap.delete(requestKey)
  }
}

// ==================== 请求拦截器 ====================
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 取消重复请求
    addPendingRequest(config)

    // 添加时间戳防止缓存（可选）
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    // 从 localStorage 或 store 获取 Token（根据实际项目调整）
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // 打印请求信息（开发环境）
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      })
    }

    return config
  },
  (error) => {
    console.error('❌ 请求配置错误:', error)
    return Promise.reject(error)
  }
)

// ==================== 响应拦截器 ====================
service.interceptors.response.use(
  (response) => {
    // 移除请求 from 队列
    removePendingRequest(response.config)

    // 打印响应信息（开发环境）
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data)
    }

    // 根据实际项目状态码处理
    const { code, msg } = response.data || {}

    // 假设 code 为 200/0/success 表示成功（可根据实际 API 调整）
    if (code === 200 || code === 0 || code === 'success' || code === undefined) {
      return response.data
    }

    // 其他业务错误
    message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
  },
  (error) => {
    // 移除请求 from 队列
    if (error.config) {
      removePendingRequest(error.config)
    }

    // 打印错误信息
    console.error('❌ 响应错误:', error)

    // 处理不同类型的错误
    if (axios.isCancel(error)) {
      // 请求被取消
      console.warn('⚠️ 请求被取消')
      return Promise.reject(error)
    }

    // 超时错误
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      message.error('请求超时，请稍后重试')
      return Promise.reject(new Error('请求超时'))
    }

    // 网络错误
    if (!error.response) {
      message.error('网络连接失败，请检查网络')
      return Promise.reject(new Error('网络连接失败'))
    }

    // 根据 HTTP 状态码处理
    const status = error.response.status
    switch (status) {
      case 400:
        message.error('请求参数错误')
        break
      case 401:
        message.error('登录已过期，请重新登录')
        // 可在这里跳转到登录页
        // window.location.href = '/login'
        break
      case 403:
        message.error('没有权限访问该资源')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器内部错误')
        break
      case 502:
        message.error('网关错误')
        break
      case 503:
        message.error('服务不可用')
        break
      case 504:
        message.error('网关超时')
        break
      default:
        message.error('请求失败')
    }

    return Promise.reject(error)
  }
)

// ==================== 导出封装的方法 ====================

/**
 * GET 请求
 */
export function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.get(url, { params, ...config })
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.post(url, data, config)
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.put(url, data, config)
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.delete(url, { params, ...config })
}

/**
 * PATCH 请求
 */
export function patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.patch(url, data, config)
}

/**
 * 上传文件（带进度）
 */
export function upload<T = any>(
  url: string,
  file: File | FormData,
  onUploadProgress?: (progress: number) => void,
  config?: AxiosRequestConfig
): Promise<T> {
  const formData = file instanceof FormData ? file : new FormData()
  if (!(file instanceof FormData)) {
    formData.append('file', file)
  }

  return service.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onUploadProgress(percent)
      }
    },
    ...config,
  })
}

/**
 * 下载文件
 */
export async function download(
  url: string,
  filename: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<void> {
  const response = await service.get(url, {
    params,
    responseType: 'blob',
    ...config,
  })
  const blob = new Blob([response.data])
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(link.href)
}

// 导出 axios 实例，可直接用于自定义配置
export { service as axios }

export default service
