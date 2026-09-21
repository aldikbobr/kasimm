import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Regalia from '@/components/Regalia';
import Works from '@/components/Works';
import Education from '@/components/Education';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Regalia />
        <Works />
        <Education />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
