import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist classes used in formatters (dynamically generated HTML)
  safelist: [
    'ml-0',
    'ml-12',
    'ml-6',
    'ml-4',
    'mt-1',
    'mt-2',
    'mt-3',
    'mt-4',
    'mt-6',
    'mt-8',
    'mb-1',
    'mb-2',
    'mb-3',
    'whitespace-pre-wrap',
    'text-base',
    'text-sm',
    'text-xs',
    'leading-relaxed',
    'leading-snug',
    'min-w-[2rem]',
    'min-w-[1.5rem]',
    'min-w-[200px]',
    'border-b-2',
    'inline-flex',
    'items-center',
    'flex-shrink-0',
    'flex-1',
    'rounded',
    'px-2',
    'py-0.5',
    'gap-2',
    'gap-3',
    'gap-4',
    // Font families
    'font-display',
    'font-body',
    'font-script',
    'font-montserrat',
    'font-poppins',
    'font-roboto',
    'font-merriweather',
    'font-bellaboo',
    'font-caveat',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Shikha brand colors from logo cube
        shikha: {
          orange: '#F8A049',
          yellow: '#FFCA28',
          coral: '#E45B5B',
          teal: '#3BB77E',
          blue: '#29ABE2',
          purple: '#6B5CA5',
          charcoal: '#2E2E2E',
        },
        // Warm neutrals that complement the logo
        warm: {
          50: '#FFFDF8',   // Cream - lightest
          100: '#F9F8F6',  // Ivory
          200: '#F4F1EB',  // Sand
          300: '#F8F3E9',  // Linen
          400: '#E8E4DD',
          500: '#C4BFB5',
          600: '#8A857B',
          700: '#5A564E',
          800: '#333333',
          900: '#2E2E2E',
        },
        // Slate colors for the modern design
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Violet colors for accents
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Emerald for secondary accents
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Red for errors/validation
        red: {
          500: '#ef4444',
        }
      },
      fontFamily: {
        // DM Sans for headings - clean geometric like the logo
        display: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        // Poppins for body text
        body: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        // Bellaboo for handwritten/script style headings
        script: ['var(--font-bellaboo)', 'cursive'],
        // Caveat for handwritten/script style headings (local font)
        caveat: ['var(--font-caveat)', 'cursive'],
        // Legacy support
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        merriweather: ['var(--font-merriweather)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.5rem',    // 8px
        'md': '0.75rem',   // 12px
        'lg': '1rem',      // 16px
        'xl': '1.25rem',   // 20px - unified for tabs/buttons
        '2xl': '1.5rem',   // 24px - unified for cards
        '3xl': '2rem',     // 32px
      },
      boxShadow: {
        // Light mode shadows with warm tones
        'xs': '0 1px 2px rgba(46, 46, 46, 0.04)',
        'sm': '0 1px 3px rgba(46, 46, 46, 0.06), 0 1px 2px rgba(46, 46, 46, 0.04)',
        'md': '0 4px 6px -1px rgba(46, 46, 46, 0.08), 0 2px 4px -2px rgba(46, 46, 46, 0.04)',
        'lg': '0 10px 15px -3px rgba(46, 46, 46, 0.08), 0 4px 6px -4px rgba(46, 46, 46, 0.04)',
        'xl': '0 20px 25px -5px rgba(46, 46, 46, 0.1), 0 8px 10px -6px rgba(46, 46, 46, 0.04)',
        '2xl': '0 25px 50px -12px rgba(46, 46, 46, 0.2)',
        // Colored shadows from logo palette
        'orange': '0 8px 24px -4px rgba(248, 160, 73, 0.25)',
        'purple': '0 8px 24px -4px rgba(107, 92, 165, 0.25)',
        'teal': '0 8px 24px -4px rgba(59, 183, 126, 0.25)',
        'blue': '0 8px 24px -4px rgba(41, 171, 226, 0.25)',
        'coral': '0 8px 24px -4px rgba(228, 91, 91, 0.25)',
        // Legacy
        'violet-100': '0 4px 20px rgba(139, 92, 246, 0.1)',
        'violet-50': '0 2px 10px rgba(139, 92, 246, 0.05)',
        'dark-minimal': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'none': 'none',
      },
      backgroundImage: {
        // Shikha warm gradients
        'shikha-warm': 'linear-gradient(145deg, #FFFDF8, #F9F8F6)',
        'shikha-card': 'linear-gradient(145deg, #FFFFFF, #F9F8F6)',
        'shikha-elevated': 'linear-gradient(145deg, #F9F8F6, #F4F1EB)',
        // Dark mode gradient layers for sophisticated depth
        'dark-layer-1': 'linear-gradient(145deg, #1e293b, #0f172a)',
        'dark-layer-2': 'linear-gradient(145deg, #334155, #1e293b)',
        'dark-layer-3': 'linear-gradient(145deg, #475569, #334155)',
        'dark-elevated': 'linear-gradient(145deg, #64748b, #475569)',
        // Light mode sophisticated cream and white gradients
        'light-layer-1': 'linear-gradient(145deg, #fdfdfd, #fefefe)',
        'light-layer-2': 'linear-gradient(145deg, #f9fafb, #fdfdfd)',
        'light-layer-3': 'linear-gradient(145deg, #f3f4f6, #f9fafb)',
        'light-elevated': 'linear-gradient(145deg, #e5e7eb, #f3f4f6)',
        'light-subtle': 'linear-gradient(145deg, #ffffff, #f9fafb)',
        'light-warm': 'linear-gradient(145deg, #fffef9, #fefefe)',
        // Gradient overlays for enhanced depth
        'light-overlay': 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(249,250,251,0.4))',
        'dark-overlay': 'linear-gradient(to bottom, rgba(15,23,42,0.8), rgba(30,41,59,0.4))',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'border-beam': 'border-beam 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'blur-in': 'blurIn 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'text-reveal': 'textReveal 0.8s ease-out forwards',
        'spotlight': 'spotlight 2s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(248, 160, 73, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(248, 160, 73, 0.5)' },
        },
        'border-beam': {
          '0%': { 'offset-distance': '0%' },
          '100%': { 'offset-distance': '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        textReveal: {
          '0%': { 'clip-path': 'inset(0 100% 0 0)' },
          '100%': { 'clip-path': 'inset(0 0 0 0)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
