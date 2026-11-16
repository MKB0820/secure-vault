/**
 * 自动锁定管理器
 */

const LOCK_TIMEOUT = 5 * 60 * 1000 // 5分钟无操作自动锁定

let lockTimer: number | null = null
let onLockCallback: (() => void) | null = null

/**
 * 重置锁定计时器
 */
export function resetLockTimer(): void {
  if (lockTimer) {
    clearTimeout(lockTimer)
  }

  lockTimer = window.setTimeout(() => {
    if (onLockCallback) {
      onLockCallback()
    }
  }, LOCK_TIMEOUT)
}

/**
 * 设置锁定回调
 */
export function setLockCallback(callback: () => void): void {
  onLockCallback = callback
  resetLockTimer()
}

/**
 * 清除锁定计时器
 */
export function clearLockTimer(): void {
  if (lockTimer) {
    clearTimeout(lockTimer)
    lockTimer = null
  }
  onLockCallback = null
}

/**
 * 剪贴板清除（5秒后自动清除）
 */
export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)

  setTimeout(async () => {
    const current = await navigator.clipboard.readText()
    if (current === text) {
      await navigator.clipboard.writeText('')
    }
  }, 5000)
}