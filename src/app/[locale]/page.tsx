import { unstable_setRequestLocale } from "next-intl/server";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import TechMarquee from "./_components/TechMarquee";
import About from "./_components/About";
import Services from "./_components/Services";
import Skills from "./_components/Skills";
import Projects from "./_components/Projects";
import Process from "./_components/Process";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);

  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
