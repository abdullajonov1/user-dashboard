import { UzbekistanMap } from "../UzbekistanMap";
import { DrillDownChart } from "../DrillDownChart.tsx";
import { FilterPanel } from "../FilterPanel";
import { CategoryActivityPanel } from "../CategoryActivityPanel";
import type { ThemeType } from "../../App";

interface DebtorsDashboardProps {
  theme: ThemeType;
}

export function DebtorsDashboard({ theme }: DebtorsDashboardProps) {
  const activities = ["AGTKSH", "Issiqxona, Tekstil", "Parrandachilik"];
  const networkStatuses = ["Tarmoqdan ajratilgan", "Tarmoqdan ajratilmagan"];

  const mapPoints = [
    // Toshkent - yaxshi ahvol
    {
      id: "t1",
      name: "Toshkent",
      lat: 41.2995,
      lng: 69.2401,
      status: "good" as const,
      region: "toshkent",
    },
    {
      id: "t2",
      name: "Toshkent",
      lat: 41.32,
      lng: 69.28,
      status: "good" as const,
      region: "toshkent",
    },
    {
      id: "t3",
      name: "Toshkent",
      lat: 41.28,
      lng: 69.2,
      status: "warning" as const,
      region: "toshkent",
    },
    // Samarqand - og'ir ahvol
    {
      id: "s1",
      name: "Samarqand",
      lat: 39.6542,
      lng: 66.9597,
      status: "critical" as const,
      region: "samarqand",
    },
    {
      id: "s2",
      name: "Samarqand",
      lat: 39.68,
      lng: 66.98,
      status: "critical" as const,
      region: "samarqand",
    },
    {
      id: "s3",
      name: "Samarqand",
      lat: 39.63,
      lng: 66.94,
      status: "warning" as const,
      region: "samarqand",
    },
    {
      id: "s4",
      name: "Samarqand",
      lat: 39.67,
      lng: 66.97,
      status: "good" as const,
      region: "samarqand",
    },
    // Farg'ona
    {
      id: "f1",
      name: "Farg'ona",
      lat: 40.3864,
      lng: 71.7864,
      status: "warning" as const,
      region: "fargona",
    },
    {
      id: "f2",
      name: "Farg'ona",
      lat: 40.4,
      lng: 71.8,
      status: "good" as const,
      region: "fargona",
    },
    {
      id: "f3",
      name: "Farg'ona",
      lat: 40.37,
      lng: 71.77,
      status: "warning" as const,
      region: "fargona",
    },
    // Andijon
    {
      id: "a1",
      name: "Andijon",
      lat: 40.7829,
      lng: 72.3442,
      status: "good" as const,
      region: "andijon",
    },
    {
      id: "a2",
      name: "Andijon",
      lat: 40.8,
      lng: 72.36,
      status: "good" as const,
      region: "andijon",
    },
    {
      id: "a3",
      name: "Andijon",
      lat: 40.77,
      lng: 72.33,
      status: "warning" as const,
      region: "andijon",
    },
    // Namangan
    {
      id: "n1",
      name: "Namangan",
      lat: 40.9983,
      lng: 71.6726,
      status: "warning" as const,
      region: "namangan",
    },
    {
      id: "n2",
      name: "Namangan",
      lat: 41.01,
      lng: 71.69,
      status: "good" as const,
      region: "namangan",
    },
    {
      id: "n3",
      name: "Namangan",
      lat: 40.98,
      lng: 71.65,
      status: "critical" as const,
      region: "namangan",
    },
    // Buxoro
    {
      id: "b1",
      name: "Buxoro",
      lat: 39.767,
      lng: 64.423,
      status: "critical" as const,
      region: "buxoro",
    },
    {
      id: "b2",
      name: "Buxoro",
      lat: 39.79,
      lng: 64.44,
      status: "critical" as const,
      region: "buxoro",
    },
    {
      id: "b3",
      name: "Buxoro",
      lat: 39.75,
      lng: 64.4,
      status: "good" as const,
      region: "buxoro",
    },
    // Navoiy
    {
      id: "v1",
      name: "Navoiy",
      lat: 40.103,
      lng: 65.368,
      status: "good" as const,
      region: "navoiy",
    },
    {
      id: "v2",
      name: "Navoiy",
      lat: 40.12,
      lng: 65.39,
      status: "good" as const,
      region: "navoiy",
    },
    {
      id: "v3",
      name: "Navoiy",
      lat: 40.09,
      lng: 65.35,
      status: "critical" as const,
      region: "navoiy",
    },
    // Qashqadaryo
    {
      id: "q1",
      name: "Qashqadaryo",
      lat: 38.86,
      lng: 65.79,
      status: "warning" as const,
      region: "qashqadaryo",
    },
    {
      id: "q2",
      name: "Qashqadaryo",
      lat: 38.88,
      lng: 65.81,
      status: "warning" as const,
      region: "qashqadaryo",
    },
    {
      id: "q3",
      name: "Qashqadaryo",
      lat: 38.84,
      lng: 65.77,
      status: "good" as const,
      region: "qashqadaryo",
    },
    // Surxondaryo
    {
      id: "x1",
      name: "Surxondaryo",
      lat: 37.224,
      lng: 67.278,
      status: "warning" as const,
      region: "surxondaryo",
    },
    {
      id: "x2",
      name: "Surxondaryo",
      lat: 37.25,
      lng: 67.3,
      status: "good" as const,
      region: "surxondaryo",
    },
    {
      id: "x3",
      name: "Surxondaryo",
      lat: 37.2,
      lng: 67.26,
      status: "critical" as const,
      region: "surxondaryo",
    },
    // Xorazm
    {
      id: "h1",
      name: "Xorazm",
      lat: 41.55,
      lng: 60.63,
      status: "critical" as const,
      region: "xorazm",
    },
    {
      id: "h2",
      name: "Xorazm",
      lat: 41.57,
      lng: 60.65,
      status: "warning" as const,
      region: "xorazm",
    },
    {
      id: "h3",
      name: "Xorazm",
      lat: 41.53,
      lng: 60.61,
      status: "good" as const,
      region: "xorazm",
    },
    // Qoraqalpog'iston
    {
      id: "k1",
      name: "Qoraqalpog'iston",
      lat: 42.46,
      lng: 59.61,
      status: "good" as const,
      region: "qoraqalpogiston",
    },
    {
      id: "k2",
      name: "Qoraqalpog'iston",
      lat: 42.48,
      lng: 59.63,
      status: "good" as const,
      region: "qoraqalpogiston",
    },
    {
      id: "k3",
      name: "Qoraqalpog'iston",
      lat: 42.44,
      lng: 59.59,
      status: "warning" as const,
      region: "qoraqalpogiston",
    },
    // Jizzax
    {
      id: "j1",
      name: "Jizzax",
      lat: 40.12,
      lng: 67.83,
      status: "warning" as const,
      region: "jizzax",
    },
    {
      id: "j2",
      name: "Jizzax",
      lat: 40.14,
      lng: 67.85,
      status: "good" as const,
      region: "jizzax",
    },
    {
      id: "j3",
      name: "Jizzax",
      lat: 40.1,
      lng: 67.81,
      status: "critical" as const,
      region: "jizzax",
    },
    // Sirdaryo
    {
      id: "d1",
      name: "Sirdaryo",
      lat: 40.496,
      lng: 68.786,
      status: "good" as const,
      region: "sirdaryo",
    },
    {
      id: "d2",
      name: "Sirdaryo",
      lat: 40.51,
      lng: 68.8,
      status: "good" as const,
      region: "sirdaryo",
    },
    {
      id: "d3",
      name: "Sirdaryo",
      lat: 40.48,
      lng: 68.77,
      status: "warning" as const,
      region: "sirdaryo",
    },
  ];

  const chartData = [
    {
      name: "Toshkent",
      value: 95,
      children: [
        {
          name: "Chilonzor",
          value: 96,
          children: [
            { name: "MFY 1", value: 97 },
            { name: "MFY 2", value: 95 },
          ],
        },
        {
          name: "Yunusobod",
          value: 94,
          children: [
            { name: "MFY 1", value: 93 },
            { name: "MFY 2", value: 95 },
          ],
        },
      ],
    },
    {
      name: "Samarqand",
      value: 65,
      children: [
        {
          name: "Samarqand sh.",
          value: 70,
          children: [
            { name: "MFY 1", value: 68 },
            { name: "MFY 2", value: 72 },
          ],
        },
        {
          name: "Kattaqo'rg'on",
          value: 60,
          children: [
            { name: "MFY 1", value: 58 },
            { name: "MFY 2", value: 62 },
          ],
        },
      ],
    },
    {
      name: "Farg'ona",
      value: 82,
      children: [
        {
          name: "Farg'ona sh.",
          value: 85,
          children: [
            { name: "MFY 1", value: 84 },
            { name: "MFY 2", value: 86 },
          ],
        },
        {
          name: "Quvasoy",
          value: 79,
          children: [
            { name: "MFY 1", value: 78 },
            { name: "MFY 2", value: 80 },
          ],
        },
      ],
    },
    {
      name: "Buxoro",
      value: 68,
      children: [
        {
          name: "Buxoro sh.",
          value: 72,
          children: [
            { name: "MFY 1", value: 71 },
            { name: "MFY 2", value: 73 },
          ],
        },
        {
          name: "Kogon",
          value: 64,
          children: [
            { name: "MFY 1", value: 63 },
            { name: "MFY 2", value: 65 },
          ],
        },
      ],
    },
    {
      name: "Andijon",
      value: 88,
      children: [
        {
          name: "Andijon sh.",
          value: 90,
          children: [
            { name: "MFY 1", value: 89 },
            { name: "MFY 2", value: 91 },
          ],
        },
        {
          name: "Asaka",
          value: 86,
          children: [
            { name: "MFY 1", value: 85 },
            { name: "MFY 2", value: 87 },
          ],
        },
      ],
    },
    {
      name: "Namangan",
      value: 84,
      children: [
        {
          name: "Namangan sh.",
          value: 86,
          children: [
            { name: "MFY 1", value: 85 },
            { name: "MFY 2", value: 87 },
          ],
        },
        {
          name: "Chortoq",
          value: 82,
          children: [
            { name: "MFY 1", value: 81 },
            { name: "MFY 2", value: 83 },
          ],
        },
      ],
    },
    {
      name: "Navoiy",
      value: 91,
      children: [
        {
          name: "Navoiy sh.",
          value: 93,
          children: [
            { name: "MFY 1", value: 92 },
            { name: "MFY 2", value: 94 },
          ],
        },
        {
          name: "Zarafshon",
          value: 89,
          children: [
            { name: "MFY 1", value: 88 },
            { name: "MFY 2", value: 90 },
          ],
        },
      ],
    },
    {
      name: "Qashqadaryo",
      value: 78,
      children: [
        {
          name: "Qarshi",
          value: 80,
          children: [
            { name: "MFY 1", value: 79 },
            { name: "MFY 2", value: 81 },
          ],
        },
        {
          name: "Shahrisabz",
          value: 76,
          children: [
            { name: "MFY 1", value: 75 },
            { name: "MFY 2", value: 77 },
          ],
        },
      ],
    },
    {
      name: "Surxondaryo",
      value: 74,
      children: [
        {
          name: "Termiz",
          value: 76,
          children: [
            { name: "MFY 1", value: 75 },
            { name: "MFY 2", value: 77 },
          ],
        },
        {
          name: "Denov",
          value: 72,
          children: [
            { name: "MFY 1", value: 71 },
            { name: "MFY 2", value: 73 },
          ],
        },
      ],
    },
    {
      name: "Jizzax",
      value: 83,
      children: [
        {
          name: "Jizzax sh.",
          value: 85,
          children: [
            { name: "MFY 1", value: 84 },
            { name: "MFY 2", value: 86 },
          ],
        },
        {
          name: "Zomin",
          value: 81,
          children: [
            { name: "MFY 1", value: 80 },
            { name: "MFY 2", value: 82 },
          ],
        },
      ],
    },
    {
      name: "Sirdaryo",
      value: 79,
      children: [
        {
          name: "Guliston",
          value: 81,
          children: [
            { name: "MFY 1", value: 80 },
            { name: "MFY 2", value: 82 },
          ],
        },
        {
          name: "Yangiyer",
          value: 77,
          children: [
            { name: "MFY 1", value: 76 },
            { name: "MFY 2", value: 78 },
          ],
        },
      ],
    },
    {
      name: "Xorazm",
      value: 62,
      children: [
        {
          name: "Urganch",
          value: 65,
          children: [
            { name: "MFY 1", value: 64 },
            { name: "MFY 2", value: 66 },
          ],
        },
        {
          name: "Xiva",
          value: 59,
          children: [
            { name: "MFY 1", value: 58 },
            { name: "MFY 2", value: 60 },
          ],
        },
      ],
    },
    {
      name: "Qoraqalpog'iston",
      value: 96,
      children: [
        {
          name: "Nukus",
          value: 97,
          children: [
            { name: "MFY 1", value: 96 },
            { name: "MFY 2", value: 98 },
          ],
        },
        {
          name: "To'rtko'l",
          value: 95,
          children: [
            { name: "MFY 1", value: 94 },
            { name: "MFY 2", value: 96 },
          ],
        },
      ],
    },
  ];

  return (
    <div className="py-2 space-y-2">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <div
            className="grid gap-2 items-start"
            style={{
              gridTemplateColumns:
                "minmax(320px, 0.55fr) minmax(700px, 1.85fr)",
            }}
          >
            <div className="min-w-0">
              <div style={{ marginBottom: 12 }}>
                <CategoryActivityPanel
                  theme={theme}
                  sections={[
                    {
                      title: "Kreditor iste'molchilar",
                      layout: "cards",
                      items: [
                        {
                          label: "Oldindan to'lov sumasi yetarli",
                          value: "100%, 50%",
                          amount: "6,420",
                          color: "green",
                        },
                        {
                          label: "Oldindan to'lov summasi kam",
                          value: "30%, 60%",
                          amount: "4,810",
                          color: "red",
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <DrillDownChart
                theme={theme}
                data={chartData}
                title="Qarzdorlar statistikasi (to'lov foizi)"
              />
            </div>
            <div className="min-w-0">
              <UzbekistanMap
                theme={theme}
                points={mapPoints}
                height={1300}
                showWarning={false}
                forceMixedPies
                goodLabel="Tolov yetarli"
                criticalLabel="Tolov kam"
                goodLegendText="Tolov yetarli"
                criticalLegendText="Tolov kam"
                overlay={
                  <FilterPanel
                    theme={theme}
                    activities={activities}
                    networkStatuses={networkStatuses}
                    insideMap
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
