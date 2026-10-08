'use client';

import CausticField from './caustic-field.jsx';

// The marketing ambience: a green-tinted ground, three drifting fog banks, and the caustic light
// field as a translucent emerald film. It is fixed behind the page (`-z-10`) and pointer-inert, so it
// never intercepts a click or affects layout. The field itself is `CausticField`, shared with the
// hero; the fog is CSS transform/opacity only, so it composites without reflow (see globals.css).
export default function AmbientBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--color-mint-soft) 0%, var(--color-paper) 42%, var(--color-accent-soft) 100%)',
      }}
      aria-hidden="true"
    >
      {/* Three fog banks, each wrapped in a scroll-parallax layer and drifting on its own period,
       * so the overlap separates in depth as the page moves and never lands on a beat. */}
      <div className="parallax-fog-a absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw]">
        <div className="animate-fog-a h-full w-full rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.38),transparent_68%)] blur-3xl" />
      </div>
      <div className="parallax-fog-b absolute -right-[18%] top-[18%] h-[64vh] w-[62vw]">
        <div className="animate-fog-b h-full w-full rounded-full bg-[radial-gradient(circle,rgba(15,122,90,0.34),transparent_68%)] blur-3xl" />
      </div>
      <div className="parallax-fog-c absolute bottom-[-24%] left-[12%] h-[72vh] w-[68vw]">
        <div className="animate-fog-c h-full w-full rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.3),transparent_70%)] blur-3xl" />
      </div>

      {/* The caustic film: a continuous green veil with brighter filaments riding on top. */}
      <CausticField
        className="absolute inset-0 h-full w-full"
        filmBase={0.07}
        filmScale={0.6}
        intensity={1}
        tint={[0.42, 1, 0.78]}
      />

      {/* A faint vignette so the edges settle and the centre carries the content. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_55%,rgba(16,36,29,0.1)_100%)]" />
    </div>
  );
}