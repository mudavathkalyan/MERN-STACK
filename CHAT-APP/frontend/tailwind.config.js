/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        myCustomLight: {
          primary: "#4caf50",
          secondary: "#ff9800",
          accent: "#3f51b5",
          neutral: "#333333",
          "base-100": "#ffffff",
          info: "#2196f3",
          success: "#8bc34a",
          warning: "#ffeb3b",
          error: "#f44336",
        },
        myCustomDark: {
          primary: "#4caf50",
          secondary: "#ff9800",
          accent: "#3f51b5",
          neutral: "#cccccc",
          "base-100": "#1a1a1a",
          info: "#64b5f6",
          success: "#81c784",
          warning: "#fff176",
          error: "#e57373",
        },
      },
      "light",
      "dark",
    ],
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  
};