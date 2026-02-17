import { Menu, Sun, Moon } from "lucide-react";
import type { ThemeType } from "../App";
import logoImage from "../assets/logo.png";

interface HeaderProps {
  theme: ThemeType;
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  sectionTitle: string;
}

export function Header({
  theme,
  onToggleTheme,
  onToggleSidebar,
  sectionTitle,
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 h-12 min-h-12 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b`}
    >
      <div className="flex items-center justify-between px-3 py-1">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className={`p-1 rounded transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Menu size={20} />
          </button>
          <h1
            className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-blue-900"}`}
          >
            {sectionTitle}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className={`p-1 rounded transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-700 text-yellow-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            title={theme === "light" ? "Tun rejimi" : "Kun rejimi"}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <img
            src={logoImage}
            alt="Logo"
            className="w-auto object-contain"
            style={{ height: "64px" }}
          />
        </div>
      </div>
    </header>
  );
}
