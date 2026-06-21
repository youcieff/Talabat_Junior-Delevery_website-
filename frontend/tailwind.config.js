/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          pink: "#ff00ff",
          cyan: "#00ffff",
          lime: "#39ff14",
          blue: "#0a0a2e",
          purple: "#7d00ff",
        },
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(45deg, #ff00ff, #00ffff)",
        "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
      },
      boxShadow: {
        "neon-pink": "0 0 10px #ff00ff, 0 0 20px #ff00ff",
        "neon-cyan": "0 0 10px #00ffff, 0 0 20px #00ffff",
        "neon-lime": "0 0 10px #39ff14, 0 0 20px #39ff14",
      },
    },
  },
  plugins: [],
};
