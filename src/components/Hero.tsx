import { useEffect, useRef, useState } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { PERSON, LINKS } from '@/data';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setParallax({
        x: Math.max(-10, Math.min(10, dx * 10)),
        y: Math.max(-10, Math.min(10, dy * 10)),
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const letters = PERSON.short.split('');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* Gold glow behind head */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50vw',
          height: '50vw',
          maxWidth: 600,
          maxHeight: 600,
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 60%)',
          zIndex: 5,
        }}
      />

      {/* Eyebrow */}
      <div
        className="eyebrow fade-in-up absolute z-10"
        style={{
          top: '14%',
          left: '50%',
          transform: 'translateX(-50%)',
          animationDelay: '0.1s',
          margin: 0,
        }}
      >
        {PERSON.title}
      </div>

      {/* Giant KASYM letters */}
      <h1
        className="font-display absolute z-10 text-center select-none"
        style={{
          top: '20%',
          left: 0,
          right: 0,
          fontSize: 'clamp(72px, 20vw, 280px)',
          lineHeight: 0.9,
          fontWeight: 600,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          margin: 0,
          transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {letters.map((char, i) => (
          <span
            key={i}
            className="char-in gold-text"
            style={{
              animationDelay: `${i * 0.06}s`,
              display: 'inline-block',
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Portrait — anchored to bottom, overlaps lower third of letters */}
      <div
        className="absolute portrait-in"
        style={{
          bottom: 0,
          left: '50%',
          transform: `translateX(calc(-50% + ${parallax.x * 0.7}px)) translateY(${parallax.y * 0.7}px)`,
          height: '66vh',
          width: 'clamp(300px, 34vw, 440px)',
          zIndex: 20,
          transition: 'transform 0.3s ease-out',
          animationDelay: '0.45s',
        }}
      >
        <img
          src="/kasym-hero.jpg"
          alt="Касым Амангельдин — барбер, чемпион Азии и Европы"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center 18%',
            maskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
            filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.8))',
          }}
        />
      </div>

      {/* Bottom gradient for text readability */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '45%',
          background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
          zIndex: 25,
        }}
      />

      {/* Name, role, buttons — bottom-left on desktop, centered below portrait on mobile */}
      <div
        className="absolute z-30 fade-in-up"
        style={{
          left: 0,
          right: 0,
          bottom: '48px',
          animationDelay: '0.8s',
        }}
      >
        <div className="wrap">
          <div className="flex flex-col items-start gap-3 max-md:items-center max-md:text-center">
            <div>
              <div
                className="font-display uppercase tracking-widest"
                style={{ fontSize: 'clamp(20px, 3.5vw, 28px)', fontWeight: 500, letterSpacing: '0.15em' }}
              >
                {PERSON.name}
              </div>
              <div className="text-sm mt-1.5" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {PERSON.role}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <MessageCircle size={16} />
                Записаться
              </a>
              <a href="#works" className="btn btn-ghost">
                Смотреть работы
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute left-1/2 -translate-x-1/2 z-30 scroll-bounce hidden md:block"
        aria-label="Прокрутить вниз"
        style={{ color: 'var(--gold)', opacity: 0.6, bottom: '16px' }}
      >
        <ChevronDown size={28} />
      </a>

      {/* Mobile-specific overrides */}
      <style>{`
        @media (max-width: 767px) {
          #hero h1 { font-size: clamp(56px, 22vw, 120px) !important; top: 18% !important; }
          #hero .portrait-in { height: 52vh !important; width: clamp(220px, 62vw, 320px) !important; }
        }
      `}</style>
    </section>
  );
}
