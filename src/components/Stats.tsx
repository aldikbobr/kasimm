import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/data';

function AnimatedNumber({
  value,
  decimals = 0,
  raw = false,
  gold = false,
}: {
  value: number;
  decimals?: number;
  raw?: boolean;
  gold?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (raw) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(value * eased);
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, raw]);

  const formatted = raw
    ? Math.round(display).toString()
    : decimals > 0
    ? display.toFixed(decimals).replace('.', ',')
    : Math.round(display).toLocaleString('ru-RU').replace(/,/g, ' ');

  return (
    <span ref={ref} className={gold ? 'gold-text' : ''}>
      {formatted}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-0">
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-y"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center px-4 py-10 md:py-14 rv"
            style={{
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              animationRange: `entry ${6 + i * 4}% cover ${28 + i * 4}%`,
            }}
          >
            <div
              className="font-display font-medium"
              style={{
                fontSize: 'clamp(30px, 4.4vw, 48px)',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              <AnimatedNumber
                value={stat.n}
                decimals={stat.decimals ?? 0}
                raw={stat.raw ?? false}
                gold={stat.gold ?? false}
              />
              {stat.suffix}
            </div>
            <div className="text-xs mt-2.5 uppercase tracking-widest" style={{ color: 'var(--muted)', letterSpacing: '0.15em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
