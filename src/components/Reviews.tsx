import { Star, ExternalLink, Quote } from 'lucide-react';
import { REVIEWS, LINKS, type Review } from '@/data';

/** Раскладываем отзывы по колонкам по очереди, чтобы длинные и короткие
 *  перемешались и колонки вышли примерно одной высоты. */
function poKolonkam(items: Review[], n: number): Review[][] {
  const cols: Review[][] = Array.from({ length: n }, () => []);
  items.forEach((r, i) => cols[i % n].push(r));
  return cols;
}

function Kartochka({ review }: { review: Review }) {
  return (
    <article
      className="mb-5 p-6 rounded-2xl relative"
      style={{
        backgroundColor: 'rgba(14,14,14,0.72)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Quote
        size={38}
        aria-hidden="true"
        className="absolute right-4 top-4 pointer-events-none"
        style={{ color: 'var(--gold)', opacity: 0.07 }}
      />
      <div className="flex gap-1 mb-3" aria-label="Оценка 5 из 5">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} size={14} aria-hidden="true" fill="var(--gold)" style={{ color: 'var(--gold)' }} />
        ))}
      </div>
      <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
        {review.text}
      </p>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium" style={{ color: 'var(--gold-soft)' }}>
          {review.name}
        </span>
        <span className="text-xs shrink-0" style={{ color: 'var(--muted)' }}>
          {review.date}
        </span>
      </div>
    </article>
  );
}

export default function Reviews() {
  // 3 колонки на компьютере, 2 на планшете, 1 на телефоне.
  // Считаем максимум, лишние прячем через CSS — так не нужен ресайз-слушатель.
  const cols = poKolonkam(REVIEWS, 3);

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
      </div>

      {/*
        Водопад: каждая колонка едет сама, соседние — в разные стороны.
        Содержимое колонки продублировано, а анимация сдвигает ровно на
        половину высоты — на стыке кадр совпадает, и склейки не видно.
        Наведение останавливает все три сразу: читать движущийся текст
        неудобно, а гоняться курсором за одной колонкой — тем более.
      */}
      <div className="vodopad relative" aria-label="Отзывы клиентов">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {cols.map((col, i) => (
            <div
              key={i}
              className={`vodopad-col ${i === 1 ? 'hidden md:block' : ''} ${i === 2 ? 'hidden lg:block' : ''}`}
              style={{ ['--dur' as string]: `${58 + i * 9}s` }}
              data-dir={i % 2 === 1 ? 'vniz' : 'vverh'}
            >
              <div className="vodopad-lenta">
                {col.map((r, j) => (
                  <Kartochka key={`a${j}`} review={r} />
                ))}
                {/* копия для бесшовного стыка, для читалок скрыта */}
                <div aria-hidden="true">
                  {col.map((r, j) => (
                    <Kartochka key={`b${j}`} review={r} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* края растворяются, чтобы карточки не обрубались на границе */}
        <div className="vodopad-kraj vodopad-kraj-verh" aria-hidden="true" />
        <div className="vodopad-kraj vodopad-kraj-niz" aria-hidden="true" />
      </div>

      <style>{`
        .vodopad { height: 72vh; min-height: 520px; overflow: hidden; }
        .vodopad-col { overflow: hidden; }
        .vodopad-lenta {
          animation: vodopad-vverh var(--dur, 60s) linear infinite;
          will-change: transform;
        }
        .vodopad-col[data-dir="vniz"] .vodopad-lenta {
          animation-name: vodopad-vniz;
        }
        .vodopad:hover .vodopad-lenta { animation-play-state: paused; }

        @keyframes vodopad-vverh {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes vodopad-vniz {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }

        .vodopad-kraj {
          position: absolute; left: 0; right: 0; height: 90px;
          pointer-events: none; z-index: 2;
        }
        .vodopad-kraj-verh {
          top: 0;
          background: linear-gradient(to bottom, var(--background) 0%, transparent 100%);
        }
        .vodopad-kraj-niz {
          bottom: 0;
          background: linear-gradient(to top, var(--background) 0%, transparent 100%);
        }

        /* Движущийся текст мешает читать тем, кому и так тяжело.
           Здесь лента останавливается, а секция становится обычным
           прокручиваемым списком. */
        @media (prefers-reduced-motion: reduce) {
          .vodopad { height: auto; min-height: 0; overflow: visible; }
          .vodopad-lenta { animation: none; }
          .vodopad-lenta > [aria-hidden="true"] { display: none; }
          .vodopad-kraj { display: none; }
        }
      `}</style>
    </section>
  );
}
