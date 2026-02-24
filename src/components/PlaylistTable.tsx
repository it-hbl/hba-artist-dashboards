"use client";
import { useState } from "react";
import { Card } from "./Card";

type SortKey = "playlist" | "currentPosition" | "daysOn" | "peakPosition";
type SortDir = "asc" | "desc";

function parsePosition(pos: string): number {
  const match = pos.match(/^(\d+)/);
  return match ? parseInt(match[1]) : 999;
}

export function SpotifyPlaylistTable({ data }: { data: Array<{ playlist: string; owner: string; peakPosition: number; currentPosition: string; daysOn: number }> }) {
  const [sortKey, setSortKey] = useState<SortKey>("daysOn");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...data].sort((a, b) => {
    let av: number, bv: number;
    if (sortKey === "currentPosition") { av = parsePosition(a.currentPosition); bv = parsePosition(b.currentPosition); }
    else if (sortKey === "playlist") { return sortDir === "asc" ? a.playlist.localeCompare(b.playlist) : b.playlist.localeCompare(a.playlist); }
    else { av = a[sortKey] as number; bv = b[sortKey] as number; }
    return sortDir === "asc" ? av - bv : bv - av;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => sortKey === k ? <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span> : null;

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
          <span className="text-[10px] font-bold text-black">S</span>
        </div>
        <h3 className="font-semibold text-white">Spotify Global</h3>
        <span className="text-xs text-[#8888a0] ml-auto">{data.length} playlists</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#8888a0] text-xs uppercase">
              <th className="text-left pb-3 cursor-pointer hover:text-white" onClick={() => toggleSort("playlist")}>Playlist<SortIcon k="playlist" /></th>
              <th className="text-center pb-3 cursor-pointer hover:text-white" onClick={() => toggleSort("peakPosition")}>Peak<SortIcon k="peakPosition" /></th>
              <th className="text-center pb-3 cursor-pointer hover:text-white" onClick={() => toggleSort("currentPosition")}>Position<SortIcon k="currentPosition" /></th>
              <th className="text-right pb-3 cursor-pointer hover:text-white" onClick={() => toggleSort("daysOn")}>Days On<SortIcon k="daysOn" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2e]">
            {sorted.map((row, i) => (
              <tr key={i} className="hover:bg-[#1e1e2e]/50">
                <td className="py-2.5 text-white font-medium">{row.playlist}</td>
                <td className="py-2.5 text-center text-[#8888a0]">{row.peakPosition}</td>
                <td className="py-2.5 text-center"><span className="bg-[#1e1e2e] px-2 py-0.5 rounded text-xs">{row.currentPosition}</span></td>
                <td className="py-2.5 text-right text-[#8888a0]">{row.daysOn}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function AppleMusicPlaylistTable({ data }: { data: Array<{ playlist: string; curator: string; country: string; currentPosition: string; daysOn: number }> }) {
  const [sortKey, setSortKey] = useState<"daysOn" | "currentPosition">("daysOn");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...data].sort((a, b) => {
    if (sortKey === "currentPosition") return sortDir === "asc" ? parsePosition(a.currentPosition) - parsePosition(b.currentPosition) : parsePosition(b.currentPosition) - parsePosition(a.currentPosition);
    return sortDir === "asc" ? a.daysOn - b.daysOn : b.daysOn - a.daysOn;
  });

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#fc3c44] to-[#c53030] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">♫</span>
        </div>
        <h3 className="font-semibold text-white">Apple Music Global</h3>
        <span className="text-xs text-[#8888a0] ml-auto">{data.length} playlists</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#8888a0] text-xs uppercase">
              <th className="text-left pb-3">Playlist</th>
              <th className="text-center pb-3">Country</th>
              <th className="text-center pb-3 cursor-pointer hover:text-white" onClick={() => toggleSort("currentPosition")}>Position</th>
              <th className="text-right pb-3 cursor-pointer hover:text-white" onClick={() => toggleSort("daysOn")}>Days On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2e]">
            {sorted.map((row, i) => (
              <tr key={i} className="hover:bg-[#1e1e2e]/50">
                <td className="py-2.5">
                  <div className="text-white font-medium">{row.playlist}</div>
                  <div className="text-xs text-[#8888a0]">{row.curator}</div>
                </td>
                <td className="py-2.5 text-center"><span className="bg-[#1e1e2e] px-2 py-0.5 rounded text-xs font-mono">{row.country}</span></td>
                <td className="py-2.5 text-center text-[#8888a0]">{row.currentPosition}</td>
                <td className="py-2.5 text-right text-[#8888a0]">{row.daysOn}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function AmazonPlaylistTable({ data }: { data: Array<{ playlist: string; owner: string; country: string; currentPosition: string; daysOn: number }> }) {
  if (data.length === 0) {
    return (
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-[#00a8e1] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          <h3 className="font-semibold text-white">Amazon Music</h3>
        </div>
        <p className="text-[#8888a0] text-sm">No current playlists</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-[#00a8e1] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">A</span>
        </div>
        <h3 className="font-semibold text-white">Amazon Music</h3>
        <span className="text-xs text-[#8888a0] ml-auto">{data.length} playlists</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#8888a0] text-xs uppercase">
              <th className="text-left pb-3">Playlist</th>
              <th className="text-center pb-3">Country</th>
              <th className="text-center pb-3">Position</th>
              <th className="text-right pb-3">Days On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2e]">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-[#1e1e2e]/50">
                <td className="py-2.5 text-white font-medium">{row.playlist}</td>
                <td className="py-2.5 text-center"><span className="bg-[#1e1e2e] px-2 py-0.5 rounded text-xs font-mono">{row.country}</span></td>
                <td className="py-2.5 text-center text-[#8888a0]">{row.currentPosition}</td>
                <td className="py-2.5 text-right text-[#8888a0]">{row.daysOn}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
