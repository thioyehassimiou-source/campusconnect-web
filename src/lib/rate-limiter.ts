// src/lib/rate-limiter.ts
import { NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Basic in-memory rate limiter for Next.js API routes.
 * @param ip The IP address of the user.
 * @param limit Number of requests allowed per window.
 * @param windowMs Time window in milliseconds.
 * @returns { isLimited: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  
  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs
    }
    return { isLimited: false, remaining: limit - 1, resetTime: store[ip].resetTime }
  }

  store[ip].count++
  
  if (store[ip].count > limit) {
    return { isLimited: true, remaining: 0, resetTime: store[ip].resetTime }
  }

  return { isLimited: false, remaining: limit - store[ip].count, resetTime: store[ip].resetTime }
}

/**
 * Helper to handle rate limiting in API routes.
 */
export function rateLimitResponse(ip: string, limit: number = 10) {
  const { isLimited, remaining, resetTime } = checkRateLimit(ip, limit)
  
  if (isLimited) {
    return NextResponse.json({
      error: 'Too many requests',
      message: 'Veuillez patienter avant de réessayer.',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
    }, { 
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': resetTime.toString()
      }
    })
  }

  return null // Not limited
}
