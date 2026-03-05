/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-End Organic Tech System
        primary: {
          light: '#1B364D',
          DEFAULT: '#0B1F2D', // Deep Oceanic Blue (Moss replacement)
          dark: '#05111A',
        },
        accent: {
          light: '#F28555',
          DEFAULT: '#E66C37', // Vibrant Mandarin / Clay
          dark: '#C85220',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FDFCF9',
          DEFAULT: '#F2F0E9', // Cream Background
          900: '#D9D5C5',
        },
        charcoal: {
          light: '#2d2d2d',
          DEFAULT: '#1A1A1A',
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'serif'],
        data: ['"Space Mono"', 'monospace'],
        body: ['"Outfit"', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 10vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'hero': ['clamp(2rem, 6vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'title': ['clamp(1.5rem, 4vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        'pill': '9999px',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom, transparent 0%, rgba(11, 31, 45, 0.9) 100%)',
      },
    },
  },
  plugins: [],
}

