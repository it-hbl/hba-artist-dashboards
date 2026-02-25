"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from "recharts";

export interface Annotation {
  label: string;
  pctChange: number;
  reason: string;
}

interface Props {
  data: { label: string; total: number; audio: number }[];
  annotations: Annotation[];
  totalGradId: string;
  audioGradId: string;
  totalColor?: string;
  audioColor?: string;
}

function AnnotationDot({ cx, cy, pctChange, reason, label }: { cx: number; cy: number; pctChange: number; reason: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const isGrowth = pctChange > 0;
  const color = isGrowth ? "#10b981" : "#ef4444";
  const sign = isGrowth ? "+" : "";

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      {/* Pulsing outer ring */}
      <circle cx={cx} cy={cy} r={10} fill={color} opacity={0.15}>
        <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Solid dot */}
      <circle cx={cx} cy={cy} r={5} fill={color} stroke="#0f0f17" strokeWidth={2} />

      {/* Tooltip on hover */}
      {hovered && (
        <foreignObject x={cx - 120} y={cy - 90} width={240} height={80} style={{ overflow: "visible", pointerEvents: "none" }}>
          <div style={{
            background: "#1e1e2e",
            border: `1px solid ${color}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 11,
            color: "#fff",
            boxShadow: `0 0 12px ${color}40`,
            textAlign: "center",
          }}>
            <div style={{ fontWeight: 700, color, marginBottom: 2 }}>
              {sign}{pctChange.toFixed(1)}% WoW — {label}
            </div>
            <div style={{ color: "#ccc", lineHeight: 1.3 }}>{reason}</div>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default function AnnotatedAreaChart({ data, annotations, totalGradId, audioGradId, totalColor = "#6366f1", audioColor = "#8b5cf6" }: Props) {
  return (
    <div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={totalGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={totalColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={totalColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={audioGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={audioColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={audioColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8888a0', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
            <Tooltip
              content={({ active, payload, label }: any) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1e1e2e] border border-[#333] rounded-lg px-3 py-2 text-xs">
                    <p className="text-white font-medium mb-1">{label}</p>
                    {payload.map((p: any) => (
                      <p key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
                    ))}
                  </div>
                );
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="total" name="Total" stroke={totalColor} fill={`url(#${totalGradId})`} strokeWidth={2} />
            <Area type="monotone" dataKey="audio" name="Audio Only" stroke={audioColor} fill={`url(#${audioGradId})`} strokeWidth={2} />
            {annotations.map((a) => (
              <ReferenceDot
                key={a.label}
                x={a.label}
                y={data.find(d => d.label === a.label)?.total || 0}
                r={0}
                shape={(props: any) => (
                  <AnnotationDot
                    cx={props.cx}
                    cy={props.cy}
                    pctChange={a.pctChange}
                    reason={a.reason}
                    label={a.label}
                  />
                )}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-[#666] mt-2 ml-1">● Significant changes (&gt;50% growth or &gt;25% decline) are marked</p>
    </div>
  );
}
