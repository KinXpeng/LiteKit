import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { Route, Routes } from 'react-router-dom'
import { SearchProvider } from '@/context/SearchContext'
import { RootLayout } from '@/components/layout/RootLayout'
import { antdTheme } from '@/styles/theme'
import { AboutPage } from '@/pages/AboutPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { ChangelogPage } from '@/pages/ChangelogPage'
import { HomePage } from '@/pages/HomePage'
import { LinksPage } from '@/pages/LinksPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <ConfigProvider theme={antdTheme} locale={zhCN}>
      <SearchProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="links" element={<LinksPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="changelog" element={<ChangelogPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SearchProvider>
    </ConfigProvider>
  )
}
