import { MessageCircle, ChevronDown } from 'lucide-react';
import { PERSON, LINKS } from '@/data';

/**
 * Первый экран. Отдельной секции героя на сайте нет — её роль играет
 * этот блок, поэтому он занимает высоту экрана и несёт <h1> страницы.
 * Отсюда же уходят обе кнопки: до полосы контактов далеко, а записаться
 * человек хочет сразу.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative flex items-center overflow-hidden py-12 md:py-20 lg:py-0 lg:min-h-[100svh]"
    >
      {/* золотое пятно за портретом */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          left: '-10%',
          top: '20%',
          width: 'min(70vw, 760px)',
          height: 'min(70vw, 760px)',
          background: 'radial-gradient(circle, rgba(212,175,55,0.16) 0%, transparent 62%)',
        }}
      />

      <div className="wrap grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
        {/* Портрет */}
        <div className="rv relative order-first">
          {/* На телефоне квадрат и уже — иначе портрет 4/5 съедал 409px
              высоты и кнопка «Записаться» уходила под сгиб */}
          <div
            className="relative overflow-hidden rounded-2xl mx-auto w-full max-w-[300px] md:max-w-none aspect-square md:aspect-[4/5]"
            style={{ border: '1px solid rgba(212,175,55,0.15)' }}
          >
            <img
              src="/kasym-about.jpg"
              alt="Касым Амангельдин — портрет"
              // React 18 не знает camelCase fetchPriority и ругается в консоль;
              // в нижнем регистре проходит как обычный DOM-атрибут
              {...{ fetchpriority: 'high' }}
              decoding="async"
              className="w-full h-full object-cover"
              style={{
                maskImage: 'radial-gradient(ellipse 100% 100% at 50% 40%, #000 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 40%, #000 60%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/*
          Текст. На телефоне порядок другой: кнопки поднимаются выше
          абзацев, иначе «Записаться» не попадает на первый экран.
          На md и шире возвращается обычный порядок — сначала текст,
          потом кнопки.
        */}
        <div className="rv-kids flex flex-col text-center md:text-left">
          <div className="eyebrow justify-center md:justify-start order-1">{PERSON.title}</div>

          {/* h1 страницы: другого заголовка первого уровня на сайте нет */}
          <h1
            className="font-display uppercase order-2"
            style={{
              fontSize: 'clamp(34px, 6.2vw, 68px)',
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: '0.01em',
              margin: 0,
            }}
          >
            Я делаю
            <br />
            <span className="gold-text">форму, а не стрижку</span>
          </h1>

          <p
            className="mt-4 text-sm uppercase order-3"
            style={{ color: 'var(--gold-soft)', letterSpacing: '0.18em' }}
          >
            {PERSON.name}
          </p>

          <div
            className="order-5 md:order-4 mt-6 space-y-4 text-base mx-auto md:mx-0 max-w-[56ch]"
            style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}
          >
            <p>
              Меня зовут Касым Амангельдин. Я барбер из Петропавловска, чемпион Азии и
              Европы, и с 2020 года у меня свой барбершоп — сейчас это три зала в городе.
            </p>
            <p>
              Работа барбера для меня не про машинку. Она про форму головы, про то, как
              человек носит себя, и про переход, который видно за метр. Этому же я учу
              тех, кто приходит ко мне на курс.
            </p>
          </div>

          <div className="order-4 md:order-5 mt-7 flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Записаться
            </a>
            <a href="#works" className="btn btn-ghost">
              Смотреть работы
            </a>
          </div>

          <p
            className="order-6 mt-7 text-sm"
            style={{ color: 'var(--gold)', letterSpacing: '0.05em' }}
          >
            Амбассадор Hector Pro Tools · RedOne Qazaqstan
          </p>
        </div>
      </div>

      {/* стрелка вниз — только там, где блок занимает весь экран */}
      <a
        href="#stats"
        aria-label="Прокрутить вниз"
        className="absolute left-1/2 -translate-x-1/2 bottom-6 scroll-bounce hidden lg:block"
        style={{ color: 'var(--gold)', opacity: 0.55 }}
      >
        <ChevronDown size={28} aria-hidden="true" />
      </a>
    </section>
  );
}
