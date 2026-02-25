export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#16161f] border border-[#1e1e2e] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, change, suffix = "", tooltip }: { label: string; value: string | number; change?: number; suffix?: string; tooltip?: string }) {
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
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toLocaleString()} {change >= 0 ? '' : ''}
        </p>
      )}
    </Card>
  );
}
