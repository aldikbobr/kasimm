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

        <div
          className="focus-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rv-kids"
          style={{ gap: '14px' }}
        >
          {WORKS.map((work, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="work-card relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio: '1/1',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'var(--card)',
              }}
              aria-label={`Открыть фото: ${work.alt}`}
            >
              <span className="work-media block w-full h-full">
                <img
                  src={work.src}
                  alt={work.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </span>
              <span
                aria-hidden="true"
                className="work-caption absolute inset-x-0 bottom-0 px-3 pt-8 pb-3 text-left text-[11px] leading-snug"
                style={{
                  color: '#fff',
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                }}
              >
                {work.alt}
              </span>
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

      <style>{`
        /* Фокус на одной работе: наведённая остаётся резкой и чуть растёт,
           остальные уходят в размытие. Сделано на CSS, а не на состоянии
           React — иначе каждое движение мыши перерисовывало бы все десять
           карточек. */
        .work-media,
        .work-card,
        .work-caption {
          transition: transform .5s var(--ease), filter .5s var(--ease),
                      opacity .5s var(--ease), box-shadow .5s var(--ease);
        }

        /* Подпись по умолчанию спрятана под нижним краем */
        .work-caption { opacity: 0; transform: translateY(100%); }

        /* Только для мыши. На тач-экранах наведения нет, и без этого
           запрета карточки залипали бы размытыми после первого тапа. */
        @media (hover: hover) and (pointer: fine) {
          .focus-grid:has(.work-card:hover) .work-card:not(:hover) .work-media,
          .focus-grid:has(.work-card:focus-visible) .work-card:not(:focus-visible) .work-media {
            filter: blur(3px) grayscale(35%);
            opacity: .5;
            transform: scale(.98);
          }

          /* Масштаб вешаем на .work-media, а НЕ на .work-card: карточка
             лежит в .rv-kids, где на ней висит анимация rv-in с
             fill-mode: both. Её последний кадр transform: none сильнее
             обычного правила в каскаде и стирает любой scale на карточке. */
          .work-card:hover .work-media,
          .work-card:focus-visible .work-media {
            transform: scale(1.04);
          }

          .work-card:hover,
          .work-card:focus-visible {
            border-color: rgba(212,175,55,.4) !important;
            box-shadow: 0 18px 40px rgba(0,0,0,.55);
            z-index: 1;
          }

          .work-card:hover .work-caption,
          .work-card:focus-visible .work-caption {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* На телефоне подпись видна всегда — наводить нечем */
        @media (hover: none), (pointer: coarse) {
          .work-caption { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .work-media, .work-card, .work-caption { transition: none; }
          .focus-grid:has(.work-card:hover) .work-card:not(:hover) .work-media {
            filter: none; transform: none; opacity: .7;
          }
          .work-card:hover, .work-card:focus-visible { transform: none; }
        }
      `}</style>
    </section>
  );
}
