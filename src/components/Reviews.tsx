import { Star, ExternalLink } from 'lucide-react';
import { REVIEWS, LINKS } from '@/data';

export default function Reviews() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="sec overflow-hidden">
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

      {/* Marquee */}
      <div className="relative">
        {/* Edge gradients */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '120px',
            background: 'linear-gradient(to right, var(--background), transparent)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: '120px',
            background: 'linear-gradient(to left, var(--background), transparent)',
          }}
        />

        <div
          className="flex gap-5 w-max"
          style={{
            animation: 'marquee-scroll 60s linear infinite',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {doubled.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] md:w-[400px] p-6 rounded-2xl"
              style={{
                backgroundColor: 'rgba(14,14,14,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
                ))}
              </div>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                {review.text}
              </p>
              <div className="text-sm font-medium" style={{ color: 'var(--gold-soft)' }}>
                {review.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
