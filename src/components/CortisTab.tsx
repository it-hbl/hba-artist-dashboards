"use client";
import { Card, StatCard } from "./Card";
import { SpotifyPlaylistTable, AppleMusicPlaylistTable, AmazonPlaylistTable } from "./PlaylistTable";
import { RadioSpinsSection } from "./RadioSection";
import { cortisPlaylists, cortisRadio, cortisRadioStations } from "@/data/cortis";
import { cortisWeeklyData, cortisDailyData } from "@/data/cortis-streaming";
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
            <AreaChart data={cortisWeeklyData}>
              <defs>
                <linearGradient id="cortisTotalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="cortisAudioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="total" name="Total" stroke="#6366f1" fill="url(#cortisTotalGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="audio" name="Audio Only" stroke="#8b5cf6" fill="url(#cortisAudioGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Daily breakdown */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Daily Breakdown (Feb 13–19)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cortisDailyData}>
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
