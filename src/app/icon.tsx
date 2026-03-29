import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 512, height: 512 }
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
          background: 'radial-gradient(circle, #1e1b4b 0%, #0f172a 100%)', // Deep modern dark blue
          borderRadius: '112px', // Apple-style squircle ratio (about 22% of 512)
          color: 'white',
          fontFamily: 'sans-serif',
          fontWeight: 900,
          position: 'relative'
        }}
      >
        {/* Core Geometry: Graduation Cap combined with CC connection block */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Main Logo Graphic (SVG) */}
          <svg
            width="320"
            height="320"
            viewBox="0 0 100 100"
            style={{ color: '#4f46e5' }}
          >
            {/* Cap bottom base */}
            <path d="M 25 55 L 25 70 C 40 80, 60 80, 75 70 L 75 55" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />
            
            {/* Cap Diamond Top */}
            <path d="M 50 20 L 85 40 L 50 60 L 15 40 Z" fill="#4f46e5" stroke="#818cf8" strokeWidth="4" strokeLinejoin="round" />
            
            {/* 'C' Letterforms built into the cap */}
            <path d="M 40 45 A 10 10 0 1 0 40 25" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M 60 50 A 10 10 0 1 0 60 30" fill="none" stroke="#a5b4fc" strokeWidth="6" strokeLinecap="round" />
            
            {/* Tassel */}
            <path d="M 85 40 L 85 65" fill="none" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="85" cy="65" r="4" fill="#c084fc" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
