import { useEffect, useRef, useState } from 'react';

/** Adds `is-in` to the element once it scrolls into view (stays on, so animations play once). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Headline whose letters rise out of a mask one after another. */
export function SplitHeading({ id, lead, accent, inView }: { id: string; lead: string; accent: string; inView: boolean }) {
  let n = 0;
  const word = (text: string, cls?: string) =>
    text.split(' ').map((w, wi) => (
      <span className={`split-word ${cls ?? ''}`} key={`${text}-${wi}`}>
        {w.split('').map((c, ci) => (
          <span className="split-mask" key={ci} aria-hidden="true">
            <span className="split-char" style={{ transitionDelay: `${n++ * 38}ms` }}>{c}</span>
          </span>
        ))}
      </span>
    ));
  return (
    <h2 id={id} className={`split-heading ${inView ? 'is-in' : ''}`} aria-label={`${lead} ${accent}`}>
      {word(lead)} {word(accent, 'split-accent')}
    </h2>
  );
}

/** Counts from 0 to `target` once `active` flips true. Jumps straight to the end for reduced-motion users. */
export function useCountUp(target: number, active: boolean, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN');
}
