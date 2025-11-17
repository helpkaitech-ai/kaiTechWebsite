import Hero from "@/components/hero";
import Features from "@/components/features";
import Workshops from "@/components/workshops";
import Cases from "@/components/cases";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import AgendaHighlights from "@/components/agenda-highlights";
import Build from "@/components/build";
import Playground from "@/components/playground";
import Journey from "@/components/journey";

export default function Home() {
  return (
    <main>
      <Hero />
      <AgendaHighlights />
      <Build />
      <Journey />
      <Features />
      <Workshops />
      <Cases />
      <About />
      <Playground />
      <Contact />
      <Footer />
    </main>
  );
}
