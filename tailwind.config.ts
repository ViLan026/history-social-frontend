// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // dark mode strategy: "class" → Tailwind check class="dark" trên <html>
  // next-themes sẽ tự thêm/xóa class này
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      colors: {
        background:    "var(--background)",
        foreground:    "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        "foreground-faint": "var(--foreground-faint)",

        surface:         "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        "surface-overlay": "var(--surface-overlay)",

        card:          "var(--card-bg)",
        "card-border": "var(--card-border)",

        border:        "var(--border)",
        "border-muted": "var(--border-muted)",

        primary: {
          DEFAULT:  "var(--primary)",
          hover:    "var(--primary-hover)",
          active:   "var(--primary-active)",
          subtle:   "var(--primary-subtle)",
          fg:       "var(--primary-fg)",
        },

        secondary: {
          DEFAULT:  "var(--secondary)",
          hover:    "var(--secondary-hover)",
          subtle:   "var(--secondary-subtle)",
          fg:       "var(--secondary-fg)",
        },

        success: {
          DEFAULT: "var(--success)",
          subtle:  "var(--success-subtle)",
          fg:      "var(--success-fg)",
        },

        warning: {
          DEFAULT: "var(--warning)",
          subtle:  "var(--warning-subtle)",
          fg:      "var(--warning-fg)",
        },

        destructive: {
          DEFAULT: "var(--destructive)",
          hover:   "var(--destructive-hover)",
          subtle:  "var(--destructive-subtle)",
          fg:      "var(--destructive-fg)",
        },

        info: {
          DEFAULT: "var(--info)",
          subtle:  "var(--info-subtle)",
          fg:      "var(--info-fg)",
        },

        ring:     "var(--ring)",

        sidebar: {
          bg:     "var(--sidebar-bg)",
          border: "var(--sidebar-border)",
          hover:  "var(--sidebar-item-hover)",
          active: "var(--sidebar-item-active)",
        },
      },

      // Font Families — CSS variables từ next/font
      fontFamily: {
        body:    ["var(--font-body)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },

      // Breakpoints — Custom (giải thích ở dưới)
      screens: {
        // mobile: default (no prefix) — Mobile First!
        sm:   "480px",   // Large mobile / small tablet
        md:   "768px",   // Tablet portrait
        lg:   "1024px",  // Tablet landscape / laptop
        xl:   "1280px",  // Desktop — full 3-col
        "2xl": "1536px", // Large desktop
      },

      // Max widths — consistent containers
      maxWidth: {
        feed:    "680px",  // Feed column max width
        sidebar: "300px",  // Right sidebar max width
        layout:  "1400px", // Full page max width
        prose:   "65ch",   // Readable prose width
      },

      // Ring
      ringColor: {
        DEFAULT: "var(--ring)",
      },
      ringOffsetColor: {
        DEFAULT: "var(--ring-offset)",
      },

      // Border radius — consistent
      borderRadius: {
        sm:  "4px",
        md:  "8px",
        lg:  "12px",
        xl:  "16px",
        "2xl": "20px",
      },

      // Animation — ref globals.css keyframes
      animation: {
        "fade-in":    "fadeIn 0.2s ease",
        "slide-up":   "slideUp 0.25s ease",
        "slide-left": "slideInLeft 0.25s ease",
        "scale-in":   "scaleIn 0.2s ease",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-100%)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },

  plugins: [
    // require("@tailwindcss/typography"), // Uncomment nếu dùng prose class
  ],
};

export default config;