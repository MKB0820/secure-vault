import { useState } from 'react'
import type { PasswordEntry } from '../types'

interface PasswordListProps {
  entries: PasswordEntry[]
  onDelete: (id: string) => void
  onCopy: (password: string) => void
}

export default function PasswordList({ entries, onDelete, onCopy }: PasswordListProps) {
  const [showPassword, setShowPassword] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (id: string, password: string) => {
    await onCopy(password)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-8 w-8 text-gray-400"
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
        <h3 className="text-lg font-medium text-gray-900">还没有保存的密码</h3>
        <p className="mt-2 text-sm text-gray-600">
          点击上方"添加密码"按钮开始添加
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>

              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">用户名：</span>
                  <span className="font-mono text-sm">{entry.username}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">密码：</span>
                  <span className="font-mono text-sm">
                    {showPassword === entry.id ? entry.password : '••••••••'}
                  </span>
                  <button
                    onClick={() =>
                      setShowPassword(showPassword === entry.id ? null : entry.id)
                    }
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {showPassword === entry.id ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {entry.notes && (
                  <div>
                    <span className="text-sm text-gray-600">备注：</span>
                    <p className="mt-1 text-sm text-gray-700">{entry.notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-3 text-xs text-gray-500">
                更新于 {new Date(entry.updatedAt).toLocaleString('zh-CN')}
              </div>
            </div>

            <div className="ml-4 flex gap-2">
              <button
                onClick={() => handleCopy(entry.id, entry.password)}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                {copiedId === entry.id ? '已复制' : '复制密码'}
              </button>
              <button
                onClick={() => {
                  if (confirm('确定要删除这个密码吗？')) {
                    onDelete(entry.id)
                  }
                }}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
