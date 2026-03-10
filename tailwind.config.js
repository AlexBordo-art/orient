/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 2026 Premium Travel System
        obsidian: {
          light: '#1E293B',
          DEFAULT: '#0F172A',
          dark: '#020617',
        },
        sapphire: {
          light: '#3B82F6',
          DEFAULT: '#1E3A8A',
          dark: '#172554',
        },
        champagne: {
          light: '#FEF08A',
          DEFAULT: '#D4AF37',
          dark: '#A16207',
        },
        frosted: {
          light: 'rgba(255, 255, 255, 0.15)',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          dark: 'rgba(255, 255, 255, 0.03)',
        },
      },
      fontFamily: {
        heading: ['\"Playfair Display\"', 'serif'], // Luxury Cyrillic headings — high contrast elegant serifs
        sans: ['\"Inter\"', 'sans-serif'], // Clean readable body — perfect Cyrillic rendering
        mono: ['\"Space Mono\"', 'monospace'], // Formatted numbers/data
      },
      fontSize: {
        'display': ['clamp(3rem, 10vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'hero': ['clamp(2rem, 6vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.5rem, 4vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        'pill': '9999px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.4) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-light': '0 4px 24px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

