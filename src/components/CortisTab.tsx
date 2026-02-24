"use client";
import { SpotifyPlaylistTable, AppleMusicPlaylistTable, AmazonPlaylistTable } from "./PlaylistTable";
import { RadioSpinsSection } from "./RadioSection";
import { cortisPlaylists, cortisRadio, cortisRadioStations } from "@/data/cortis";

export default function CortisTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">CORTIS</h2>
        <p className="text-[#8888a0] mt-1">"GO!" — Playlisting & Radio</p>
      </div>

      {/* Playlist summary */}
      <div className="grid grid-cols-3 gap-4">
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
