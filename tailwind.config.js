/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'blue': '#268bd2',
      'purple': '#6c71c4',
      'pink': '#d33682',
      'orange': '#cb4b16',
      'green': '#859900',
      'yellow': '#b58900',
      'red': '#dc322f',
      'cyan': '#2aa198',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'base-04': '#001d24',
      'base-03': '#002b36',
      'base-02': '#073642',
      'base-01': '#586e75',
      'base-00': '#657b83',
      'base-0': '#839496',
      'base-1': '#93a1a1',
      'base-2': '#eee8d5',
      'base-3': '#fdf6e3'
    },
    extend: {},
  },
  plugins: [],
}

