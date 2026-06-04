/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        ds: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-raised': 'var(--color-surface-raised)',
          border: 'var(--color-border)',
          ink: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          destructive: 'var(--color-destructive)',
          'destructive-tint': 'var(--color-destructive-tint)',
        },
      },
    },
  },
  plugins: [],
};
