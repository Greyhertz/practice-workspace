// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: ["class"],
//   content: ["./index.html", "./src/**/*.{ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
//         mono: ["JetBrains Mono", "ui-monospace", "monospace"]
//       }
//     }
//   },
//   plugins: []
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [],
}