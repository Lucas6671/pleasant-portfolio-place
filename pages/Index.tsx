import { useReveal } from "@/hooks/use-reveal";
import { Navbar } from "@/components/lm/Navbar";
import { Hero } from "@/components/lm/Hero";
import { Services } from "@/components/lm/Services";
import { UseCases } from "@/components/lm/UseCases";
import { Process } from "@/components/lm/Process";
import { About } from "@/components/lm/About";
import { FAQ } from "@/components/lm/FAQ";
import { Contact } from "@/components/lm/Contact";
import { Footer } from "@/components/lm/Footer";
import { WhatsAppFloat } from "@/components/lm/WhatsAppFloat";

const Index = () => {
  useReveal();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <UseCases />
      <Process />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
