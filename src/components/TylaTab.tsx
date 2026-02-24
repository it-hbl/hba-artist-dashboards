"use client";
import { SpotifyPlaylistTable, AppleMusicPlaylistTable, AmazonPlaylistTable } from "./PlaylistTable";
import { RadioSpinsSection } from "./RadioSection";
import { tylaPlaylists, tylaRadio, tylaRadioCharts } from "@/data/tyla";

export default function TylaTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Tyla</h2>
        <p className="text-[#8888a0] mt-1">"CHANEL" — Playlisting & Radio</p>
      </div>

      {/* Playlist summary */}
      <div className="grid grid-cols-3 gap-4">
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
