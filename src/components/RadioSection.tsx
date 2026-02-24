"use client";
import { Card, StatCard } from "./Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type RadioFormat = {
  dates: string[];
  daily: number[];
  weeklyTP: number;
  plusMinus: number;
  prevWeek: number;
  dayparts: { OVN: number; AMD: number; MID: number; PMD: number; EVE: number };
  historicalTotal: number;
};

type ChartEntry = {
  rank: number;
  lastWeek: number;
  peak: number;
  weeksOn: number;
  spinsTW: number;
  spinsLW: number;
  change: number;
};

type StationEntry = {
  station: string;
  weeklyTP: number;
  plusMinus: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#1e1e2e] border border-[#333] rounded-lg px-3 py-2 text-xs">
      <p className="text-white font-medium">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export function RadioSpinsSection({ formats, charts, stations, title = "Radio Spins" }: {
  formats: Record<string, RadioFormat>;
  charts?: Record<string, ChartEntry>;
  stations?: Record<string, StationEntry[]>;
  title?: string;
}) {
  const totalSpins = Object.values(formats).reduce((sum, f) => sum + f.weeklyTP, 0);
  const totalChange = Object.values(formats).reduce((sum, f) => sum + f.plusMinus, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Spins (Week)" value={totalSpins} change={totalChange} />
        {Object.entries(formats).map(([name, data]) => (
          <StatCard key={name} label={`${name} Spins`} value={data.weeklyTP} change={data.plusMinus} />
        ))}
      </div>

      {/* Chart positions */}
      {charts && Object.keys(charts).length > 0 && (
        <Card>
          <h3 className="font-semibold text-white mb-4">Chart Positions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(charts).map(([name, chart]) => (
              <div key={name} className="bg-[#0a0a0f] rounded-lg p-4">
                <p className="text-xs text-[#8888a0] uppercase mb-1">{name.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-3xl font-bold text-white">#{chart.rank}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#8888a0]">LW: #{chart.lastWeek}</span>
                  <span className="text-xs text-[#8888a0]">PK: #{chart.peak}</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className="text-[#8888a0]">Spins: </span>
                  <span className="text-white">{chart.spinsTW.toLocaleString()}</span>
                  <span className={`ml-1 ${chart.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    ({chart.change >= 0 ? '+' : ''}{chart.change})
                  </span>
                </div>
                <p className="text-xs text-[#8888a0] mt-1">{chart.weeksOn}w on chart</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Daypart breakdown per format */}
      {Object.entries(formats).map(([name, data]) => (
        <Card key={name}>
          <h3 className="font-semibold text-white mb-4">{name} — Daily Spins & Daypart Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Daily bar chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.dates.map((d, i) => ({ date: d, spins: data.daily[i] }))}>
                  <XAxis dataKey="date" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="spins" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Dayparts */}
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(data.dayparts).map(([dp, val]) => (
                <div key={dp} className="bg-[#0a0a0f] rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#8888a0] uppercase">{dp}</p>
                  <p className="text-lg font-bold text-white">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}

      {/* Station tables */}
      {stations && Object.entries(stations).map(([name, stationList]) => (
        <Card key={name}>
          <h3 className="font-semibold text-white mb-4">{name} — Top Stations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#8888a0] text-xs uppercase">
                  <th className="text-left pb-3">Station</th>
                  <th className="text-right pb-3">Spins (TP)</th>
                  <th className="text-right pb-3">+/-</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2e]">
                {stationList.sort((a, b) => b.weeklyTP - a.weeklyTP).slice(0, 15).map((s, i) => (
                  <tr key={i} className="hover:bg-[#1e1e2e]/50">
                    <td className="py-2 text-white">{s.station}</td>
                    <td className="py-2 text-right font-mono">{s.weeklyTP}</td>
                    <td className={`py-2 text-right font-mono ${s.plusMinus >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {s.plusMinus >= 0 ? '+' : ''}{s.plusMinus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
