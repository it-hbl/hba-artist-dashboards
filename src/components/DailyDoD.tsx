"use client";

export function computeDoD(data: { day: string; total: number; audio: number }[]) {
  return data.map((d, i) => {
    if (i === 0) return { ...d, dodTotal: 0, dodAudio: 0 };
    const prevTotal = data[i - 1].total;
    const prevAudio = data[i - 1].audio;
    return {
      ...d,
      dodTotal: prevTotal ? ((d.total - prevTotal) / prevTotal) * 100 : 0,
      dodAudio: prevAudio ? ((d.audio - prevAudio) / prevAudio) * 100 : 0,
    };
  });
}

export function makeDailyDot(dodData: ReturnType<typeof computeDoD>) {
  return function DailyDot(props: any) {
    const { cx, cy, index, dataKey } = props;
    const defaultColor = dataKey === 'total' ? '#6366f1' : '#8b5cf6';
    if (index === 0 || !cx || !cy) return <circle cx={cx} cy={cy} r={4} fill={defaultColor} />;
    const entry = dodData[index];
    const dod = dataKey === 'total' ? entry?.dodTotal : entry?.dodAudio;
    if (dod === undefined) return <circle cx={cx} cy={cy} r={4} fill={defaultColor} />;
    const isSignificant = Math.abs(dod) > 5;
    const color = dod >= 0 ? '#34d399' : '#f87171';
    return (
      <circle cx={cx} cy={cy} r={isSignificant ? 6 : 4} fill={isSignificant ? color : defaultColor} stroke={isSignificant ? color : 'none'} strokeWidth={isSignificant ? 2 : 0} fillOpacity={isSignificant ? 0.8 : 1} />
    );
  };
}

export function makeDailyTooltip(dodData: ReturnType<typeof computeDoD>) {
  return function DailyTooltip({ active, payload, label }: any) {
    if (!active || !payload) return null;
    const entry = dodData.find((d: any) => d.day === label);
    return (
      <div className="bg-[#1e1e2e] border border-[#333] rounded-lg px-3 py-2 text-xs">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((p: any) => {
          const dod = p.dataKey === 'total' ? entry?.dodTotal : entry?.dodAudio;
          return (
            <div key={p.name}>
              <p style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
              {dod !== undefined && dod !== 0 && (
                <p className={`${dod >= 0 ? 'text-emerald-400' : 'text-red-400'} ml-2`}>
                  {dod >= 0 ? '↑' : '↓'} {Math.abs(dod).toFixed(1)}% DoD
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };
}
