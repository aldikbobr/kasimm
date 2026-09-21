import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { LINKS, HOURS, LOCATIONS } from '@/data';

export default function Contact() {
  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <div
          className="rv rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
          style={{
            border: '1px solid rgba(212,175,55,0.25)',
            background: 'linear-gradient(135deg, rgba(14,14,14,0.8), rgba(20,16,10,0.6))',
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '60%',
              height: 200,
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)',
            }}
          />

          <div className="relative">
            <h2 className="h2 mb-3">
              Записаться <span className="gold-text">ко мне</span>
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
              {HOURS}
            </p>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ height: 52, paddingInline: 32, fontSize: 14 }}
            >
              <MessageCircle size={20} />
              Написать в WhatsApp
            </a>
          </div>
        </div>

        {/* Locations */}
        <div className="grid md:grid-cols-3 gap-5 mt-8 rv-kids">
          {LOCATIONS.map((loc, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: 'rgba(14,14,14,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} style={{ color: 'var(--gold)' }} />
                <h3
                  className="font-display uppercase tracking-wide text-lg"
                  style={{ fontWeight: 500, letterSpacing: '0.04em', color: 'var(--gold-soft)' }}
                >
                  {loc.name}
                </h3>
              </div>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {loc.address}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href={`tel:${loc.phone.replace(/\s/g, '')}`}
                  className="text-sm flex items-center gap-1.5 transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  <Phone size={14} />
                  {loc.phone}
                </a>
              </div>
              <a
                href={loc.wa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs mt-2 inline-flex items-center gap-1 transition-colors"
                style={{ color: 'var(--gold)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              >
                <MessageCircle size={12} />
                WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
