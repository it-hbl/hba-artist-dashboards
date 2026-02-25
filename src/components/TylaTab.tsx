"use client";
import { Card, StatCard } from "./Card";
import { SpotifyPlaylistTable, AppleMusicPlaylistTable, AmazonPlaylistTable } from "./PlaylistTable";
import { RadioSpinsSection } from "./RadioSection";
import { tylaPlaylists, tylaRadio, tylaRadioCharts } from "@/data/tyla";
import { tylaWeeklyData, tylaDailyData } from "@/data/tyla-streaming";
import { DSP_COLORS, dailyTrackerDates, dailyTrackerData, weeklyStreamsData, socialFollowersData, radioData } from "@/data/tyla-extra";
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
        <StatCard label="This Week Total" value={latestWeek.total} change={wowChange} tooltip="Total on-demand streams across all platforms: Spotify, Apple Music, YouTube, Amazon Music, Pandora, and other DSPs." />
        <StatCard label="This Week Audio" value={latestWeek.audio} tooltip="Audio-only streams from platforms like Spotify, Apple Music, Amazon Music, and Pandora. Excludes video streams (YouTube)." />
        <StatCard label="Audio Share" value={`${audioRatio}%`} tooltip="Percentage of total streams from audio platforms (Spotify, Apple Music, etc.) vs video (YouTube). Higher = more audio-driven." />
        <StatCard label="Previous Week" value={prevWeek.total} pctChange={((latestWeek.total - prevWeek.total) / prevWeek.total) * 100} sparkData={tylaWeeklyData.slice(-6).map(w => w.total)} />
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

      {/* Daily Platform Tracker */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Daily Platform Tracker (Feb 16–22, 2026)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="text-left py-2 pr-3 text-[#8888a0] font-medium">DSP</th>
                <th className="text-left py-2 pr-3 text-[#8888a0] font-medium">Metric</th>
                {dailyTrackerDates.map(d => <th key={d} className="text-right py-2 px-2 text-[#8888a0] font-medium">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {dailyTrackerData.map((row, i) => (
                <tr key={i} className="border-b border-[#1e1e2e] hover:bg-[#1a1a28]">
                  <td className="py-2 pr-3 font-medium" style={{ color: DSP_COLORS[row.dsp] || '#fff' }}>{row.dsp}</td>
                  <td className="py-2 pr-3 text-[#ccc]">{row.metric}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="text-right py-2 px-2 text-white tabular-nums">
                      {v !== null ? v.toLocaleString() : <span className="text-[#555]">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Weekly Streams On-Demand */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Weekly Streams On-Demand</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="text-left py-2 text-[#8888a0] font-medium">Market</th>
                <th className="text-right py-2 text-[#8888a0] font-medium">Release to Date</th>
                <th className="text-right py-2 text-[#8888a0] font-medium">Last Week</th>
                <th className="text-right py-2 text-[#8888a0] font-medium">This Week</th>
                <th className="text-right py-2 text-[#8888a0] font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {weeklyStreamsData.map((row, i) => (
                <tr key={i} className={`border-b border-[#1e1e2e] hover:bg-[#1a1a28] ${row.market === 'US' ? 'border-t border-t-[#333]' : ''}`}>
                  <td className="py-2 text-white font-medium">{row.market}</td>
                  <td className="text-right py-2 text-white tabular-nums">{row.atd.toLocaleString()}</td>
                  <td className="text-right py-2 text-[#ccc] tabular-nums">{row.lp.toLocaleString()}</td>
                  <td className="text-right py-2 text-white tabular-nums">{row.tp.toLocaleString()}</td>
                  <td className={`text-right py-2 font-medium tabular-nums ${row.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {row.trend >= 0 ? '↑' : '↓'} {Math.abs(row.trend).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Social Followers */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Social Followers (Weekly)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {socialFollowersData.map((s) => (
            <div key={s.platform} className="bg-[#12121a] rounded-lg p-4 border border-[#1e1e2e]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-sm font-medium" style={{ color: s.color }}>{s.platform}</span>
              </div>
              <p className="text-xl font-bold text-white">{s.tp >= 1000000 ? `${(s.tp / 1000000).toFixed(1)}M` : `${(s.tp / 1000).toFixed(0)}K`}</p>
              <p className={`text-xs mt-1 font-medium ${s.trend > 0 ? 'text-emerald-400' : s.trend < 0 ? 'text-red-400' : 'text-[#8888a0]'}`}>
                {s.trend > 0 ? '↑' : s.trend < 0 ? '↓' : '—'} {Math.abs(s.trend).toFixed(2)}% WoW
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Radio Charts */}
      <Card>
        <h3 className="font-semibold text-white mb-4">Radio Charts — CHANEL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider">Building (Daily)</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#333]">
                  <th className="text-left py-2 text-[#8888a0] font-medium">Format</th>
                  <th className="text-center py-2 text-[#8888a0] font-medium">LW</th>
                  <th className="text-center py-2 text-[#8888a0] font-medium">TW</th>
                  <th className="text-right py-2 text-[#8888a0] font-medium">+/-</th>
                  <th className="text-right py-2 text-[#8888a0] font-medium">Gainer</th>
                </tr>
              </thead>
              <tbody>
                {radioData.map((r) => (
                  <tr key={r.format} className="border-b border-[#1e1e2e]">
                    <td className="py-2 text-white font-medium">{r.format}</td>
                    <td className="text-center py-2 text-[#ccc]">{r.buildRankLW}</td>
                    <td className="text-center py-2 text-white font-bold">{r.buildRankTW}</td>
                    <td className="text-right py-2 text-emerald-400">+{r.buildMove}</td>
                    <td className="text-right py-2 text-yellow-400">{r.buildGainer || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider">Publishing (Weekly)</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#333]">
                  <th className="text-left py-2 text-[#8888a0] font-medium">Format</th>
                  <th className="text-center py-2 text-[#8888a0] font-medium">LW</th>
                  <th className="text-center py-2 text-[#8888a0] font-medium">TW</th>
                  <th className="text-right py-2 text-[#8888a0] font-medium">+/-</th>
                  <th className="text-right py-2 text-[#8888a0] font-medium">Gainer</th>
                </tr>
              </thead>
              <tbody>
                {radioData.map((r) => (
                  <tr key={r.format} className="border-b border-[#1e1e2e]">
                    <td className="py-2 text-white font-medium">{r.format}</td>
                    <td className="text-center py-2 text-[#ccc]">{r.pubRankLW}</td>
                    <td className="text-center py-2 text-white font-bold">{r.pubRankTW}</td>
                    <td className="text-right py-2 text-emerald-400">+{r.pubMove}</td>
                    <td className="text-right py-2 text-yellow-400">{r.pubGainer || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
