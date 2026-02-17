import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { divIcon } from "leaflet";
import type { ThemeType } from "../App";
import {
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";

interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "good" | "warning" | "critical";
  region: string;
}

interface UzbekistanMapProps {
  theme: ThemeType;
  points: MapPoint[];
  height?: number;
  showWarning?: boolean;
  forceMixedPies?: boolean;
  goodLabel?: string;
  warningLabel?: string;
  criticalLabel?: string;
  goodLegendText?: string;
  warningLegendText?: string;
  criticalLegendText?: string;
  overlay?: ReactNode;
}

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return (hash >>> 0) / 4294967295;
}

function expandPoints(points: MapPoint[], factor: number) {
  if (factor <= 1) return points;
  const expanded: MapPoint[] = [];
  points.forEach((point) => {
    for (let i = 0; i < factor; i += 1) {
      expanded.push({
        ...point,
        id: `${point.id}-x${i + 1}`,
      });
    }
  });
  return expanded;
}

function distributePoints(points: MapPoint[]) {
  const byRegion = new Map<string, MapPoint[]>();
  points.forEach((point) => {
    const list = byRegion.get(point.region) ?? [];
    list.push(point);
    byRegion.set(point.region, list);
  });

  const distributed: MapPoint[] = [];
  byRegion.forEach((list) => {
    const center = list.reduce(
      (acc, point) => {
        acc.lat += point.lat;
        acc.lng += point.lng;
        return acc;
      },
      { lat: 0, lng: 0 },
    );
    const centerLat = center.lat / list.length;
    const centerLng = center.lng / list.length;

    list.forEach((point, index) => {
      const baseSeed = `${point.region}-${point.id}-${index}`;
      const angle = hashString(`${baseSeed}-a`) * Math.PI * 2;
      const nearCenter = index % 4 === 0;
      const radius = nearCenter
        ? 0.03 + hashString(`${baseSeed}-r`) * 0.08
        : 0.18 + hashString(`${baseSeed}-r`) * 0.45;
      const latOffset = Math.sin(angle) * radius * (nearCenter ? 0.7 : 0.9);
      const lngOffset = Math.cos(angle) * radius * (nearCenter ? 0.9 : 1.3);
      distributed.push({
        ...point,
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
      });
    });
  });

  return distributed;
}

/* Extracted outside the component so React doesn't re-create on every render */
function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    onZoom(map.getZoom());
  }, [map, onZoom]);
  useMapEvents({ zoomend: () => onZoom(map.getZoom()) });
  return null;
}

