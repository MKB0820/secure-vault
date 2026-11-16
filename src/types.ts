/**
 * 密码条目类型
 */
export interface PasswordEntry {
  id: string
  title: string
  username: string
  password: string
  url?: string
  notes?: string
  createdAt: number
  updatedAt: number
}

/**
 * 存储在 IndexedDB 中的加密条目
 */
export interface StoredEntry {
  id: string
  encryptedData: string // JSON.stringify(EncryptedData)
  createdAt: number
  updatedAt: number
}
