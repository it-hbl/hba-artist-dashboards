"use client";
import { Card, StatCard } from "./Card";
import { SpotifyPlaylistTable, AppleMusicPlaylistTable, AmazonPlaylistTable } from "./PlaylistTable";
import { RadioSpinsSection } from "./RadioSection";
import { tylaPlaylists, tylaRadio, tylaRadioCharts } from "@/data/tyla";
import { tylaWeeklyData, tylaDailyData } from "@/data/tyla-streaming";
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

export default function TylaTab() {
  const latestWeek = tylaWeeklyData[tylaWeeklyData.length - 1];
  const prevWeek = tylaWeeklyData[tylaWeeklyData.length - 2];
  const wowChange = latestWeek.total - prevWeek.total;
  const audioRatio = latestWeek.audio > 0 ? ((latestWeek.audio / latestWeek.total) * 100).toFixed(1) : 'N/A';

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div>
        <h2 className="text-3xl font-bold text-white">Tyla</h2>
        <p className="text-[#8888a0] mt-1">"CHANEL" — US Streaming On-Demand</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="This Week Total" value={latestWeek.total} change={wowChange} />
        <StatCard label="This Week Audio" value={latestWeek.audio} />
        <StatCard label="Audio %" value={`${audioRatio}%`} />
        <StatCard label="Previous Week" value={prevWeek.total} />
      </div>

      {/* Weekly trend chart */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Weekly Streaming Totals (Total vs Audio)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tylaWeeklyData}>
              <defs>
                <linearGradient id="tylaTotalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="tylaAudioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="total" name="Total" stroke="#6366f1" fill="url(#tylaTotalGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="audio" name="Audio Only" stroke="#8b5cf6" fill="url(#tylaAudioGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Daily breakdown */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Daily Breakdown (Feb 13–19)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tylaDailyData}>
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
            <p className="text-3xl font-bold text-[#1DB954]">{tylaPlaylists.spotify.length}</p>
            <p className="text-xs text-[#8888a0] mt-1">Spotify Playlists</p>
          </div>
          <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#fc3c44]">{tylaPlaylists.appleMusic.length}</p>
            <p className="text-xs text-[#8888a0] mt-1">Apple Music Playlists</p>
          </div>
          <div className="bg-[#16161f] border border-[#1e1e2e] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-[#00a8e1]">{tylaPlaylists.amazon.length}</p>
            <p className="text-xs text-[#8888a0] mt-1">Amazon Playlists</p>
          </div>
        </div>
      </div>

      <SpotifyPlaylistTable data={tylaPlaylists.spotify} />
      <AppleMusicPlaylistTable data={tylaPlaylists.appleMusic} />
      <AmazonPlaylistTable data={tylaPlaylists.amazon} />

      <RadioSpinsSection
        formats={tylaRadio}
        charts={tylaRadioCharts}
        title="Radio Spins — CHANEL"
      />
    </div>
  );
}
