export default function QuotaBar({ used, cap, label, note }) {
  const safeCap = Number.isFinite(cap) ? cap : 0;
  const pct = safeCap > 0 ? Math.min(100, Math.round((used / safeCap) * 100)) : used > 0 ? 100 : 0;
  const displayCap = Number.isFinite(cap) ? cap : 'Unlimited';

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted">
          {used} / {displayCap}
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-line"
        role="img"
        aria-label={`${label}: ${used} of ${displayCap} used`}
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      {note ? <p className="mt-1.5 text-xs text-faint">{note}</p> : null}
    </div>
  );
}
