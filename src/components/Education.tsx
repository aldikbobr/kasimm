import { GraduationCap, MapPin, Users, MessageCircle } from 'lucide-react';
import { LINKS } from '@/data';

const COURSES = [
  {
    icon: GraduationCap,
    title: 'Барбер с нуля',
    text: 'Полная программа с нуля до первого клиента',
  },
  {
    icon: MapPin,
    title: 'Мастер-классы',
    text: 'Выездные, по городам Казахстана',
  },
  {
    icon: Users,
    title: 'Личное наставничество',
    text: 'Разбор техники один на один',
  },
];

export default function Education() {
  return (
    <section id="education" className="sec">
      <div className="wrap">
        <div className="rv mb-10">
          <div className="eyebrow">Обучение</div>
          <h2 className="h2">
            Курс <span className="gold-text">«Барбер с нуля»</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 rv-kids">
          {COURSES.map((course, i) => {
            const Icon = course.icon;
            return (
              <div
                key={i}
                className="p-7 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(14,14,14,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  <Icon size={24} style={{ color: 'var(--gold)' }} />
                </div>
                <h3
                  className="font-display uppercase tracking-wide text-xl mb-2"
                  style={{ fontWeight: 500, letterSpacing: '0.03em', color: 'var(--gold-soft)' }}
                >
                  {course.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                  {course.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rv mt-8">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <MessageCircle size={16} />
            Написать про обучение
          </a>
        </div>
      </div>
    </section>
  );
}
