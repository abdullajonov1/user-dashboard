import { Flame, DollarSign, BarChart3 } from "lucide-react";
import type { SectionType, ThemeType } from "../App";

interface SidebarProps {
  isOpen: boolean;
  isPinned: boolean;
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  theme: ThemeType;
}

export function Sidebar({
  isOpen,
  isPinned,
  activeSection,
  onSectionChange,
  theme,
}: SidebarProps) {
  const isCollapsed = !isOpen;
  const menuItems = [
    { id: "gas" as SectionType, label: "Gaz iste'moli", icon: Flame },
    { id: "debtors" as SectionType, label: "Qarzdorlar", icon: DollarSign },
    {
      id: "daily" as SectionType,
      label: "Kunlik ko'rsatkichlar",
      icon: BarChart3,
    },
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-r transition-all duration-1000 ease-in-out will-change-[width] ${
          isOpen ? "w-64 translate-x-0" : "w-20 translate-x-0"
        }`}
      >
        <nav
          className={`transition-all duration-1000 ease-in-out ${isCollapsed ? "p-3" : "p-4"}`}
        >
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center ${
                      isCollapsed ? "justify-center" : "gap-3"
                    } ${isCollapsed ? "px-3" : "px-4"} py-3 rounded-lg transition-all duration-1000 ease-in-out ${
                      activeSection === item.id
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-1000 ease-in-out">
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
