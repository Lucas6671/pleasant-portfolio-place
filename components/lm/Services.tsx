import { Eyebrow } from "./Eyebrow";
import { Globe, Bot, Zap, Image as ImageIcon, Sparkles, FileText } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sites com IA",
    desc: "Sites institucionais, landing pages e e-commerces criados com IA — design moderno, rápido, responsivo e otimizado para SEO.",
    tags: ["Lovable", "Framer", "Webflow", "SEO"],
  },
  {
    icon: Zap,
    title: "Automações com IA",
    desc: "Automatize tarefas repetitivas: e-mails, WhatsApp, planilhas, relatórios. Sua equipe foca no que importa, a IA faz o resto.",
    tags: ["n8n", "Make", "Zapier", "OpenAI"],
  },
  {
    icon: Bot,
    title: "Agentes de IA / Chatbots",
    desc: "Agentes inteligentes que atendem, qualificam e vendem 24/7 no WhatsApp, Instagram ou no seu site — treinados com seu negócio.",
    tags: ["GPT-4", "Claude", "WhatsApp", "RAG"],
  },
  {
    icon: FileText,
    title: "Conteúdo com IA",
    desc: "Posts, blog, e-mails, scripts e copy — produção em escala com qualidade editorial e tom de voz da sua marca.",
    tags: ["GPT", "Claude", "Jasper", "SEO"],
  },
  {
    icon: ImageIcon,
    title: "Imagens e Vídeos com IA",
    desc: "Banners, thumbnails, avatares e vídeos curtos com IA — visuais profissionais sem fotógrafo ou designer.",
    tags: ["Midjourney", "DALL-E", "Runway", "Kling"],
  },
  {
    icon: Sparkles,
    title: "GPTs Personalizados",
    desc: "Assistentes de IA construídos com a identidade e o conhecimento da sua empresa — para equipes, clientes ou uso interno.",
    tags: ["OpenAI", "Claude", "RAG", "Knowledge"],
  },
];

export const Services = () => (
  <section id="servicos" className="relative py-24 bg-surface overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-soft to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-soft to-transparent" />

    <div className="max-w-[1100px] mx-auto px-6">
      <div className="reveal">
        <Eyebrow>O que eu faço</Eyebrow>
        <h2 className="font-display font-extrabold leading-tight tracking-tight mb-5 text-[clamp(30px,4vw,46px)]">
          Soluções com IA que{" "}
          <em className="font-serif-italic font-normal text-brand">transformam</em>
          <br />o jeito de fazer negócio
        </h2>
        <p className="text-[17px] text-muted-brand leading-[1.75] max-w-[560px] mb-14 font-light">
          Cada entrega é produzida com as melhores ferramentas de inteligência
          artificial, com foco em resultado e sem enrolação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className={`reveal reveal-d${(i % 3) + 1} group relative bg-[hsl(var(--brand-bg))] border border-border/50 hover:border-brand-soft rounded-2xl p-7 transition-all hover:-translate-y-1 overflow-hidden`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <div className="svc-icon w-12 h-12 rounded-xl bg-brand/10 border border-brand-soft flex items-center justify-center mb-5 transition-colors group-hover:bg-brand/20">
                <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2 tracking-tight">{s.title}</h3>
              <p className="text-[13.5px] text-muted-brand leading-relaxed font-light mb-5">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium text-[hsl(var(--brand-blue-soft))] tracking-wider uppercase border border-brand-soft bg-brand/10 px-2 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
