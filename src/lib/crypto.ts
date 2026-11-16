/**
 * Web Crypto API 封装：AES-GCM 加密与 PBKDF2 密钥派生
 */

const PBKDF2_ITERATIONS = 100_000
const SALT_LENGTH = 16
const IV_LENGTH = 12

export interface EncryptedData {
  ciphertext: string // base64
  iv: string // base64
  salt: string // base64
}

/**
 * 从主密码派生加密密钥
 */
async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * 加密文本
 */
export async function encrypt(
  plaintext: string,
  password: string
): Promise<EncryptedData> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  const key = await deriveKey(password, salt)

  const encoder = new TextEncoder()
  const data = encoder.encode(plaintext)

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  )

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv.buffer),
    salt: arrayBufferToBase64(salt.buffer),
  }
}

/**
 * 解密文本
 */
export async function decrypt(
  encrypted: EncryptedData,
  password: string
): Promise<string> {
  const salt = new Uint8Array(base64ToArrayBuffer(encrypted.salt))
  const iv = new Uint8Array(base64ToArrayBuffer(encrypted.iv))
  const ciphertext = new Uint8Array(base64ToArrayBuffer(encrypted.ciphertext))

  const key = await deriveKey(password, salt)

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  )

  const decoder = new TextDecoder()
  return decoder.decode(plaintext)
}

/**
 * 验证密码是否正确（通过尝试解密测试数据）
 */
export async function verifyPassword(
  encrypted: EncryptedData,
  password: string
): Promise<boolean> {
  try {
    await decrypt(encrypted, password)
    return true
  } catch {
    return false
  }
}

// Helper functions
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}
