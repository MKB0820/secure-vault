import { useState } from 'react'

interface LoginScreenProps {
  onUnlock: (password: string) => void
  error?: string
}

export default function LoginScreen({ onUnlock, error }: LoginScreenProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password) {
      onUnlock(password)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">本地加密密码库</h1>
          <p className="mt-2 text-sm text-gray-600">
            输入主密码解锁保险库
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              主密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入主密码"
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            解锁
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-gray-50 p-4 text-xs text-gray-600">
          <p className="font-semibold">🔒 安全提示</p>
          <ul className="mt-2 space-y-1">
            <li>• 所有数据仅存储在本地浏览器</li>
            <li>• 使用 AES-GCM 加密算法</li>
            <li>• 5分钟无操作自动锁定</li>
            <li>• 密码复制到剪贴板5秒后自动清除</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
