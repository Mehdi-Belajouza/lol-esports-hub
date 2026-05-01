/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-text': 'var(--accent-text)',
      },
      fontFamily: {
        headings: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}