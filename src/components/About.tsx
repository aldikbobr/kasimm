import { PERSON } from '@/data';

export default function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo */}
        <div className="rv relative">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              aspectRatio: '4/5',
              border: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <img
              src="/kasym-about.jpg"
              alt="Касым Амангельдин — портрет"
              className="w-full h-full object-cover"
              style={{
                maskImage: 'radial-gradient(ellipse 100% 100% at 50% 40%, #000 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 40%, #000 60%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="rv-kids">
          <div className="eyebrow">Обо мне</div>
          <h2 className="h2">
            Я делаю
            <br />
            <span className="gold-text">форму, а не стрижку</span>
          </h2>
          <div className="mt-6 space-y-4 text-base" style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
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
          <p className="mt-6 text-sm" style={{ color: 'var(--gold)', letterSpacing: '0.05em' }}>
            Амбассадор Hector Pro Tools · RedOne Qazaqstan
          </p>
        </div>
      </div>
    </section>
  );
}
