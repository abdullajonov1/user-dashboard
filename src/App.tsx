import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { GasConsumptionDashboard } from "./components/dashboards/GasConsumptionDashboard.tsx";
import { DebtorsDashboard } from "./components/dashboards/DebtorsDashboard.tsx";
import { DailyIndicatorsDashboard } from "./components/dashboards/DailyIndicatorsDashboard.tsx";

export type ThemeType = "light" | "dark";
export type SectionType = "gas" | "debtors" | "daily";

export default function App() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionType>("gas");
  const sidebarWidth = sidebarOpen ? 256 : 80;
  const contentGap = 8;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSidebarToggle = () => {
    if (sidebarPinned) {
      setSidebarPinned(false);
      setSidebarOpen(false);
    } else {
      setSidebarPinned(true);
      setSidebarOpen(true);
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "gas":
        return "ULGURJI ISTE'MOLCHILAR GAZ ISTE'MOLI ONLAYN NAZORATI";
      case "debtors":
        return "QARZDOR ULGURJI ISTE'MOLCHILAR ONLAYN NAZORATI";
      case "daily":
        return "KUNLIK KO'RSATKICHLAR YUBORISH JARAYONLARI ONLAYN NAZORATI";
      default:
        return "";
    }
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebar={handleSidebarToggle}
        sectionTitle={getSectionTitle()}
      />

      <div>
        <Sidebar
          isOpen={sidebarOpen}
          isPinned={sidebarPinned}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          theme={theme}
        />

        <main
          className="transition-all duration-1000 ease-in-out"
          style={{
            marginLeft: `${sidebarWidth}px`,
            paddingLeft: `${contentGap}px`,
            paddingRight: `${contentGap}px`,
          }}
        >
          {activeSection === "gas" && <GasConsumptionDashboard theme={theme} />}
          {activeSection === "debtors" && <DebtorsDashboard theme={theme} />}
          {activeSection === "daily" && (
            <DailyIndicatorsDashboard theme={theme} />
          )}
        </main>
      </div>
    </div>
  );
}
