/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* ▼ shadcn が参照する 9 色トークンを必ず入れる */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "#1667C2", // ← 追加した独自色
        headerTop: "#FFF0C2",
        headerSub: "#F7DACD",
        panelBg: "#E5E5E5",
      },
      borderRadius: {
        panel: "12px",
      },
      boxShadow: {
        panel: "0 0 4px rgba(0,0,0,.06)",
      },
    },
  },
  /* ▼ 追加ここから */
  keyframes: {
    marquee: {
      "0%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(-50%)" }, // 半分進む＝重複分で無限ループ
    },
  },
  animation: {
    marquee: "marquee 25s linear infinite", // 速度は秒数で調整
  },
  plugins: [],
};
