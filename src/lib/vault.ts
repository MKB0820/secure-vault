/**
 * 密码库管理器：加密层 + 存储层的整合
 */

import { encrypt, decrypt, type EncryptedData } from './crypto'
import { getAllEntries, saveEntry, deleteEntry, clearAll } from './storage'
import type { PasswordEntry, StoredEntry } from '../types'

/**
 * 解锁保险库并获取所有条目
 */
export async function unlockVault(
  masterPassword: string
): Promise<PasswordEntry[]> {
  const stored = await getAllEntries()
  const entries: PasswordEntry[] = []

  for (const item of stored) {
    try {
      const encrypted: EncryptedData = JSON.parse(item.encryptedData)
      const plaintext = await decrypt(encrypted, masterPassword)
      const entry: PasswordEntry = JSON.parse(plaintext)
      entries.push(entry)
    } catch (error) {
      console.error(`Failed to decrypt entry ${item.id}:`, error)
      // 密码错误时会抛出异常
      throw new Error('密码错误或数据已损坏')
    }
  }

  return entries.sort((a, b) => b.updatedAt - a.updatedAt)
}

/**
 * 保存密码条目
 */
export async function savePassword(
  entry: PasswordEntry,
  masterPassword: string
): Promise<void> {
  const plaintext = JSON.stringify(entry)
  const encrypted = await encrypt(plaintext, masterPassword)

  const stored: StoredEntry = {
    id: entry.id,
    encryptedData: JSON.stringify(encrypted),
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  }

  await saveEntry(stored)
}

/**
 * 删除密码条目
 */
export async function removePassword(id: string): Promise<void> {
  await deleteEntry(id)
}

/**
 * 清空保险库
 */
export async function clearVault(): Promise<void> {
  await clearAll()
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}