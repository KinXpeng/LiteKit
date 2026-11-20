import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { categories } from '@/config/categories'
import { changelog } from '@/config/changelog'
import { linkCatalog } from '@/config/links'
import { validateConfig } from '@/lib/validate'
import './index.css'

// 开发环境体检配置文件：id 重复、分类不存在、url 写错都会在控制台报出来
if (import.meta.env.DEV) {
  validateConfig(linkCatalog, categories, changelog)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
