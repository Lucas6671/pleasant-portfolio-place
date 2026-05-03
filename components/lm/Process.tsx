import { Eyebrow } from "./Eyebrow";
import { MessageSquare, FileText, Rocket, Headphones } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    n: "01",
    title: "Conversa inicial",
    desc: "Entendo seu negócio, seus desafios e o que você quer alcançar. Sem compromisso.",
  },
  {
    icon: FileText,
    n: "02",
    title: "Proposta sob medida",
    desc: "Em até 24h envio uma proposta detalhada com escopo, prazo e investimento.",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Execução com IA",
    desc: "Coloco a mão na massa usando as melhores ferramentas de IA, com atualizações constantes.",
  },
  {
    icon: Headphones,
    n: "04",
    title: "Entrega + suporte",
    desc: "Entrega no prazo, treinamento e suporte para garantir que tudo funcione perfeitamente.",
  },
];

export const Process = () => (
  <section id="processo" className="py-24 bg-background">
    <div className="max-w-[1100px] mx-auto px-6">
      <div className="reveal">
        <Eyebrow>Como trabalhamos</Eyebrow>
        <h2 className="font-display font-extrabold leading-tight tracking-tight mb-5 text-[clamp(30px,4vw,46px)]">
          Um processo{" "}
          <em className="font-serif-italic font-normal text-brand">simples</em> e transparente
        </h2>
        <p className="text-[17px] text-muted-brand leading-[1.75] max-w-[600px] mb-14 font-light">
          Do primeiro contato à entrega final, você sabe exatamente o que está acontecendo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.n}
              className={`reveal reveal-d${(i % 3) + 1} relative bg-surface border border-border/50 rounded-2xl p-6`}
            >
              <div className="font-display text-5xl font-extrabold text-brand/20 mb-3 tracking-tight leading-none">
                {s.n}
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand-soft flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base font-bold mb-2 tracking-tight">{s.title}</h3>
              <p className="text-[13px] text-muted-brand leading-relaxed font-light">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
