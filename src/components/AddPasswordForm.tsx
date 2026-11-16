import { useState } from 'react'
import type { PasswordEntry } from '../types'

interface AddPasswordFormProps {
  onSave: (entry: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

export default function AddPasswordForm({ onSave, onCancel }: AddPasswordFormProps) {
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && username && password) {
      onSave({
        title,
        username,
        password,
        url: url || undefined,
        notes: notes || undefined,
      })
    }
  }

  const generatePassword = () => {
    const length = 16
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let result = ''
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length]
    }
    setPassword(result)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold text-gray-900">添加新密码</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            标题 *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例如：GitHub、Gmail"
            required
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            用户名 *
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="用户名或邮箱"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            密码 *
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="密码"
              required
            />
            <button
              type="button"
              onClick={generatePassword}
              className="whitespace-nowrap rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              生成密码
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            网址
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            备注
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="额外的备注信息"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            保存
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  )
}
