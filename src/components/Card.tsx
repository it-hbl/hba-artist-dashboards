export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#16161f] border border-[#1e1e2e] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, change, suffix = "" }: { label: string; value: string | number; change?: number; suffix?: string }) {
  return (
    <Card>
      <p className="text-xs text-[#8888a0] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</p>
      {change !== undefined && (
        <p className={`text-sm mt-1 font-medium ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toLocaleString()} {change >= 0 ? '' : ''}
        </p>
      )}
    </Card>
  );
}
