import { Eyebrow } from "./Eyebrow";
import { Check, Star } from "lucide-react";

const packages = [
  {
    name: "Essencial",
    badge: "Para começar",
    price: "R$ 1.490",
    period: "projeto único",
    desc: "Ideal para autônomos e pequenos negócios que precisam de presença digital profissional.",
    features: [
      "Landing page com IA (até 5 seções)",
      "Design responsivo e SEO básico",
      "Integração com WhatsApp",
      "Hospedagem nos primeiros 3 meses",
      "Entrega em até 7 dias úteis",
    ],
    cta: "Quero o Essencial",
    highlighted: false,
  },
  {
    name: "Profissional",
    badge: "Mais escolhido",
    price: "R$ 2.990",
    period: "projeto único",
    desc: "Site completo + automação inteligente para escalar atendimento e geração de leads.",
    features: [
      "Site institucional completo (até 8 páginas)",
      "Chatbot com IA no WhatsApp",
      "1 automação personalizada (Make/n8n)",
      "SEO técnico e copy com IA",
      "Suporte por 60 dias",
      "Treinamento da equipe",
    ],
    cta: "Quero o Profissional",
    highlighted: true,
  },
  {
    name: "Premium IA",
    badge: "Solução completa",
    price: "Sob proposta",
    period: "a partir de R$ 6.000",
    desc: "Para empresas que querem transformar processos com IA — site, agente, automações e conteúdo.",
    features: [
      "Tudo do Profissional, e mais:",
      "Agente de IA personalizado (RAG)",
      "Até 5 automações integradas",
      "Estratégia de conteúdo mensal com IA",
      "GPT customizado para a equipe",
      "Suporte por 6 meses",
    ],
    cta: "Solicitar proposta",
    highlighted: false,
  },
];

export const Packages = () => (
  <section id="pacotes" className="py-24 bg-surface relative overflow-hidden">
    <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-blue)/0.08),transparent_70%)]" />

    <div className="max-w-[1100px] mx-auto px-6 relative">
      <div className="reveal text-center">
        <Eyebrow>Pacotes e propostas</Eyebrow>
        <h2 className="font-display font-extrabold leading-tight tracking-tight mb-5 text-[clamp(30px,4vw,46px)]">
          Escolha o pacote ideal para{" "}
          <em className="font-serif-italic font-normal text-brand">o seu momento</em>
        </h2>
        <p className="text-[17px] text-muted-brand leading-[1.75] max-w-[600px] mx-auto mb-14 font-light">
          Propostas claras, escopo definido e entrega no prazo. Tudo personalizado
          para o seu negócio — sem letras miúdas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <div
            key={pkg.name}
            className={`reveal reveal-d${i + 1} relative rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 ${
              pkg.highlighted
                ? "bg-[hsl(var(--brand-bg))] border-2 border-brand shadow-[0_20px_60px_-20px_hsl(var(--brand-blue)/0.5)] md:scale-105"
                : "bg-[hsl(var(--brand-bg))] border border-border/50 hover:border-brand-soft"
            }`}
          >
            {pkg.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={11} fill="white" />
                {pkg.badge}
              </div>
            )}
            {!pkg.highlighted && (
              <div className="text-[10px] font-semibold text-[hsl(var(--brand-blue-soft))] tracking-[0.08em] uppercase mb-2">
                {pkg.badge}
              </div>
            )}
            <h3 className="font-display text-2xl font-bold mb-2 tracking-tight">{pkg.name}</h3>
            <p className="text-[13px] text-muted-brand leading-relaxed font-light mb-5 min-h-[40px]">
              {pkg.desc}
            </p>
            <div className="mb-6">
              <div className="font-display text-3xl font-extrabold text-foreground tracking-tight">
                {pkg.price}
              </div>
              <div className="text-xs text-faint mt-1">{pkg.period}</div>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-muted-brand font-light">
                  <span className="w-4 h-4 rounded bg-brand/10 border border-brand-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={10} className="text-brand" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={`#contato?pkg=${encodeURIComponent(pkg.name)}`}
              onClick={(e) => {
                e.preventDefault();
                const ev = new CustomEvent("lm:select-package", { detail: pkg.name });
                window.dispatchEvent(ev);
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`btn-shine text-center font-display font-medium text-[14px] py-3 px-5 rounded-lg transition-all ${
                pkg.highlighted
                  ? "bg-brand hover:bg-[hsl(var(--brand-blue-soft))] text-white"
                  : "bg-transparent border border-brand-soft text-foreground hover:bg-brand/10 hover:border-brand"
              }`}
            >
              {pkg.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-[13px] text-faint mt-10 font-light">
        Pacotes podem ser ajustados conforme sua necessidade. Todos incluem proposta detalhada antes do início do projeto.
      </p>
    </div>
  </section>
);
