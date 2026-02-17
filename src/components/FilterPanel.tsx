import { Calendar } from "lucide-react";
import type { ReactNode } from "react";
import type { ThemeType } from "../App";

interface FilterPanelProps {
  theme: ThemeType;
  activities?: string[];
  networkStatuses?: string[];
  customFilters?: ReactNode;
  insideMap?: boolean;
}

export function FilterPanel({
  theme,
  activities = [],
  networkStatuses = [],
  customFilters,
  insideMap = false,
}: FilterPanelProps) {
  const isDark = theme === "dark";
  return (
    <div
      className={`relative overflow-hidden ${insideMap ? "" : "mb-6"}`}
      style={{
        borderRadius: insideMap ? 8 : 16,
        border: insideMap
          ? "none"
          : `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
        padding: insideMap ? "6px 10px" : "10px 16px",
        background: insideMap
          ? "transparent"
          : isDark
            ? "#1f2937"
            : "linear-gradient(135deg, #ffffff, #f8fafc)",
        boxShadow: insideMap
          ? "none"
          : isDark
            ? "0 10px 20px rgba(0,0,0,0.35)"
            : "0 8px 18px rgba(15,23,42,0.08)",
        marginBottom: insideMap ? 0 : undefined,
      }}
    >
      {!insideMap && (
        <>
          <div
            className={`pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full blur-3xl ${
              theme === "dark" ? "bg-blue-500/15" : "bg-blue-400/20"
            }`}
          />
          <div
            className={`pointer-events-none absolute -right-10 bottom-0 h-28 w-28 rounded-full blur-3xl ${
              theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-400/15"
            }`}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          alignItems: insideMap ? "stretch" : "flex-start",
          gap: insideMap ? 10 : 12,
          flexWrap: "nowrap",
          overflowX: insideMap ? "auto" : "visible",
        }}
      >
        {insideMap ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              borderRadius: 10,
              background: isDark
                ? "rgba(31, 41, 55, 0.6)"
                : "rgba(255, 255, 255, 0.7)",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              width: "fit-content",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: isDark ? "#e2e8f0" : "#1f2937",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
                whiteSpace: "nowrap",
                minWidth: 50,
              }}
            >
              <Calendar size={11} /> Sanalar
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 4,
                border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
                background: isDark ? "#1f2937" : "#ffffff",
                padding: "2px 3px",
              }}
            >
              <input
                type="date"
                style={{
                  width: 70,
                  height: 22,
                  padding: "1px 3px",
                  fontSize: 10,
                  borderRadius: 3,
                  border: "none",
                  background: "transparent",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                }}
                defaultValue="2024-01-01"
              />
              <span
                style={{
                  fontSize: 9,
                  color: isDark ? "#60a5fa" : "#3b82f6",
                  fontWeight: 600,
                }}
              >
                –
              </span>
              <input
                type="date"
                style={{
                  width: 70,
                  height: 22,
                  padding: "1px 3px",
                  fontSize: 10,
                  borderRadius: 3,
                  border: "none",
                  background: "transparent",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                }}
                defaultValue="2024-12-31"
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 320,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <label
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] flex items-center gap-2 ${
                theme === "dark" ? "text-slate-200" : "text-slate-600"
              }`}
              style={{
                whiteSpace: "nowrap",
                color: isDark ? "#e2e8f0" : "#475569",
                margin: 0,
              }}
            >
              <Calendar size={12} color={isDark ? "#e2e8f0" : "#475569"} />
              Sanalar oralig'i
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 12,
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                background: isDark ? "#1f2937" : "#ffffff",
                padding: "6px 8px",
                boxShadow: isDark
                  ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                  : "inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              <input
                type="date"
                style={{
                  width: 140,
                  height: 30,
                  padding: "0 6px",
                  fontSize: 12,
                  borderRadius: 8,
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  background: isDark ? "#1f2937" : "#f8fafc",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                }}
                defaultValue="2024-01-01"
              />
              <span
                className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-400"}`}
              >
                —
              </span>
              <input
                type="date"
                style={{
                  width: 140,
                  height: 30,
                  padding: "0 6px",
                  fontSize: 12,
                  borderRadius: 8,
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  background: isDark ? "#1f2937" : "#f8fafc",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                }}
                defaultValue="2024-12-31"
              />
            </div>
          </div>
        )}
        {activities.length > 0 && insideMap ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              borderRadius: 10,
              background: isDark
                ? "rgba(31, 41, 55, 0.6)"
                : "rgba(255, 255, 255, 0.7)",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              width: "fit-content",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: isDark ? "#e2e8f0" : "#1f2937",
                margin: 0,
                whiteSpace: "nowrap",
                minWidth: 50,
              }}
            >
              Faoliyat
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 4,
                border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
                background: isDark ? "#1f2937" : "#ffffff",
                padding: "2px 3px",
              }}
            >
              <select
                className="filter-select"
                style={{
                  height: 22,
                  padding: "1px 3px",
                  fontSize: 10,
                  borderRadius: 3,
                  border: "none",
                  background: "transparent",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  fontWeight: 500,
                  flex: 1,
                }}
                defaultValue={activities[0]}
              >
                {activities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          activities.length > 0 && (
            <div
              style={{
                width: 240,
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <label
                className={`text-[10px] font-semibold uppercase tracking-[0.18em] flex items-center gap-2 ${
                  theme === "dark" ? "text-slate-200" : "text-slate-600"
                }`}
                style={{
                  whiteSpace: "nowrap",
                  color: isDark ? "#e2e8f0" : "#475569",
                  margin: 0,
                }}
              >
                Faoliyat turi
              </label>
              <div
                style={{
                  borderRadius: 12,
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  background: isDark ? "#1f2937" : "#ffffff",
                  padding: "5px 8px",
                  boxShadow: isDark
                    ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <select
                  className="filter-select"
                  style={{
                    width: "100%",
                    height: 28,
                    padding: "0 6px",
                    fontSize: 12,
                    borderRadius: 8,
                    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                    background: isDark ? "#1f2937" : "#f8fafc",
                    color: isDark ? "#e2e8f0" : "#0f172a",
                  }}
                  defaultValue={activities[0]}
                >
                  {activities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )
        )}
        {networkStatuses.length > 0 && insideMap ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              borderRadius: 10,
              background: isDark
                ? "rgba(31, 41, 55, 0.6)"
                : "rgba(255, 255, 255, 0.7)",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              width: "fit-content",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: isDark ? "#e2e8f0" : "#1f2937",
                margin: 0,
                whiteSpace: "nowrap",
                minWidth: 50,
              }}
            >
              Tarmoq
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 4,
                border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
                background: isDark ? "#1f2937" : "#ffffff",
                padding: "2px 3px",
              }}
            >
              <select
                className="filter-select"
                style={{
                  height: 22,
                  padding: "1px 3px",
                  fontSize: 10,
                  borderRadius: 3,
                  border: "none",
                  background: "transparent",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  fontWeight: 500,
                  flex: 1,
                }}
                defaultValue={networkStatuses[0]}
              >
                {networkStatuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          networkStatuses.length > 0 && (
            <div
              style={{
                width: 240,
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <label
                className={`text-[10px] font-semibold uppercase tracking-[0.18em] flex items-center gap-2 ${
                  theme === "dark" ? "text-slate-200" : "text-slate-600"
                }`}
                style={{
                  whiteSpace: "nowrap",
                  color: isDark ? "#e2e8f0" : "#475569",
                  margin: 0,
                }}
              >
                Tarmoq holati
              </label>
              <div
                style={{
                  borderRadius: 12,
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  background: isDark ? "#1f2937" : "#ffffff",
                  padding: "5px 8px",
                  boxShadow: isDark
                    ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <select
                  className="filter-select"
                  style={{
                    width: "100%",
                    height: 28,
                    padding: "0 6px",
                    fontSize: 12,
                    borderRadius: 8,
                    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                    background: isDark ? "#1f2937" : "#f8fafc",
                    color: isDark ? "#e2e8f0" : "#0f172a",
                  }}
                  defaultValue={networkStatuses[0]}
                >
                  {networkStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )
        )}
        {customFilters}
      </div>
    </div>
  );
}
