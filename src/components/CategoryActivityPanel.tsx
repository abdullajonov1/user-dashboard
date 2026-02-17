import type { ThemeType } from "../App";

type PanelColor = "green" | "yellow" | "red" | "blue" | "teal";

type PanelItem = {
  label: string;
  value?: string;
  amount?: string;
  color?: PanelColor;
  pill?: boolean;
  pillOnly?: boolean;
};

type PanelSection = {
  title: string;
  items: PanelItem[];
  layout?: "list" | "cards";
};

interface CategoryActivityPanelProps {
  theme: ThemeType;
  categories?: string[];
  activities?: string[];
  sections?: PanelSection[];
}

const colorClasses: Record<PanelColor, string> = {
  green: "bg-emerald-500 text-white",
  yellow: "bg-amber-400 text-white",
  red: "bg-rose-500 text-white",
  blue: "bg-blue-500 text-white",
  teal: "bg-teal-500 text-white",
};

export function CategoryActivityPanel({
  theme,
  categories = [],
  activities = [],
  sections = [],
}: CategoryActivityPanelProps) {
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-4">
      {(categories.length > 0 || activities.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl border ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="px-4 pt-3">
              <div
                className={`text-xs font-semibold tracking-[0.18em] uppercase ${
                  theme === "dark" ? "text-emerald-200" : "text-emerald-700"
                }`}
              >
                Kategoriya
              </div>
              <div
                className={`mt-2 h-px ${
                  theme === "dark" ? "bg-emerald-400/30" : "bg-emerald-500/30"
                }`}
              />
            </div>
            <div
              className={`px-4 pb-4 pt-3 text-sm ${
                theme === "dark" ? "text-slate-200" : "text-slate-800"
              }`}
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {categories.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span
                      className={`h-2 w-2 rounded-full mt-0.5 ${
                        theme === "dark" ? "bg-emerald-400" : "bg-emerald-500"
                      }`}
                    />
                    <span className="font-semibold leading-5">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`rounded-xl border ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="px-4 pt-3">
              <div
                className={`text-xs font-semibold tracking-[0.18em] uppercase ${
                  theme === "dark" ? "text-sky-200" : "text-sky-700"
                }`}
              >
                Faoliyat turi
              </div>
              <div
                className={`mt-2 h-px ${
                  theme === "dark" ? "bg-sky-400/30" : "bg-sky-500/30"
                }`}
              />
            </div>
            <div
              className={`px-4 pb-4 pt-3 text-sm ${
                theme === "dark" ? "text-slate-200" : "text-slate-800"
              }`}
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {activities.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span
                      className={`h-2 w-2 rounded-full mt-0.5 ${
                        theme === "dark" ? "bg-sky-400" : "bg-sky-500"
                      }`}
                    />
                    <span className="font-semibold leading-5">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {sections.map((section) => {
        const isCards = section.layout === "cards";
        return (
          <div key={section.title} className="rounded-2xl bg-transparent">
            <div className={`px-7 pt-5 ${isCards ? "pb-0" : ""}`}>
              <h3
                className="text-sm font-semibold px-2 py-1 mb-2"
                style={{ color: isDark ? "#e2e8f0" : "#64748b" }}
              >
                {section.title}
              </h3>
            </div>
            {isCards ? (
              <div className="px-7 pb-8">
                <div
                  className="flex gap-3 overflow-x-auto"
                  style={{ flexWrap: "nowrap" }}
                >
                  {section.items.map((item, index) => {
                    const colorKey = item.color ?? "blue";
                    return (
                      <div
                        key={`${section.title}-${index}`}
                        style={{
                          flex: "1 1 0",
                          minWidth: 0,
                          borderRadius: 16,
                          background: isDark ? "#1f2937" : "#ffffff",
                          padding: "10px 12px",
                          overflow: "hidden",
                          boxShadow: isDark
                            ? "0 10px 24px rgba(15, 23, 42, 0.35)"
                            : "0 10px 24px rgba(15, 23, 42, 0.08)",
                          border: isDark
                            ? "1px solid rgba(148, 163, 184, 0.35)"
                            : "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            minWidth: 0,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 8,
                              minWidth: 0,
                              flex: "1 1 auto",
                            }}
                          >
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 999,
                                background:
                                  colorKey === "green"
                                    ? "#22c55e"
                                    : colorKey === "yellow"
                                      ? "#f59e0b"
                                      : colorKey === "red"
                                        ? "#ef4444"
                                        : colorKey === "teal"
                                          ? "#14b8a6"
                                          : "#3b82f6",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: isDark ? "#e2e8f0" : "#0f172a",
                                minWidth: 0,
                                lineHeight: 1,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.value
                                ? `${item.label} ${item.value}`
                                : item.label}
                            </span>
                          </div>
                        </div>
                        {item.amount && (
                          <div
                            style={{
                              marginTop: 6,
                              marginLeft: 18,
                              fontSize: 20,
                              fontWeight: 700,
                              color: isDark ? "#94a3b8" : "#64748b",
                            }}
                          >
                            {item.amount}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div
                className={`px-7 pb-3 divide-y ${
                  theme === "dark" ? "divide-slate-800" : "divide-slate-200"
                }`}
              >
                {section.items.map((item, index) => (
                  <div
                    key={`${section.title}-${index}`}
                    className={`flex items-center gap-3 py-2 text-sm ${
                      theme === "dark" ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    {item.color && (
                      <span
                        className={`h-3 w-3 rounded-full ${colorClasses[item.color]}`}
                      />
                    )}
                    {!item.pillOnly && (
                      <span className="flex-1 font-medium">{item.label}</span>
                    )}
                    {item.value && (
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }
                      >
                        {item.value}
                      </span>
                    )}
                    {item.pill && (
                      <span
                        className={`rounded-full border border-rose-300 text-rose-500 px-2 py-0.5 text-xs font-semibold ${
                          item.pillOnly ? "" : "ml-auto"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
