// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={`btn-theme ${className}`}
      onClick={toggleTheme}
      aria-label="Tema değiştir"
      title="Tema değiştir"
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 10,
        padding: "6px 10px",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {theme === "light" ? <LuMoon /> : <LuSun />}
      <span style={{ fontSize: 13 }}>
        {theme === "light" ? "Koyu" : "Açık"}
      </span>
    </button>
  );
}
