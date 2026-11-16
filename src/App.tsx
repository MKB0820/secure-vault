import { useState, useEffect } from 'react'
import type { PasswordEntry } from './types'
import { unlockVault, savePassword, removePassword, generateId } from './lib/vault'
import { setLockCallback, resetLockTimer, clearLockTimer, copyToClipboard } from './lib/autoLock'
import LoginScreen from './components/LoginScreen'
import PasswordList from './components/PasswordList'
import AddPasswordForm from './components/AddPasswordForm'

export default function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [masterPassword, setMasterPassword] = useState('')
  const [entries, setEntries] = useState<PasswordEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState('')

  // 设置自动锁定
  useEffect(() => {
    if (!isLocked) {
      setLockCallback(() => {
        lock()
      })

      // 监听用户活动，重置计时器
      const events = ['mousedown', 'keydown', 'touchstart', 'scroll']
      events.forEach(event => {
        window.addEventListener(event, resetLockTimer)
      })

      return () => {
        events.forEach(event => {
          window.removeEventListener(event, resetLockTimer)
        })
        clearLockTimer()
      }
    }
  }, [isLocked])

  const handleUnlock = async (password: string) => {
    try {
      setError('')
      const loadedEntries = await unlockVault(password)
      setMasterPassword(password)
      setEntries(loadedEntries)
      setIsLocked(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : '解锁失败')
    }
  }

  const lock = () => {
    setIsLocked(true)
    setMasterPassword('')
    setEntries([])
    setShowAddForm(false)
    setError('')
  }

  const handleAddPassword = async (entry: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now()
    const newEntry: PasswordEntry = {
      ...entry,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }

    await savePassword(newEntry, masterPassword)
    setEntries(prev => [newEntry, ...prev])
    setShowAddForm(false)
    resetLockTimer()
  }

  const handleDeletePassword = async (id: string) => {
    await removePassword(id)
    setEntries(prev => prev.filter(e => e.id !== id))
    resetLockTimer()
  }

  const handleCopyPassword = async (password: string) => {
    await copyToClipboard(password)
    resetLockTimer()
  }

  if (isLocked) {
    return <LoginScreen onUnlock={handleUnlock} error={error} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">本地加密密码库</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                添加密码
              </button>
              <button
                onClick={lock}
                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                锁定
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {showAddForm ? (
          <AddPasswordForm
            onSave={handleAddPassword}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <PasswordList
            entries={entries}
            onDelete={handleDeletePassword}
            onCopy={handleCopyPassword}
          />
        )}
      </main>
    </div>
  )
}
