import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'darkTheme-primary': '#1A202C', // Darker base color
        'darkTheme-secondary': '#2D3748', // Slightly lighter dark background
        'darkTheme-tertiary': '#3E3E3E', // Tertiary for lighter elements in dark mode
        'darkTheme-text': '#E0E0E0', // Light text color for dark mode
        'lightTheme-primary': '#F5F5F5', // Light base color
        'lightTheme-secondary': '#FFFFFF', // Secondary light background
        'lightTheme-tertiary': '#E0E0E0', // Tertiary for borders or subtle elements
        'lightTheme-text': '#333333', // Darker text color for light mode
      },
    },
  },
  plugins: [],
};
export default config;