export function UzbekistanMap({
  theme,
  points,
  height = 900,
  showWarning = true,
  forceMixedPies = false,
  goodLabel = "Me'yorida",
  warningLabel = "Kam iste'mol",
  criticalLabel = "Ortiqcha",
  goodLegendText = "Me'yorida (95-100%)",
  warningLegendText = "Kam iste'mol (70-95%)",
  criticalLegendText = "Ortiqcha iste'mol (100%+)",
  overlay,
}: UzbekistanMapProps) {
  const [zoom, setZoom] = useState(6);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [autoHeight, setAutoHeight] = useState<number | null>(null);
  const expandedPoints = useMemo(() => expandPoints(points, 8), [points]);

  const getPointColor = (status: string) => {
    switch (status) {
      case "good":
        return "#22c55e";
      case "warning":
        return showWarning ? "#eab308" : "#22c55e";
      case "critical":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

  /* Aggregate points per region */
  const regionPies = useMemo(() => {
    const rmap = new Map<
      string,
      {
        lat: number;
        lng: number;
        good: number;
        warning: number;
        critical: number;
        name: string;
      }
    >();
    expandedPoints.forEach((point) => {
      const current = rmap.get(point.region) ?? {
        lat: point.lat,
        lng: point.lng,
        good: 0,
        warning: 0,
        critical: 0,
        name: point.name,
      };
      if (point.status === "good") current.good++;
      else if (point.status === "warning") {
        if (showWarning) current.warning++;
        else current.good++;
      } else current.critical++;
      rmap.set(point.region, current);
    });
    return Array.from(rmap.entries()).map(([region, data]) => ({
      region,
      ...data,
    }));
  }, [expandedPoints]);

  const detailedPoints = useMemo(
    () => distributePoints(expandedPoints),
    [expandedPoints],
  );

  const showPies = zoom < 8;

  /* Build pie icon using conic-gradient (reliable CSS, no SVG issues) */
  const makePieIcon = (good: number, warning: number, critical: number) => {
    if (!showWarning) {
      const displayGood = forceMixedPies ? Math.max(1, good) : good;
      const displayCritical = forceMixedPies ? Math.max(1, critical) : critical;
      const total = displayGood + displayCritical || 1;
      const goodPct = (displayGood / total) * 100;
      const html = `
        <div style="width:38px;height:38px;border-radius:50%;background:conic-gradient(#22c55e 0% ${goodPct}%,#ef4444 ${goodPct}% 100%);position:relative;box-shadow:0 5px 12px rgba(0,0,0,0.22), inset 0 0 0 2px rgba(255,255,255,0.9), inset 0 0 0 1px rgba(0,0,0,0.08);">
          <div style="position:absolute;top:3px;left:4px;right:4px;height:40%;border-radius:50%;background:linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0));"></div>
          <div style="position:absolute;top:50%;left:50%;width:12px;height:12px;border-radius:50%;background:#ffffff;box-shadow:0 2px 5px rgba(0,0,0,0.2);transform:translate(-50%,-50%);"></div>
        </div>
      `;
      return divIcon({
        className: "region-pie-icon",
        html,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });
    }

    const total = good + warning + critical || 1;
    const goodPct = (good / total) * 100;
    const warnPct = (warning / total) * 100;
    const stop1 = goodPct;
    const stop2 = goodPct + warnPct;
    const html = `
      <div style="width:38px;height:38px;border-radius:50%;background:conic-gradient(#22c55e 0% ${stop1}%,#f59e0b ${stop1}% ${stop2}%,#ef4444 ${stop2}% 100%);position:relative;box-shadow:0 5px 12px rgba(0,0,0,0.22), inset 0 0 0 2px rgba(255,255,255,0.9), inset 0 0 0 1px rgba(0,0,0,0.08);">
        <div style="position:absolute;top:3px;left:4px;right:4px;height:40%;border-radius:50%;background:linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0));"></div>
        <div style="position:absolute;top:50%;left:50%;width:12px;height:12px;border-radius:50%;background:#ffffff;box-shadow:0 2px 5px rgba(0,0,0,0.2);transform:translate(-50%,-50%);"></div>
      </div>
    `;
    return divIcon({
      className: "region-pie-icon",
      html,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });
  };

  useEffect(() => {
    const updateHeight = () => {
      const node = containerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const padding = 8; // bottom padding
      const available = window.innerHeight - rect.top - padding;
      const minHeight = 420;
      const next = Math.max(minHeight, Math.min(height, available));
      setAutoHeight(next);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    window.addEventListener("scroll", updateHeight, { passive: true });
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", updateHeight);
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className="rounded-lg shadow-lg"
      style={{
        position: "relative",
        zIndex: 0,
        overflow: "visible",
        height: autoHeight ?? height,
        minHeight: 420,
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
      }}
    >
      {overlay ? (
        <div className="absolute left-4 right-4 top-4 z-50 pointer-events-none">
          <div className="pointer-events-auto max-w-3xl">{overlay}</div>
        </div>
      ) : null}
      <MapContainer
        center={[41.3, 64.6]}
        zoom={6}
        zoomSnap={0.5}
        scrollWheelZoom
        className="rounded-lg"
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ZoomTracker onZoom={setZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Pie markers at normal/low zoom */}
        {showPies &&
          regionPies.map((region) => (
            <Marker
              key={`pie-${region.region}`}
              position={[region.lat, region.lng]}
              icon={makePieIcon(region.good, region.warning, region.critical)}
            >
              <Tooltip direction="top" offset={[0, -24]}>
                <div
                  style={{
                    minWidth: 160,
                    background: theme === "dark" ? "#0f172a" : "#ffffff",
                    border: `1px solid ${theme === "dark" ? "#1f2937" : "#e2e8f0"}`,
                    borderRadius: 12,
                    padding: "8px 10px",
                    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.18)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.02em",
                      color: theme === "dark" ? "#e2e8f0" : "#0f172a",
                    }}
                  >
                    {region.name}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#22c55e",
                          boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.15)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          color: theme === "dark" ? "#d1fae5" : "#166534",
                          fontWeight: 600,
                        }}
                      >
                        {goodLabel}
                      </span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 12,
                          fontWeight: 700,
                          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
                        }}
                      >
                        {region.good}
                      </span>
                    </div>
                    {showWarning && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#f59e0b",
                            boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.15)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: theme === "dark" ? "#fde68a" : "#92400e",
                            fontWeight: 600,
                          }}
                        >
                          {warningLabel}
                        </span>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 12,
                            fontWeight: 700,
                            color: theme === "dark" ? "#e2e8f0" : "#0f172a",
                          }}
                        >
                          {region.warning}
                        </span>
                      </div>
                    )}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#ef4444",
                          boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.15)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          color: theme === "dark" ? "#fecaca" : "#991b1b",
                          fontWeight: 600,
                        }}
                      >
                        {criticalLabel}
                      </span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 12,
                          fontWeight: 700,
                          color: theme === "dark" ? "#e2e8f0" : "#0f172a",
                        }}
                      >
                        {region.critical}
                      </span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}

        {/* Individual dots when zoomed in */}
        {!showPies &&
          detailedPoints.map((point) => (
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={7}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: getPointColor(point.status),
                fillOpacity: 0.9,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                {point.name}
              </Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 1000,
          pointerEvents: "auto",
          background: theme === "dark" ? "#111827" : "#ffffff",
          padding: 12,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: theme === "dark" ? "#d1d5db" : "#374151",
              }}
            >
              {goodLegendText}
            </span>
          </div>
          {showWarning && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#eab308",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: theme === "dark" ? "#d1d5db" : "#374151",
                }}
              >
                {warningLegendText}
              </span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: theme === "dark" ? "#d1d5db" : "#374151",
              }}
            >
              {criticalLegendText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
