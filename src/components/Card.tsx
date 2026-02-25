export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#16161f] border border-[#1e1e2e] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, change, suffix = "", tooltip, pctChange, sparkData }: { label: string; value: string | number; change?: number; suffix?: string; tooltip?: string; pctChange?: number; sparkData?: number[] }) {
  return (
    <Card>
      <div className="flex items-center gap-1.5 mb-1">
        <p className="text-xs text-[#8888a0] uppercase tracking-wider">{label}</p>
        {tooltip && (
          <div className="relative group">
            <span className="text-[#555570] hover:text-[#8888a0] cursor-help transition-colors text-xs">ⓘ</span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1e1e2e] border border-[#2a2a3e] rounded-lg text-[11px] text-[#aaaacc] w-52 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 shadow-xl">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1e1e2e]" />
            </div>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</p>
      {change !== undefined && (
        <p className={`text-sm mt-1 font-medium ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toLocaleString()}
        </p>
      )}
      {pctChange !== undefined && (
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pctChange >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {pctChange >= 0 ? '+' : ''}{pctChange.toFixed(1)}% WoW
          </span>
        </div>
      )}
      {sparkData && sparkData.length > 1 && (
        <div className="mt-2 h-8 relative">
          <span className="absolute top-0 right-0 text-[9px] text-[#555570]">Last {sparkData.length}w</span>
          <svg viewBox={`0 0 ${sparkData.length * 20} 32`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sparkData[sparkData.length-1] >= sparkData[0] ? '#34d399' : '#f87171'} stopOpacity="0.3" />
                <stop offset="100%" stopColor={sparkData[sparkData.length-1] >= sparkData[0] ? '#34d399' : '#f87171'} stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const min = Math.min(...sparkData);
              const max = Math.max(...sparkData);
              const range = max - min || 1;
              const points = sparkData.map((v, i) => `${i * 20},${32 - ((v - min) / range) * 28}`).join(' ');
              const areaPoints = points + ` ${(sparkData.length - 1) * 20},32 0,32`;
              const color = sparkData[sparkData.length-1] >= sparkData[0] ? '#34d399' : '#f87171';
              return (
                <>
                  <polygon points={areaPoints} fill="url(#sparkGrad)" />
                  <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
                </>
              );
            })()}
          </svg>
        </div>
      )}
    </Card>
  );
}
