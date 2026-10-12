'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

export default function VideoModal({ src = '/video.mp4', triggerLabel = 'See how it works' }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);
  const panelId = useId();

  // A srcdoc iframe inherits the host origin, so a document.cookie read here is the parent
  // page's, not the widget's; the modal is dashboard-only, so this is a plain isClient gate.
  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Esc closes, and a focused trap keeps keyboard users from tabbing into the page behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // The video element is mounted only while open, so its network request never starts until the
  // visitor asks for it — the 7 MB file stays out of the initial page load.
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="10" cy="10" r="7" />
          <path d="M8 7.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
        </svg>
        {triggerLabel}
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={panelId}
                >
                  <button
                    type="button"
                    aria-label="Close the video"
                    onClick={close}
                    className="absolute inset-0 cursor-zoom-out bg-ink/80 backdrop-blur-sm"
                  />
                  <motion.div
                    className="relative w-full max-w-4xl"
                    initial={{ scale: 0.96, opacity: 0, y: 8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.96, opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/15 bg-ink-panel shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
                        <p id={panelId} className="text-sm font-medium text-white/85">
                          How OpenMate works
                        </p>
                        <button
                          type="button"
                          onClick={close}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Close"
                        >
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                      <video
                        ref={videoRef}
                        src={src}
                        controls
                        autoPlay
                        playsInline
                        preload="none"
                        className="block aspect-video w-full bg-black"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
