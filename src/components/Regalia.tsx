import { useEffect, useRef, useState } from 'react';
import { REGALIA } from '@/data';

export default function Regalia() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;
      const total = start - end;
      const scrolled = start - sectionTop;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.8)));
      setLineProgress(progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="regalia" className="sec" ref={sectionRef}>
      <div className="wrap">
        <div className="rv mb-12 md:mb-16">
          <div className="eyebrow">Путь</div>
          <h2 className="h2">
            Чем <span className="gold-text">подтверждено</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
          {/* Timeline */}
          <div className="relative rv-kids">
            {/* Gold line */}
            <div
              className="absolute left-3 top-0 bottom-0 w-px"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}
            >
              <div
                className="w-full"
                style={{
                  background: 'var(--grad-gold)',
                  height: '100%',
                  transform: `scaleY(${lineProgress})`,
                  transformOrigin: 'top',
                  transition: 'transform 0.1s linear',
                }}
              />
            </div>

            {/* Cards */}
            <div className="space-y-7">
              {REGALIA.map((item, i) => (
                <div key={i} className="relative pl-10">
                  {/* Dot */}
                  <div
                    className="absolute left-[9px] top-2 w-2 h-2 rounded-full"
                    style={{
                      background: 'var(--grad-gold)',
                      boxShadow: '0 0 8px rgba(212,175,55,0.5)',
                      opacity: lineProgress > (i + 0.5) / REGALIA.length ? 1 : 0.3,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                  <div
                    className="p-5 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(14,14,14,0.6)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <h3
                      className="font-display uppercase tracking-wide text-lg"
                      style={{ fontWeight: 500, letterSpacing: '0.04em', color: 'var(--gold-soft)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm" style={{ color: 'var(--muted)' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo. Единственное фотодоказательство чемпионства. Раньше стояло
              hidden lg:block — на телефоне секция шла вообще без картинки.
              Теперь на узких экранах идёт первым, над лентой, и не наклонена. */}
          <div className="rv order-first lg:order-none">
            <div
              className="relative overflow-hidden rounded-xl aspect-[16/10] lg:aspect-[3/4] lg:rotate-2"
              style={{ border: '1px solid rgba(212,175,55,0.25)' }}
            >
              <img
                src="/kasym-kubki.jpg"
                alt="Кубки, медали, флаг Казахстана"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{
                  maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-center"
                style={{
                  background: 'linear-gradient(to top, rgba(11,8,6,0.9), transparent)',
                }}
              >
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--gold-soft)', letterSpacing: '0.15em' }}>
                  Чемпионат, команда Казахстана
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
