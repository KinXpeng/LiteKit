# LiteKit 项目规范

## 项目结构

### 目录结构

```
src/
├── components/            # 组件目录
│   └── [component-name]/  # 组件文件夹（小写，短横线分隔）
│       └── index.tsx      # 组件文件
├── pages/                # 页面目录
│   └── [page-name]/      # 页面文件夹（小写，短横线分隔）
│       ├── index.tsx     # 页面文件
│       └── index.css     # 页面样式文件
├── App.tsx              # 应用入口组件
├── App.css              # 应用全局样式
├── main.tsx             # 应用入口文件
└── index.css            # 全局样式
```

## 命名规范

### 文件夹命名
- 使用小写字母
- 多个单词之间使用短横线（-）分隔
- 示例：`theme-toggle`、`file-converter`

### 文件命名
- 页面文件：使用 `index.tsx` 和 `index.css`
- 组件文件：使用 `index.tsx`
- 样式文件：使用 `index.css`（与对应页面文件同目录）

### 组件命名
- 使用 PascalCase（大驼峰命名法）
- 示例：`ThemeToggle`、`FileConverter`

### 变量命名
- 普通变量：使用 camelCase（小驼峰命名法）
- 常量：使用 UPPER_SNAKE_CASE（全大写，下划线分隔）
- 示例：`selectedFile`、`MAX_WIDTH`

### 函数命名
- 使用 camelCase（小驼峰命名法）
- 示例：`handleFileChange`、`getSelectedSize`

## 代码风格

### 缩进
- 使用 2 个空格进行缩进
- 不要使用制表符（Tab）

### 分号
- 语句结束时使用分号

### 引号
- 使用单引号（'）
- 示例：`'string'`

### 括号
- 大括号 `{}` 与代码块在同一行
- 示例：`if (condition) {`

### 注释
- 函数和组件使用 JSDoc 注释
- 复杂逻辑添加行内注释

## 样式规范

### 命名约定
- 使用 BEM（Block Element Modifier）命名法
- 示例：`.navbar-content`、`.nav-link.active`

### 变量使用
- 使用 CSS 变量定义主题颜色和通用样式
- 示例：`var(--primary-color)`

## 路由规范

### 路由路径
- 使用小写字母
- 多个单词之间使用短横线（-）分隔
- 示例：`/file-converter`、`/image-cropper`

### 路由配置
- 在 App.tsx 中集中配置路由
- 使用 React Router v6 的 Routes 和 Route 组件

## 开发流程

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 提交规范

### 提交信息格式
```
<type>(<scope>): <description>

<body>

<footer>
```

### 提交类型
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码风格调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建或依赖更新

## 注意事项

1. 保持代码简洁明了
2. 遵循 React 最佳实践
3. 确保代码可维护性
4. 定期更新依赖
5. 编写清晰的文档

---

此规范适用于 LiteKit 项目的所有开发和维护工作，所有团队成员应严格遵守。