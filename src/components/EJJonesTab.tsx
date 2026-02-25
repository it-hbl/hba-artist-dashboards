"use client";
import { Card, StatCard } from "./Card";
import { RadioSpinsSection } from "./RadioSection";
import { ejJonesWeeklyData, ejJonesDailyData, ejJonesRadio, ejJonesRadioChart, ejJonesRadioStations } from "@/data/ej-jones";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AnnotatedAreaChart from "./AnnotatedAreaChart";
import { computeDoD, makeDailyDot, makeDailyTooltip } from "./DailyDoD";

const ejAnnotations = [
  { label: 'Oct 17', pctChange: -34.1, reason: 'Post-release cooldown after initial promotional push' },
  { label: 'Jan 23', pctChange: -29.5, reason: 'Pre-spike dip — possible algorithm reset before major playlist add' },
  { label: 'Jan 30', pctChange: 259.2, reason: 'Likely major playlist placement or viral moment driving ~3.6x streaming increase' },
];

const ejDailyWithDoD = computeDoD(ejJonesDailyData);
const EJDailyDot = makeDailyDot(ejDailyWithDoD);
const EJDailyTooltip = makeDailyTooltip(ejDailyWithDoD);


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
        <StatCard label="This Week Total" value={latestWeek.total} change={wowChange} tooltip="Total on-demand streams across all platforms: Spotify, Apple Music, YouTube, Amazon Music, Pandora, and other DSPs." />
        <StatCard label="This Week Audio" value={latestWeek.audio} tooltip="Audio-only streams from platforms like Spotify, Apple Music, Amazon Music, and Pandora. Excludes video streams (YouTube)." />
        <StatCard label="Audio Share" value={`${audioRatio}%`} tooltip="Percentage of total streams from audio platforms (Spotify, Apple Music, etc.) vs video (YouTube). Higher = more audio-driven." />
        <StatCard label="Previous Week" value={prevWeek.total} tooltip="Last week's total on-demand streams. The percentage and sparkline show the week-over-week trend across the last 6 weeks." pctChange={((latestWeek.total - prevWeek.total) / prevWeek.total) * 100} sparkData={ejJonesWeeklyData.slice(-6).map(w => w.total)} />
      </div>

      {/* Weekly trend chart */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Weekly Streaming Totals (Total vs Audio)</h3>
        <AnnotatedAreaChart
          data={ejJonesWeeklyData.filter(d => d.audio > 0)}
          annotations={ejAnnotations}
          totalGradId="totalGrad"
          audioGradId="audioGrad"
        />
      </Card>

      {/* Daily breakdown */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Daily Breakdown (Feb 13–19)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ejDailyWithDoD}>
              <XAxis dataKey="day" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<EJDailyTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#6366f1" strokeWidth={2} dot={<EJDailyDot dataKey="total" />} />
              <Line type="monotone" dataKey="audio" name="Audio" stroke="#8b5cf6" strokeWidth={2} dot={<EJDailyDot dataKey="audio" />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-[#555570] mt-2">● Dots highlight day-over-day changes {'>'} 5% — green for growth, red for decline</p>
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
