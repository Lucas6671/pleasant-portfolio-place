import { Eyebrow } from "./Eyebrow";
import { Check } from "lucide-react";

const checks = [
  "Entrega dentro do prazo combinado — sempre",
  "100% feito com IA — rápido, eficiente e escalável",
  "Comunicação clara, sem jargão técnico desnecessário",
  "Suporte após a entrega incluído em todos os projetos",
];

const metrics: [string, string, string][] = [
  ["50", "+", "Projetos entregues com sucesso"],
  ["98", "%", "Clientes satisfeitos"],
  ["5", "x", "Retorno médio sobre o investimento"],
  ["3", "+", "Anos usando IA em projetos reais"],
];

export const About = () => (
  <section id="sobre" className="border-y border-border/50 py-16">
    <div className="max-w-[1100px] mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <Eyebrow>Por que me contratar</Eyebrow>
          <h2 className="font-display font-bold leading-tight tracking-tight mb-5 text-[clamp(26px,3vw,36px)]">
            Resultado real,
            <br />
            <em className="font-serif-italic font-normal text-brand">sem precisar</em>
            <br />entender de código.
          </h2>
          <p className="text-base text-muted-brand leading-[1.8] mb-7 font-light">
            Uso inteligência artificial do início ao fim dos projetos — o que significa
            entregas mais rápidas, custo menor e resultados comparáveis a agências
            tradicionais. Você foca no seu negócio, eu cuido da tecnologia.
          </p>
          <ul className="flex flex-col gap-3.5">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-3 text-[15px] text-muted-brand font-light">
                <span className="w-5 h-5 rounded-md bg-brand/10 border border-brand-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={11} className="text-brand" strokeWidth={3} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal reveal-d1 grid grid-cols-2 gap-4">
          {metrics.map(([n, s, l]) => (
            <div
              key={l}
              className="relative bg-surface border border-border/50 rounded-2xl p-7 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-2/5 h-0.5 bg-brand rounded-tr" />
              <div className="font-display text-[38px] font-extrabold text-foreground leading-none mb-1.5 tracking-tight">
                {n}
                <span className="text-brand">{s}</span>
              </div>
              <div className="text-[13px] text-faint leading-relaxed font-light">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
