"use client";

import { useState } from "react";
import EJJonesTab from "@/components/EJJonesTab";
import CortisTab from "@/components/CortisTab";
import TylaTab from "@/components/TylaTab";

const tabs = [
  { id: "ej-jones", label: "EJ Jones", subtitle: "Gas Station Love" },
  { id: "cortis", label: "CORTIS", subtitle: "GO!" },
  { id: "tyla", label: "Tyla", subtitle: "CHANEL" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("ej-jones");

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#1e1e2e] bg-[#111118]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">H</div>
              <h1 className="text-lg font-semibold text-white">HBA Artist Dashboards</h1>
            </div>
            <span className="text-xs text-[#8888a0]">Week of Feb 17–23, 2026</span>
                <span className="text-[10px] text-[#666680]">Last data included: Feb 21, 2026 (streaming) · Feb 23, 2026 (radio)</span>
          </div>
          
          {/* Tabs */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-[#8888a0] hover:text-white hover:border-[#333]"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-2 text-xs opacity-60">"{tab.subtitle}"</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "ej-jones" && <EJJonesTab />}
        {activeTab === "cortis" && <CortisTab />}
        {activeTab === "tyla" && <TylaTab />}
      </main>
    </div>
  );
}
