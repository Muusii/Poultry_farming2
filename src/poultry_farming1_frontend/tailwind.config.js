/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'i3m-main': '#050DEB',
        'i3m-dark': '#100D28',
        'i3m-purple': '#8906E6',
        'i3m-pink': '#FF00E2',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

