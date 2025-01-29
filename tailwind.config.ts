import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in src
    "./src/app/**/*.{js,ts,jsx,tsx}", // Explicitly include app directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Explicitly include components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
