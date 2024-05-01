import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*', './content/**/*.mdx', './public/**/*.svg',     "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config;
