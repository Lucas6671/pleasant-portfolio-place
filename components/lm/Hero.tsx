import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";

const userPrompt = "Crie um site para minha clínica com agendamento online e chatbot de atendimento.";
const aiAnswer = "Entendido! Vou criar seu site com design moderno, SEO otimizado, formulário de agendamento integrado e chatbot treinado com suas informações...";

const useTyping = (text: string, speed = 18) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
};

export const Hero = () => {
  const aiTyped = useTyping(aiAnswer, 22);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-[68px] overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-blue)/0.15),transparent_65%)]" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-blue)/0.10),transparent_65%)]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent animate-scanline" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand-soft text-[12px] font-medium tracking-[0.06em] uppercase text-[hsl(var(--brand-blue-soft))] animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" />
            Disponível para novos projetos
          </div>

          <h1 className="font-display font-extrabold leading-[1.05] tracking-tight mb-6 animate-fade-up text-[clamp(38px,5vw,62px)]">
            Resultados reais com{" "}
            <em className="block not-italic text-brand">Inteligência Artificial</em>
            <span className="block mt-1 font-serif-italic font-normal text-muted-brand text-[0.72em]">
              sem precisar saber programar.
            </span>
          </h1>

          <p className="text-[17px] text-muted-brand leading-[1.75] max-w-[480px] mb-10 font-light animate-fade-up">
            Crio sites, automações, agentes de IA e conteúdo inteligente para empresas
            que querem crescer com tecnologia — tudo 100% produzido com IA, com foco em
            resultado e sem complicação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
            <a
              href="#contato"
              className="btn-shine inline-flex items-center justify-center gap-2.5 bg-brand hover:bg-[hsl(var(--brand-blue-soft))] text-white font-display text-[15px] font-medium px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
            >
              <Phone size={16} />
              Quero um orçamento
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2.5 bg-transparent text-foreground hover:text-brand hover:bg-brand/10 hover:border-brand font-display text-[15px] px-7 py-3.5 rounded-lg border border-brand-soft transition-all"
            >
              Ver meus serviços
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* AI Mockup */}
        <div className="hidden lg:flex justify-center items-center animate-fade-up">
          <div className="w-full max-w-[420px] bg-surface border border-brand-soft rounded-[20px] overflow-hidden relative shadow-[0_20px_60px_-20px_hsl(var(--brand-blue)/0.4)]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
            <div className="px-4.5 py-3.5 border-b border-border/50 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-xs text-faint ml-1.5 tracking-wider">agente-ia.prompt</span>
            </div>
            <div className="p-5">
              <div className="bg-surface-2 border border-border/50 rounded-[10px] px-4 py-3.5 mb-3.5">
                <div className="text-[10px] text-[hsl(var(--brand-blue-soft))] tracking-[0.08em] uppercase mb-2 font-semibold">
                  Você
                </div>
                <div className="text-[13px] text-muted-brand leading-relaxed font-light">
                  {userPrompt}
                </div>
              </div>
              <div className="bg-surface-2 border border-brand-soft border-l-2 border-l-brand rounded-[10px] px-4 py-3.5">
                <div className="text-[10px] text-[#86efac] tracking-[0.08em] uppercase mb-2 font-semibold">
                  Agente IA
                </div>
                <div className="text-[13px] text-muted-brand leading-relaxed font-light min-h-[60px]">
                  {aiTyped}
                  <span className="inline-block w-0.5 h-3.5 bg-brand ml-0.5 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px bg-border/50 border-t border-border/50">
              {[
                ["50+", "projetos"],
                ["98%", "satisfação"],
                ["5x", "retorno médio"],
              ].map(([n, l]) => (
                <div key={l} className="bg-surface px-3 py-4 text-center">
                  <div className="font-display text-[22px] font-extrabold text-brand leading-none mb-1">{n}</div>
                  <div className="text-[10px] text-faint uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
