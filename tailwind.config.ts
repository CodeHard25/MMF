import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        elevate: {
          beige: {
            DEFAULT: "#F5F5DC", // Base beige
            light: "#F8F8E8",
            dark: "#E5E5C5",
          },
          brown: {
            light: "#D2B48C", // Tan
            DEFAULT: "#A0522D", // Brown
            dark: "#654321", // Dark brown
            chocolate: "#3B2F2F", // Chocolate brown
          },
          gray: {
            light: "#F1F1F1",
            DEFAULT: "#8E9196",
            dark: "#333333",
            charcoal: "#222222",
          },
          blue: {
            navy: "#000080", // Navy blue
            dark: "#00008B",
            medium: "#0000CD",
            steel: "#4682B4",
          },
        },
        // Premium Men's Fashion Color Palette
        navy: {
          50: "#e8eaf6",
          100: "#c5cae9",
          200: "#9fa8da",
          300: "#7986cb",
          400: "#5c6bc0",
          500: "#3f51b5",
          600: "#3949ab",
          700: "#303f9f",
          800: "#283593",
          900: "#1a237e", // Deep navy primary
          DEFAULT: "#1a237e",
        },
        neutral: {
          50: "#fafafa", // Cream white
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#263238", // Charcoal gray
          950: "#0d1117", // Rich black for dark mode
          DEFAULT: "#263238",
        },
        gold: {
          50: "#fffde7",
          100: "#fff9c4",
          200: "#fff59d",
          300: "#fff176",
          400: "#ffee58",
          500: "#ffeb3b",
          600: "#fdd835",
          700: "#fbc02d",
          800: "#f9a825",
          900: "#ffc107", // Warm gold
          DEFAULT: "#ffc107",
        },
        surface: {
          light: "#f5f5dc", // Soft beige
          cream: "#fafafa",
          muted: "#8d6e63", // Muted brown
          dark: "#21262d", // Dark mode cards
          DEFAULT: "#f5f5dc",
        },
        // Card gradients for light and dark themes
        cardGradient: {
          beige: "#F5F5DC",
          lightBrown: "#D2B48C",
          sandBrown: "#F4A460",
          lightGray: "#D3D3D3",
          // Dark theme colors
          navyBlue: "#000080",
          darkBlue: "#00008B",
          charcoalGray: "#403E43",
          darkGray: "#222222",
          darkBrown: "#3B2F2F",
          midGray: "#333333",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "pulse-light": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.7",
          },
        },
        "hover-lift": {
          "0%": {
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            transform: "translateY(-2px) scale(1.02)",
          },
        },
        "glass-shimmer": {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        "fashion-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-light": "pulse-light 2s ease-in-out infinite",
        "hover-lift": "hover-lift 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        "glass-shimmer": "glass-shimmer 2s ease-in-out infinite",
        "fashion-spin": "fashion-spin 1s linear infinite",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      backdropBlur: {
        "glass": "10px",
        "subtle": "4px",
      },
      boxShadow: {
        "premium":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "elevated":
          "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.1)",
        "fashion": "0 20px 40px rgba(26, 35, 126, 0.15)",
      },
      fontFamily: {
        "primary": ["Inter", "system-ui", "sans-serif"],
        "heading": ["Playfair Display", "Georgia", "serif"],
        "ui": ["Montserrat", "system-ui", "sans-serif"],
        "sans": ["Inter", "system-ui", "sans-serif"],
        "serif": ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        "caption": ["12px", { lineHeight: "1.4" }],
        "small": ["14px", { lineHeight: "1.6" }],
        "body": ["16px", { lineHeight: "1.6" }],
        "large": ["18px", { lineHeight: "1.6" }],
        "h3": ["24px", { lineHeight: "1.4" }],
        "h2": ["32px", { lineHeight: "1.4" }],
        "h1": ["48px", { lineHeight: "1.2" }],
      },
      spacing: {
        "grid": "8px",
        "18": "4.5rem",
        "88": "22rem",
      },
      backgroundImage: {
        // Light theme gradients with beige and brown tones
        "light-beige-gradient":
          "linear-gradient(135deg, #F5F5DC 0%, #D2B48C 100%)",
        "warm-beige-gradient":
          "linear-gradient(to right, #F5F5DC 0%, #E5DCC3 100%)",
        "sand-brown-gradient":
          "linear-gradient(to right, #F4A460 0%, #D2B48C 100%)",
        "light-gray-beige": "linear-gradient(to top, #E6E9F0 0%, #F5F5DC 100%)",
        "soft-brown-gradient":
          "linear-gradient(90deg, #F5F5DC 0%, #D2B48C 100%)",
        // Dark theme gradients
        "dark-brown-gradient":
          "linear-gradient(to right, #3B2F2F 0%, #654321 100%)",
        "navy-gradient": "linear-gradient(to right, #000033 0%, #000080 100%)",
        "charcoal-gradient":
          "linear-gradient(to right, #222222 0%, #403E43 100%)",
        "dark-gray-gradient":
          "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #333",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
