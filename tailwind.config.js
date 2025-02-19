export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		screens: {
		  mobile: "480px", // Smartphones pequenos
		  tablet: "768px", // Tablets
		  laptop: "1024px", // Laptops
		  desktop: "1280px", // Monitores grandes
		  widescreen: "1536px", // Monitores muito grandes (4K)
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		colors: {
		  textForm: "#9CA3AF",
		  customGray: "#E9ECEF",
		  background: "#EAF6FF",
		  foreground: "#111827",
		  primary: {
			DEFAULT: "#ADD8E5",
			light: "#4A90E2",
			dark: "#003DA5",
		  },
		  secondary: {
			DEFAULT: "#28A745",
			light: "#5BD673",
			dark: "#1D6A2D",
		  },
		  destructive: {
			DEFAULT: "#E63946",
			light: "#FF7F84",
			dark: "#A31E26",
		  },
		  warning: {
			DEFAULT: "#FFCA3A",
			light: "#FFE194",
			dark: "#D6A728",
		  },
		  info: {
			DEFAULT: "#36B5FF",
			light: "#85D5FF",
			dark: "#007ACC",
		  },
		  accent: {
			DEFAULT: "#F4F4F4",
		  },
		  muted: {
			DEFAULT: "#E5E5E5",
		  },
		  border: "#D1D5DB",
		  input: "#E5E7EB",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  