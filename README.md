# UI Monorepo Starter

基于 **React 19 + Ant Design + Storybook** 的现代化组件库脚手架。

## 📁 项目结构

```
ui-monorepo-starter/
├── apps/                    # 应用项目
│   └── storybook/           # Storybook 文档站点
├── packages/                # 组件库包
│   ├── core/                # 核心组件
│   └── utils/               # 工具函数
├── .changeset/             # Changesets 版本管理配置
├── .husky/                  # Git 钩子
├── .vscode/                 # VSCode 推荐设置
├── .editorconfig            # 编辑器配置
├── .gitignore               # Git 忽略规则
├── .lintstagedrc            # lint-staged 配置
├── .prettierrc              # Prettier 格式化配置
├── commitlint.config.js     # Commitlint 提交规范
├── eslint.config.js         # ESLint 9 Flat Config
├── pnpm-workspace.yaml      # pnpm workspace 配置
├── tsconfig.base.json       # TypeScript 基础配置
└── package.json             # 根目录依赖和脚本
```

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

安装时会自动执行 `prepare` 脚本初始化 husky Git 钩子。

### 2. 初始化工作区

创建目录结构：

```powershell
New-Item -ItemType Directory -Force packages/core, packages/utils, apps/storybook
```

### 3. 常用命令

```bash
# 开发模式
pnpm dev

# 构建所有包
pnpm build

# 代码检查
pnpm lint
pnpm lint:fix

# 格式化代码
pnpm format
pnpm format:check

# 类型检查
pnpm typecheck

# 运行测试
pnpm test

# 启动 Storybook
pnpm storybook

# 创建 changeset（版本变更）
pnpm changeset

# 发布版本
pnpm release
```

## 🛠️ 基建配置清单

### 1. 包管理

- **pnpm** - 快速、节省磁盘空间的包管理器
- **pnpm-workspace.yaml** - Monorepo workspace 配置

### 2. 构建与类型

- **TypeScript 5** - 类型系统
- **tsconfig.base.json** - 共享 TypeScript 配置
  - Target: ES2022
  - JSX: react-jsx
  - Module: ESNext
  - Strict 模式全开

### 3. 代码质量

| 工具            | 用途                       |
| --------------- | -------------------------- |
| **ESLint 9**    | 代码检查，使用 Flat Config |
| **Prettier 3**  | 代码格式化                 |
| **Husky**       | Git 钩子管理               |
| **lint-staged** | 只检查暂存文件             |
| **Commitlint**  | Commit message 规范        |

### 4. 版本管理

- **Changesets** - 自动化版本管理和 changelog 生成

### 5. 开发环境

- **.editorconfig** - 编辑器统一配置
- **.vscode/** - VSCode 推荐扩展和设置
- **.gitignore** - Git 忽略规则

## 📝 Git Commit 规范

本项目遵循 [Conventional Commits](https://conventionalcommits.org/) 规范。

### Commit 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型       | 说明                   |
| ---------- | ---------------------- |
| `feat`     | 新功能                 |
| `fix`      | 修复 bug               |
| `docs`     | 文档更新               |
| `style`    | 代码格式（不影响功能） |
| `refactor` | 重构代码               |
| `perf`     | 性能优化               |
| `test`     | 添加/修改测试          |
| `build`    | 构建系统更改           |
| `ci`       | CI 配置更改            |
| `chore`    | 其他更改               |
| `revert`   | 回退提交               |

### 示例

```bash
feat(button): 添加按钮加载状态

fix(input): 修复输入框焦点丢失问题

docs(readme): 更新安装说明

style: 格式化代码

refactor(utils): 优化日期格式化函数
```

## 📦 下一步

1. **为具体包补充依赖声明**

   ```bash
   # 例如在 packages/core/package.json 中声明
   peerDependencies:
     react: ^19
     react-dom: ^19
     antd: ^6
   ```

2. **配置构建工具**
   - 推荐: `tsup` 或 `rollup` + `vite`

3. **配置 Storybook**

   ```bash
   cd apps/storybook
   pnpm dlx storybook@latest init
   ```

4. **添加测试**
   - Vitest + React Testing Library

## 📄 许可证

ISC
