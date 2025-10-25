module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // blue-600
        primaryLight: '#60a5fa', // blue-400
        secondary: '#f59e42', // orange-400
        accent: '#10b981', // emerald-500
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}; 