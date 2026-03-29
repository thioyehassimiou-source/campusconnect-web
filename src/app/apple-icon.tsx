import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a', // Solid dark blue for Apple compatibility
          color: 'white',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transform: 'scale(0.85)' // iOS adds rounding and squirculing, so we pad it slightly
        }}>
          {/* Main Logo Graphic (SVG) */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
          >
            {/* Same SVG core geometry as icon.tsx */}
            <path d="M 25 55 L 25 70 C 40 80, 60 80, 75 70 L 75 55" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />
            <path d="M 50 20 L 85 40 L 50 60 L 15 40 Z" fill="#4f46e5" stroke="#818cf8" strokeWidth="4" strokeLinejoin="round" />
            
            <path d="M 40 45 A 10 10 0 1 0 40 25" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M 60 50 A 10 10 0 1 0 60 30" fill="none" stroke="#a5b4fc" strokeWidth="6" strokeLinecap="round" />
            
            <path d="M 85 40 L 85 65" fill="none" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="85" cy="65" r="4" fill="#c084fc" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  )
}
