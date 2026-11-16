# 修改 GitHub 授权设置教程

如何让 Cloudflare Pages 访问你的全部 GitHub 仓库（或添加新仓库）

---

## 方法一：在 GitHub 设置中修改（推荐）

### 第 1 步：进入 GitHub 集成设置

1. 登录 GitHub：https://github.com
2. 点击右上角头像
3. 选择 **Settings**（设置）
4. 在左侧菜单找到 **Integrations**（集成）→ **Applications**（应用程序）
5. 点击 **Installed GitHub Apps**（已安装的 GitHub 应用）

### 第 2 步：找到 Cloudflare Pages

在列表中找到 **Cloudflare Pages** 应用，点击 **Configure**（配置）按钮

### 第 3 步：修改仓库访问权限

在配置页面，找到 **Repository access**（仓库访问权限）部分：

**当前可能的设置**：
- 🔘 **Only select repositories**（仅选定的仓库）
  - 下面列出了你之前选择的仓库

**修改方式**：

#### 方案 A：允许访问所有仓库
1. 选择 ⭕ **All repositories**（所有仓库）
2. 这样 Cloudflare Pages 可以看到你现在和未来所有的仓库

#### 方案 B：只添加 secure-vault 仓库
1. 保持 🔘 **Only select repositories**（仅选定的仓库）
2. 点击 **Select repositories** 下拉菜单
3. 搜索并勾选 **secure-vault**
4. 点击下拉菜单外的空白处保存选择

### 第 4 步：保存更改

滚动到页面底部，点击 **Save**（保存）按钮

### 第 5 步：验证

1. 回到 Cloudflare Pages：https://dash.cloudflare.com/
2. 进入 **Workers 和 Pages** → **创建应用程序** → **Pages** → **连接到 Git**
3. 现在应该能看到 **secure-vault** 仓库了

---

## 方法二：在 Cloudflare Pages 中添加（更简单）

### 第 1 步：进入 Cloudflare Pages

1. 登录 Cloudflare：https://dash.cloudflare.com/
2. 进入 **Workers 和 Pages** → **创建应用程序** → **Pages**
3. 点击 **连接到 Git**

### 第 2 步：点击添加账户

在仓库列表页面：
1. 如果看不到 **secure-vault**，点击页面右上角的 **+ Add account**（添加账户）
2. 或点击 **Configure GitHub account**（配置 GitHub 账户）

### 第 3 步：在弹出的 GitHub 页面中修改

GitHub 会弹出授权窗口：
1. 找到 **Repository access**（仓库访问）部分
2. 选择：
   - ⭕ **All repositories**（所有仓库）
   - 或 🔘 **Only select repositories**，然后勾选 **secure-vault**
3. 滚动到底部，点击 **Save**（保存）

### 第 4 步：返回 Cloudflare

保存后会自动返回 Cloudflare Pages，现在应该能看到 **secure-vault** 仓库了

---

## 方法三：重新授权（如果上面方法不行）

### 第 1 步：撤销现有授权

1. 进入 GitHub：https://github.com/settings/installations
2. 找到 **Cloudflare Pages**
3. 点击 **Configure**（配置）
4. 滚动到最底部，点击 **Uninstall**（卸载）红色按钮
5. 确认卸载

### 第 2 步：重新连接

1. 回到 Cloudflare Pages：https://dash.cloudflare.com/
2. 进入 **Workers 和 Pages** → **创建应用程序** → **Pages** → **连接到 Git**
3. 再次授权 GitHub
4. 这次选择 **All repositories**（所有仓库）或勾选所需的仓库
5. 点击 **Install & Authorize**（安装并授权）

---

## 截图参考（关键步骤）

### GitHub 设置中的位置
```
GitHub → 头像 → Settings → Integrations → Installed GitHub Apps
```

### 权限选择界面应该看到
```
Repository access
  ⭕ All repositories
  🔘 Only select repositories
     └─ Select repositories ▼
        ├─ ☑ personal-website
        ├─ ☐ secure-vault        ← 勾选这个
        ├─ ☐ image-compression-workbench
        └─ ...
```

---

## 常见问题

### Q1: 找不到 "Installed GitHub Apps" 菜单？
**A:** 路径可能因 GitHub 界面更新而变化，尝试：
- Settings → Integrations → Applications
- Settings → Applications → Installed GitHub Apps
- 或直接访问：https://github.com/settings/installations

### Q2: 修改后 Cloudflare 还是看不到仓库？
**A:** 尝试：
1. 刷新 Cloudflare Pages 页面（按 F5）
2. 退出 Cloudflare 并重新登录
3. 清除浏览器缓存后再试

### Q3: "All repositories" 安全吗？
**A:** Cloudflare Pages 只能：
- ✅ 读取仓库代码（用于构建）
- ✅ 添加部署状态检查
- ❌ 不能修改代码
- ❌ 不能删除仓库

如果不放心，可以只选择需要部署的仓库。

### Q4: 我有多个 GitHub 账户怎么办？
**A:** 
1. 确保在 GitHub 中登录了正确的账户
2. 在 Cloudflare Pages 连接时会显示当前登录的账户名
3. 如需切换账户，先在 GitHub 切换，再回到 Cloudflare 重新连接

---

## 快速链接

- **GitHub 应用设置**：https://github.com/settings/installations
- **Cloudflare Dashboard**：https://dash.cloudflare.com/
- **secure-vault 仓库**：https://github.com/MKB0820/secure-vault

---

## 推荐设置

对于个人项目，建议：
- ✅ **选择 "All repositories"**（所有仓库）
  - 以后新建仓库可以直接部署，不用再改设置
  - Cloudflare 只有读权限，很安全

对于团队/公司项目，建议：
- ✅ **选择 "Only select repositories"**（仅选定的仓库）
  - 精确控制哪些项目可以部署
  - 更符合企业安全规范

---

修改完成后，就可以继续按照 `部署教程.md` 来部署你的项目了！
