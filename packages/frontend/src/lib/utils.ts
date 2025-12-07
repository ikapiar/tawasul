import { type ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
 * Usage:
 * const debouncedSearch = debounce((query: string) => {
 *  console.log('Searching for:', query)
 * }, 300)
 *
 * In component:
 * <input onChange={(e) => debouncedSearch(e.target.value)} />
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    function debounced(this: unknown, ...args: Parameters<T>) {
        if (timeoutId !== null) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            timeoutId = null
            func.apply(this, args)
        }, wait)
    }

    debounced.cancel = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    debounced.flush = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
            func()
        }
    }

    return debounced as typeof debounced & { cancel: () => void; flush: () => void }
}
