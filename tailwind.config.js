/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hind Siliguri"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Baloo Da 2"', '"Hind Siliguri"', 'Inter', 'sans-serif'],
      },
      keyframes: {
        sectionIn: {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.985)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.55)' },
          '80%': { boxShadow: '0 0 0 14px rgba(34,197,94,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0.6' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'section-in': 'sectionIn 420ms cubic-bezier(.2,.8,.2,1) both',
        floaty: 'floaty 3.2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.8s ease-out infinite',
        'slide-up': 'slideUp 320ms cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
};
