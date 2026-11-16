# 本地加密密码库

零后端的密码管理器：Web Crypto 的 AES-GCM 加密与 PBKDF2 密钥派生，数据只存 IndexedDB，支持自动锁定与剪贴板清除。

**在线演示**：*待部署*

React 18 · TypeScript 5 · Vite 5 · Tailwind CSS 4 · Web Crypto · IndexedDB

---

## 核心特性

- **零后端** — 所有数据仅存储在本地浏览器的 IndexedDB 中，不会上传到任何服务器
- **强加密** — 使用 Web Crypto API 的 AES-GCM 加密算法，主密码通过 PBKDF2 (100,000 次迭代) 派生加密密钥
- **自动锁定** — 5 分钟无操作自动锁定保险库，需要重新输入主密码
- **剪贴板安全** — 复制密码到剪贴板后 5 秒自动清除
- **随机密码生成** — 内置安全的密码生成器
- **响应式设计** — 支持桌面和移动设备

---

## 安全设计

### 加密方案

- **算法**：AES-GCM (256位密钥)
- **密钥派生**：PBKDF2-SHA256 (100,000 次迭代)
- **随机盐和 IV**：每个条目使用独立的盐值和初始化向量
- **无网络请求**：全部运算在本地浏览器完成，数据不离开本机

### 数据流

```
主密码
  ↓
PBKDF2 (100k iter, random salt)
  ↓
AES-GCM Key
  ↓
加密密码条目
  ↓
IndexedDB (本地存储)
```

每次解锁保险库时，使用主密码重新派生加密密钥，然后解密所有条目。主密码不会被存储，只在内存中保持到用户锁定或自动锁定触发。

---

## 功能清单

| 功能 | 实现要点 |
|---|---|
| 主密码解锁 | 首次使用直接设置，之后每次解锁时尝试解密验证 |
| 添加密码 | 加密后存储到 IndexedDB，支持标题、用户名、密码、URL 和备注 |
| 查看密码 | 点击眼睛图标显示/隐藏密码 |
| 复制密码 | 复制到剪贴板，5 秒后自动清除 |
| 删除密码 | 从 IndexedDB 中删除加密条目 |
| 随机密码生成 | 16 位字母数字 + 特殊字符 |
| 自动锁定 | 5 分钟无鼠标/键盘/触摸/滚动活动自动锁定 |
| 手动锁定 | 点击"锁定"按钮立即锁定 |

---

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 构建生产版本
```

## 浏览器支持

需要 **Web Crypto API** 和 **IndexedDB** 支持：
- Chrome/Edge 60+
- Firefox 57+
- Safari 11.1+
- 不支持 HTTP（需要 HTTPS 或 localhost）

---

## 项目结构

```
.
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
└─ src/
   ├─ types.ts                    # 类型定义
   ├─ lib/
   │  ├─ crypto.ts                # AES-GCM 加密与 PBKDF2 密钥派生
   │  ├─ storage.ts               # IndexedDB 操作
   │  ├─ vault.ts                 # 密码库管理（加密 + 存储层整合）
   │  └─ autoLock.ts              # 自动锁定与剪贴板清除
   ├─ components/
   │  ├─ LoginScreen.tsx          # 登录/解锁界面
   │  ├─ PasswordList.tsx         # 密码列表
   │  └─ AddPasswordForm.tsx      # 添加密码表单
   ├─ App.tsx                     # 主应用
   ├─ main.tsx                    # 入口
   └─ index.css                   # 样式
```

---

## 安全提示

### ✅ 安全的用法

- 使用强主密码（至少 12 位，包含大小写字母、数字和特殊字符）
- 在 HTTPS 站点或 localhost 上使用
- 定期备份 IndexedDB 数据（浏览器工具 → 应用 → 存储）
- 离开时手动锁定

### ⚠️ 已知限制

- **主密码不可恢复**：忘记主密码后无法找回，所有数据将永久丢失
- **浏览器数据依赖**：清除浏览器数据会删除所有密码
- **无跨设备同步**：数据只存在当前浏览器，不同设备间无法同步
- **不适合企业用**：这是个人学习项目，不建议用于生产环境

---

## 技术栈

- **React 18** — UI 框架
- **TypeScript 5** — 类型安全
- **Vite 5** — 构建工具
- **Tailwind CSS 4** — 样式
- **Web Crypto API** — 浏览器原生加密
- **IndexedDB API** — 本地数据库

---

## 部署

构建后可部署到任何静态托管服务（Cloudflare Pages、Netlify、Vercel 等）。

```bash
npm run build
```

**重要**：必须通过 HTTPS 访问，Web Crypto API 在 HTTP 下不可用（localhost 除外）。

---

## License

MIT
