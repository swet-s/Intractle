/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderColor: {
        'intractle-default': '#d3d6da',
        'intractle-selected': '#787c7e',
        'intractle-gray': '#787c7e',
        'intractle-yellow': '#c9b458',
        'intractle-green': '#6aaa64',
      },
      backgroundColor: {
        'intractle-default': '#ffffff',
        'intractle-gray': '#787c7e',
        'intractle-yellow': '#c9b458',
        'intractle-green': '#6aaa64',
      },
    },
  },
  plugins: [],
}

