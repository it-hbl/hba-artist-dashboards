"use client";
import { Card, StatCard } from "./Card";
import { SpotifyPlaylistTable, AppleMusicPlaylistTable, AmazonPlaylistTable } from "./PlaylistTable";
import { RadioSpinsSection } from "./RadioSection";
import { cortisPlaylists, cortisRadio, cortisRadioStations } from "@/data/cortis";
import { cortisWeeklyData, cortisDailyData } from "@/data/cortis-streaming";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AnnotatedAreaChart from "./AnnotatedAreaChart";
import { computeDoD, makeDailyDot, makeDailyTooltip } from "./DailyDoD";

const cortisDodData = computeDoD(cortisDailyData);
const CortisDailyDot = makeDailyDot(cortisDodData);
const CortisDailyTooltip = makeDailyTooltip(cortisDodData);

const cortisAnnotations = [
  { label: 'Sep 12', pctChange: 53.7, reason: 'Initial release surge — strong first-week momentum for "GO!"' },
];

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

export default function CortisTab() {
  const latestWeek = cortisWeeklyData[cortisWeeklyData.length - 1];
  const prevWeek = cortisWeeklyData[cortisWeeklyData.length - 2];
  const wowChange = latestWeek.total - prevWeek.total;
  const audioRatio = latestWeek.audio > 0 ? ((latestWeek.audio / latestWeek.total) * 100).toFixed(1) : 'N/A';

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div>
        <h2 className="text-3xl font-bold text-white">CORTIS</h2>
        <p className="text-[#8888a0] mt-1">"GO!" — US Streaming On-Demand</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="This Week Total" value={latestWeek.total} change={wowChange} tooltip="Total on-demand streams across all platforms: Spotify, Apple Music, YouTube, Amazon Music, Pandora, and other DSPs." />
        <StatCard label="This Week Audio" value={latestWeek.audio} tooltip="Audio-only streams from platforms like Spotify, Apple Music, Amazon Music, and Pandora. Excludes video streams (YouTube)." />
        <StatCard label="Audio Share" value={`${audioRatio}%`} tooltip="Percentage of total streams from audio platforms (Spotify, Apple Music, etc.) vs video (YouTube). Higher = more audio-driven." />
        <StatCard label="Previous Week" value={prevWeek.total} tooltip="Last week's total on-demand streams. The percentage and sparkline show the week-over-week trend across the last 6 weeks." pctChange={((latestWeek.total - prevWeek.total) / prevWeek.total) * 100} sparkData={cortisWeeklyData.slice(-6).map(w => w.total)} />
      </div>

      {/* Weekly trend chart */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Weekly Streaming Totals (Total vs Audio)</h3>
        <AnnotatedAreaChart
          data={cortisWeeklyData}
          annotations={cortisAnnotations}
          totalGradId="cortisTotalGrad"
          audioGradId="cortisAudioGrad"
        />
      </Card>

      {/* Daily breakdown */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Daily Breakdown (Feb 13–19)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cortisDodData}>
              <XAxis dataKey="day" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CortisDailyTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#6366f1" strokeWidth={2} dot={<CortisDailyDot dataKey="total" />} />
              <Line type="monotone" dataKey="audio" name="Audio" stroke="#8b5cf6" strokeWidth={2} dot={<CortisDailyDot dataKey="audio" />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-[#555570] mt-2">● Dots highlight day-over-day changes {'>'} 5% — green for growth, red for decline</p>
      </Card>

      {/* Playlists */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Playlisting</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#1DB954]">{cortisPlaylists.spotify.length}</p>
            <p className="text-xs text-[#8888a0] mt-1">Spotify Playlists</p>
          </div>
          <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#fc3c44]">{cortisPlaylists.appleMusic.length}</p>
            <p className="text-xs text-[#8888a0] mt-1">Apple Music Playlists</p>
          </div>
          <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#555]">0</p>
            <p className="text-xs text-[#8888a0] mt-1">Amazon Playlists</p>
          </div>
        </div>
      </div>

      <SpotifyPlaylistTable data={cortisPlaylists.spotify} />
      <AppleMusicPlaylistTable data={cortisPlaylists.appleMusic} />
      <AmazonPlaylistTable data={cortisPlaylists.amazon} />

      <RadioSpinsSection
        formats={cortisRadio}
        stations={{ "TOP 40": cortisRadioStations }}
        title="Radio Spins — GO!"
      />
    </div>
  );
}
