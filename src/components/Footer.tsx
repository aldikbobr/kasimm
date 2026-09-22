import { Instagram, MessageCircle, AtSign, MapPin } from 'lucide-react';
import { PERSON, LINKS } from '@/data';

const SOCIALS = [
  { icon: Instagram, href: LINKS.instagram, label: 'Instagram' },
  { icon: MessageCircle, href: LINKS.whatsapp, label: 'WhatsApp' },
  { icon: AtSign, href: LINKS.threads, label: 'Threads' },
  { icon: MapPin, href: LINKS.twogis, label: '2ГИС' },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="wrap">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: crest + name */}
          <div className="flex items-center gap-2.5">
            <img src="/crest-sm.png" alt="" width={32} height={32} loading="lazy" decoding="async" />
            <span className="font-display uppercase tracking-wider text-base" style={{ letterSpacing: '0.12em' }}>
              {PERSON.name}
            </span>
          </div>

          {/* Center: socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--muted)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Right: shop link */}
          <a
            href={LINKS.instagramShop}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            Сайт барбершопа
          </a>
        </div>

        <div className="text-center mt-10 text-xs" style={{ color: 'var(--muted)', letterSpacing: '0.1em' }}>
          © 2026 KASYM
        </div>
      </div>
    </footer>
  );
}
