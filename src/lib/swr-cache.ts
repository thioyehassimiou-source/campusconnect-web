'use client'

/**
 * SWR Persistent Cache Provider
 * 
 * Stores the SWR cache in localStorage so dashboard and schedule data
 * persists across page reloads even when offline.
 * 
 * Works with: next-pwa's service worker for full offline support.
 */

import { Cache } from 'swr'

const CACHE_KEY = 'campusconnect-swr-cache-v1'

function localStorageProvider(): Cache {
  if (typeof window === 'undefined') {
    return new Map()
  }

  // Load persisted cache from localStorage on boot
  let map: Map<string, any>
  try {
    const stored = localStorage.getItem(CACHE_KEY)
    map = new Map(stored ? JSON.parse(stored) : [])
  } catch {
    map = new Map()
  }

  // Persist cache to localStorage before the page unloads
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      try {
        const appCache = JSON.stringify(Array.from(map.entries()))
        localStorage.setItem(CACHE_KEY, appCache)
      } catch {
        // Fail silently (QuotaExceededError, etc.)
      }
    })
  }

  return map as Cache
}

export { localStorageProvider }
