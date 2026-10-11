// The seam where the hero's paper meets the first content section: a green pigment plume, decorative only — a visual join, not a wrapper.
export default function WaterBand() {
  return (
    <div className="relative h-px w-full" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-40 -translate-y-1/2 overflow-hidden">
        {/* Three pools expanding on offset periods, so the seam breathes without a visible loop. */}
        <div className="animate-plume absolute left-[8%] top-1/2 h-36 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,122,90,0.5),transparent_70%)] blur-2xl" />
        <div className="animate-plume absolute left-1/2 top-1/2 h-40 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.45),transparent_70%)] blur-2xl" style={{ animationDelay: '3s' }} />
        <div className="animate-plume absolute right-[10%] top-1/2 h-32 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.4),transparent_70%)] blur-2xl" style={{ animationDelay: '6s' }} />
      </div>

      {/* The hairline itself, so the sections read as joined even if the plumes are reduced away. */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,122,90,0.5),rgba(13,148,136,0.5),transparent)]" />
    </div>
  );
}