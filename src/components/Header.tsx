import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { PERSON, LINKS } from '@/data';

const NAV_ITEMS = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Регалии', href: '#regalia' },
  { label: 'Работы', href: '#works' },
  { label: 'Обучение', href: '#education' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(11, 8, 6, 0.88)' : 'rgba(11, 8, 6, 0.35)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: 64 }}>
          <a href="#hero" className="flex items-center gap-2.5" aria-label="KASYM — на главную">
            <img src="/crest.png" alt="" width={32} height={32} style={{ display: 'block' }} />
            <span className="font-display font-medium tracking-wider text-lg" style={{ letterSpacing: '0.12em' }}>
              {PERSON.short}
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-wider uppercase transition-colors duration-300"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold hidden sm:inline-flex">
              <MessageCircle size={16} />
              Записаться
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              style={{ color: 'var(--gold-soft)' }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[60] lg:hidden transition-opacity duration-400"
        style={{
          backgroundColor: 'rgba(11, 8, 6, 0.97)',
          backdropFilter: 'blur(16px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity .4s var(--ease)',
        }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: 64 }}>
          <div className="flex items-center gap-2.5">
            <img src="/crest.png" alt="" width={32} height={32} />
            <span className="font-display font-medium tracking-wider text-lg" style={{ letterSpacing: '0.12em' }}>
              {PERSON.short}
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Закрыть меню"
            style={{ color: 'var(--gold-soft)' }}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="wrap flex flex-col gap-2 mt-8">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl uppercase tracking-wide py-3 transition-colors"
              style={{
                color: 'var(--foreground)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity .5s var(--ease) ${i * 0.06}s, transform .5s var(--ease) ${i * 0.06}s, color .3s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
            >
              {item.label}
            </a>
          ))}
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn btn-gold mt-6"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: `opacity .5s var(--ease) ${NAV_ITEMS.length * 0.06}s`,
            }}
          >
            <MessageCircle size={18} />
            Записаться
          </a>
        </nav>
      </div>
    </>
  );
}
