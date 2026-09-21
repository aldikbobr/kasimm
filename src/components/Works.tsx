import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WORKS } from '@/data';

export default function Works() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + WORKS.length) % WORKS.length));
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % WORKS.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section id="works" className="sec">
      <div className="wrap">
        <div className="rv mb-10">
          <div className="eyebrow">Работы</div>
          <h2 className="h2">
            Видно
            <br />
            <span className="gold-text">по контуру</span>
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Переход, линия бороды, шея — то, на чём стрижка держится или разваливается.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rv-kids" style={{ gap: '14px' }}>
          {WORKS.map((work, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio: '1/1',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'var(--card)',
              }}
              aria-label={`Открыть фото: ${work.alt}`}
            >
              <img
                src={work.src}
                alt={work.alt}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ transitionTimingFunction: 'var(--ease)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Закрыть"
            className="absolute top-5 right-5 p-2 transition-colors"
            style={{ color: 'var(--gold-soft)' }}
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Предыдущее"
            className="absolute left-4 md:left-8 p-2 transition-colors"
            style={{ color: 'var(--gold-soft)' }}
          >
            <ChevronLeft size={40} />
          </button>

          <img
            src={WORKS[lightboxIndex].src}
            alt={WORKS[lightboxIndex].alt}
            className="max-w-[88vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid rgba(212,175,55,0.2)' }}
          />

          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Следующее"
            className="absolute right-4 md:right-8 p-2 transition-colors"
            style={{ color: 'var(--gold-soft)' }}
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-center max-w-md px-4"
            style={{ color: 'var(--muted)' }}
          >
            {WORKS[lightboxIndex].alt}
          </div>
        </div>
      )}
    </section>
  );
}
