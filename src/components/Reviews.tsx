import { Star, ExternalLink, Quote } from 'lucide-react';
import { REVIEWS, LINKS } from '@/data';

export default function Reviews() {
  return (
    <section id="reviews" className="sec">
      <div className="wrap">
        <div className="rv mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Отзывы</div>
            <h2 className="h2">
              Что <span className="gold-text">говорят</span>
            </h2>
          </div>
          <a
            href={LINKS.twogis}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center gap-1.5 transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            4,9 из 5 на 2ГИС · 550 оценок
            <ExternalLink size={14} />
          </a>
        </div>

        {/*
          Водопад на CSS-колонках. Масонри-библиотека тут не нужна:
          карточки разной высоты, колонки заполняются сами, порядок
          чтения — сверху вниз по колонке. break-inside-avoid не даёт
          карточке разорваться между колонками.
        */}
        <div className="rv-kids columns-1 md:columns-2 lg:columns-3 gap-5">
          {REVIEWS.map((review, i) => (
            <article
              key={i}
              className="break-inside-avoid mb-5 p-6 rounded-2xl relative"
              style={{
                backgroundColor: 'rgba(14,14,14,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Quote
                size={40}
                aria-hidden="true"
                className="absolute right-4 top-4 pointer-events-none"
                style={{ color: 'var(--gold)', opacity: 0.07 }}
              />
              <div className="flex gap-1 mb-3" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={15}
                    aria-hidden="true"
                    fill="var(--gold)"
                    style={{ color: 'var(--gold)' }}
                  />
                ))}
              </div>
              <p
                className="text-sm mb-4 relative"
                style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}
              >
                {review.text}
              </p>
              <div className="text-sm font-medium" style={{ color: 'var(--gold-soft)' }}>
                {review.name}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
