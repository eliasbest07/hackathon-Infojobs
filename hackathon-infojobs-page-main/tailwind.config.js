/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        colorAzul: '#2088c2',
        colorNaranja: '#e76726',
        darkAzul: '#263742',
        darkShadow: '#ffffff',
        darkSecondary: '#2f394e',
        darkTertiary: '#3e4a5f',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      darkMode: 'class',
      dark: {
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
