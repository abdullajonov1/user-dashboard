import { useEffect, useId, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft } from "lucide-react";
import type { ThemeType } from "../App";

interface ChartData {
  name: string;
  value: number;
  children?: ChartData[];
}

interface DrillDownChartProps {
  theme: ThemeType;
  data: ChartData[];
  title: string;
  minHeight?: number;
}

export function DrillDownChart({
  theme,
  data,
  title,
  minHeight,
}: DrillDownChartProps) {
  const [currentData, setCurrentData] = useState<ChartData[]>(data);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([title]);
  const gradientId = useId().replace(/:/g, "_") + "_bar_gradient";
  const isDark = theme === "dark";
  const minRowHeight = 16;
  const chartPadding = 0;
  const containerPadding = 14;
  const chartViewportPadding = 8;
  const chartContainerGap = 6;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLParagraphElement | null>(null);
  const chartInnerPadding = 0;
  const [maxAvailableHeight, setMaxAvailableHeight] = useState(420);
  const minContainerHeight = minHeight ?? 320;
  const [measuredHeaderHeight, setMeasuredHeaderHeight] = useState(0);
  const [measuredFooterHeight, setMeasuredFooterHeight] = useState(0);
  const showFooter = currentData.some((item) => item.children);
  const headerHeight = measuredHeaderHeight || 104;
  const footerHeight = showFooter ? measuredFooterHeight || 32 : 0;
  const availableForChart = Math.max(
    300,
    maxAvailableHeight -
      headerHeight -
      footerHeight -
      containerPadding * 2 -
      chartViewportPadding * 2 -
      chartContainerGap * 2,
  );
  const itemCount = Math.max(1, currentData.length);
  const rowHeight = Math.max(
    minRowHeight,
    Math.floor((availableForChart - chartPadding) / itemCount),
  );
  const chartContentHeight =
    itemCount * rowHeight + chartPadding + chartInnerPadding * 2;
  const showChartScroll = false;
  const barSize = Math.max(10, Math.min(24, rowHeight - 6));
  const barCategoryGap = Math.max(12, Math.floor(rowHeight * 0.35));
  const chartRenderHeight = Math.min(chartContentHeight, availableForChart);

  const handleBarClick = (payload: ChartData) => {
    const clickedItem = currentData.find((item) => item.name === payload.name);
    if (clickedItem?.children) {
      setCurrentData(clickedItem.children);
      setBreadcrumb([...breadcrumb, clickedItem.name]);
    }
  };

  const handleBack = () => {
    if (breadcrumb.length > 1) {
      const newBreadcrumb = breadcrumb.slice(0, -1);
      setBreadcrumb(newBreadcrumb);

      let newData = data;
      for (let i = 1; i < newBreadcrumb.length; i += 1) {
        const item = newData.find((d) => d.name === newBreadcrumb[i]);
        if (item?.children) {
          newData = item.children;
        }
      }
      setCurrentData(newData);
    }
  };

  useEffect(() => {
    setCurrentData(data);
    setBreadcrumb([title]);
  }, [data, title]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateHeight = () => {
      const rect = node.getBoundingClientRect();
      const padding = 8; // bottom padding
      const available = window.innerHeight - rect.top - padding;
      setMaxAvailableHeight(
        Math.max(minContainerHeight, Math.floor(available)),
      );
      setMeasuredHeaderHeight(headerRef.current?.offsetHeight ?? 0);
      setMeasuredFooterHeight(footerRef.current?.offsetHeight ?? 0);
    };

    const resizeObserver = new ResizeObserver(updateHeight);

    resizeObserver.observe(node);
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    window.addEventListener("scroll", updateHeight, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`px-4 py-3 rounded-xl shadow-xl border ${
            isDark
              ? "bg-slate-800/95 border-white/[0.06] text-white"
              : "bg-white/95 border-slate-200 text-slate-900"
          }`}
          style={{ backdropFilter: "blur(12px)" }}
        >
          <p className="font-semibold text-sm">{payload[0].payload.name}</p>
          <p
            className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Qiymat:{" "}
            <span
              className="font-bold"
              style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
            >
              {payload[0].value}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden flex flex-col min-h-0 flex-1"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        borderRadius: 20,
        padding: containerPadding,
        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
        background: isDark
          ? "linear-gradient(160deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))"
          : "linear-gradient(160deg, #ffffff, #f8fafc)",
        boxShadow: isDark
          ? "0 16px 30px rgba(0,0,0,0.35)"
          : "0 18px 36px rgba(15, 23, 42, 0.12)",
        height: maxAvailableHeight,
        minHeight: maxAvailableHeight,
      }}
    >
      <div ref={headerRef} className="px-7 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {breadcrumb.length > 1 && (
              <button
                onClick={handleBack}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark
                    ? "hover:bg-white/[0.06] text-slate-400"
                    : "hover:bg-slate-100 text-slate-500"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <h3
              className="text-sm font-semibold px-2 py-1"
              style={{ color: isDark ? "#e2e8f0" : "#64748b" }}
            >
              {breadcrumb[breadcrumb.length - 1]}
            </h3>
          </div>
        </div>
        {breadcrumb.length > 1 && (
          <div className="mt-2 ml-10">
            <span
              className={`text-[11px] font-semibold ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
              style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
            >
              {breadcrumb[breadcrumb.length - 1]}
            </span>
          </div>
        )}
      </div>

      <div
        className="drilldown-scroll px-4 pt-3 flex-1 min-h-0 rounded-xl"
        style={{
          overflowY: "hidden",
          overscrollBehavior: "contain",
          height: availableForChart + chartViewportPadding * 2,
          paddingTop: chartViewportPadding,
          paddingBottom: chartViewportPadding,
          marginTop: chartContainerGap,
          marginBottom: chartContainerGap,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: chartRenderHeight,
            width: "100%",
            padding: `${chartInnerPadding}px 0`,
            boxSizing: "border-box",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              layout="vertical"
              margin={{ top: 0, right: 24, left: 16, bottom: 0 }}
              barCategoryGap={barCategoryGap}
              barGap={0}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical
                horizontal={false}
                strokeDasharray="3 6"
                stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}
              />
              <XAxis
                type="number"
                domain={[0, 110]}
                tick={{
                  fill: isDark ? "#94a3b8" : "#64748b",
                  fontSize: 11,
                  fontWeight: 600,
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{
                  fill: isDark ? "#94a3b8" : "#475569",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                axisLine={false}
                tickLine={false}
                width={110}
                padding={{ top: 0, bottom: 0 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                }}
              />
              <Bar
                dataKey="value"
                barSize={barSize}
                radius={[8, 8, 8, 8]}
                fill={`url(#${gradientId})`}
                background={{
                  fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  radius: 8,
                }}
                onClick={(entry) => handleBarClick(entry.payload)}
                style={{ cursor: "pointer" }}
              >
                <LabelList
                  dataKey="value"
                  position="center"
                  formatter={(value: number) => `${value}%`}
                  fill="#ffffff"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showFooter && (
        <p
          ref={footerRef}
          className={`text-[11px] text-center pb-3 flex-shrink-0 ${
            isDark ? "text-slate-300" : "text-slate-400"
          }`}
          style={{ color: isDark ? "#e2e8f0" : "#94a3b8" }}
        >
          Batafsil ko'rish uchun ustunni bosing
        </p>
      )}
    </div>
  );
}
