"use client";
import { Card, StatCard } from "./Card";
import { RadioSpinsSection } from "./RadioSection";
import { ejJonesWeeklyData, ejJonesDailyData, ejJonesRadio, ejJonesRadioChart, ejJonesRadioStations } from "@/data/ej-jones";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#1e1e2e] border border-[#333] rounded-lg px-3 py-2 text-xs">
      <p className="text-white font-medium mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
      ))}
    </div>
  );
};

export default function EJJonesTab() {
  const latestWeek = ejJonesWeeklyData[ejJonesWeeklyData.length - 1];
  const prevWeek = ejJonesWeeklyData[ejJonesWeeklyData.length - 2];
  const wowChange = latestWeek.total - prevWeek.total;
  const audioRatio = latestWeek.audio > 0 ? ((latestWeek.audio / latestWeek.total) * 100).toFixed(1) : 'N/A';

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div>
        <h2 className="text-3xl font-bold text-white">EJ Jones</h2>
        <p className="text-[#8888a0] mt-1">"Gas Station Love" — US Streaming On-Demand</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="This Week Total" value={latestWeek.total} change={wowChange} />
        <StatCard label="This Week Audio" value={latestWeek.audio} />
        <StatCard label="Audio Share" value={`${audioRatio}%`} tooltip="Percentage of total streams from audio platforms (Spotify, Apple Music, etc.) vs video (YouTube). Higher = more audio-driven." />
        <StatCard label="Previous Week" value={prevWeek.total} />
      </div>

      {/* Weekly trend chart */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Weekly Streaming Totals (Total vs Audio)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ejJonesWeeklyData.filter(d => d.audio > 0)}>
              <defs>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="audioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="total" name="Total" stroke="#6366f1" fill="url(#totalGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="audio" name="Audio Only" stroke="#8b5cf6" fill="url(#audioGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Daily breakdown */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Daily Breakdown (Feb 13–19)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ejJonesDailyData}>
              <XAxis dataKey="day" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: '#6366f1' }} />
              <Line type="monotone" dataKey="audio" name="Audio" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Radio Spins */}
      <RadioSpinsSection
        formats={ejJonesRadio}
        charts={{ rhythmic: ejJonesRadioChart.rhythmic }}
        stations={ejJonesRadioStations}
        title="Radio Spins — Gas Station Love"
      />
    </div>
  );
}
