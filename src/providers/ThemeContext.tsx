// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// // --- TypeScript types rõ ràng ---
// type Theme = "light" | "dark";

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | null>(null);

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   // Mặc định "dark" vì đây là mạng xã hội lịch sử — tone tối phù hợp
//   const [theme, setTheme] = useState<Theme>("dark");
//   // Chặn render cho đến khi client đọc xong localStorage (tránh flash)
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("theme") as Theme | null;
//       const resolved: Theme = saved === "light" || saved === "dark" ? saved : "dark";

//       setTheme(resolved);
//       // Gán vào <html> — Tailwind dark mode (class strategy) mới hoạt động
//       applyThemeToHtml(resolved);
//     } catch (err) {
//       console.error("[ThemeProvider] Lỗi đọc localStorage:", err);
//     } finally {
//       setMounted(true);
//     }
//   }, []);

//   const toggleTheme = () => {
//     try {
//       setTheme((prevTheme) => {
//         const next: Theme = prevTheme === "light" ? "dark" : "light";
//         applyThemeToHtml(next);
//         localStorage.setItem("theme", next);
//         return next;
//       });
//     } catch (err) {
//       console.error("[ThemeProvider] Lỗi ghi localStorage:", err);
//     }
//   };

//   // Chỉ render khi mounted để tránh hydration mismatch
//   if (!mounted) {
//     return (
//       <ThemeContext.Provider value={{ theme, toggleTheme }}>
//         {children}
//       </ThemeContext.Provider>
//     );
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // Helper: toggle class trên <html> — đúng cách Tailwind yêu cầu
// function applyThemeToHtml(theme: Theme) {
//   const root = document.documentElement;
//   root.classList.remove("light", "dark");
//   root.classList.add(theme);
// }

// // Custom hook với error boundary
// export const useTheme = (): ThemeContextType => {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) {
//     throw new Error("useTheme phải được dùng bên trong <ThemeProvider>");
//   }
//   return ctx;
// };