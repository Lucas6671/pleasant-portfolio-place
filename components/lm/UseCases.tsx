import { Eyebrow } from "./Eyebrow";

const cases = [
  {
    id: "1",
    category: "Saúde & Clínicas",
    name: "Clínica Bem Viver",
    description: "Site institucional com blog, agendamento online e SEO local. +180% de visitas orgânicas em 3 meses.",
    image_url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1280&h=720&fit=crop&auto=format&q=80",
    image_alt: "Clínica de saúde moderna",
  },
  {
    id: "2",
    category: "Imobiliário",
    name: "Imobiliária UrbanHub",
    description: "Automação de atendimento via WhatsApp com agente de IA que qualifica leads e agenda visitas. 4h/dia economizadas.",
    image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=720&fit=crop&auto=format&q=80",
    image_alt: "Imóveis e chaves",
  },
  {
    id: "3",
    category: "Varejo & Artesanato",
    name: "Loja Artesã Raiz",
    description: "Estratégia de conteúdo completa com posts e imagens gerados por IA. Engajamento no Instagram dobrou em 45 dias.",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&h=720&fit=crop&auto=format&q=80",
    image_alt: "Produtos artesanais coloridos",
  },
  {
    id: "4",
    category: "Pet Shop & Veterinário",
    name: "PetCare Premium",
    description: "Site com agendamento de banho e tosa, chatbot de atendimento e galeria de fotos dos pets atendidos.",
    image_url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1280&h=720&fit=crop&auto=format&q=80",
    image_alt: "Cachorro feliz sendo cuidado",
  },
  {
    id: "5",
    category: "Estética & Beleza",
    name: "Studio Élise",
    description: "Landing page com galeria de antes e depois, sistema de agendamento e automação de confirmação por WhatsApp.",
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1280&h=720&fit=crop&auto=format&q=80",
    image_alt: "Salão de beleza moderno",
  },
  {
    id: "6",
    category: "Educação & Cursos",
    name: "Escola de Idiomas Fluente",
    description: "GPT personalizado como tutor de idiomas, automação de matrícula e site com área de alunos integrada.",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&h=720&fit=crop&auto=format&q=80",
    image_alt: "Estudantes aprendendo juntos",
  },
];

export const UseCases = () => {
  return (
    <section id="casos" className="py-24 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="reveal">
          <Eyebrow>Casos de uso</Eyebrow>
          <h2 className="font-display font-extrabold leading-tight tracking-tight mb-5 text-[clamp(30px,4vw,46px)]">
            O que dá pra fazer com{" "}
            <em className="font-serif-italic font-normal text-brand">IA bem aplicada</em>
          </h2>
          <p className="text-[17px] text-muted-brand leading-[1.75] max-w-[600px] mb-14 font-light">
            Cenários reais de aplicação para diferentes tipos de negócio. Cada projeto
            é desenhado sob medida para o seu objetivo — esses são exemplos do que
            a IA pode entregar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((p, i) => (
            <article
              key={p.id}
              className={`reveal reveal-d${(i % 3) + 1} group bg-surface border border-border/50 hover:border-brand-soft rounded-2xl overflow-hidden transition-all hover:-translate-y-1`}
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-surface-2">
                <img
                  src={p.image_url}
                  alt={p.image_alt}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-[hsl(var(--brand-bg)/0.7)] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-semibold text-[hsl(var(--brand-blue-soft))] tracking-wider uppercase border border-brand-soft px-3.5 py-1.5 rounded-full bg-brand/10">
                    Caso de uso
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-[10px] text-[hsl(var(--brand-blue-soft))] font-semibold tracking-[0.08em] uppercase mb-1.5">
                  {p.category}
                </div>
                <h3 className="font-display text-base font-bold mb-1.5 tracking-tight">
                  {p.name}
                </h3>
                <p className="text-[13px] text-faint leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
