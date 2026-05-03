import { Eyebrow } from "./Eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto tempo leva pra entregar um projeto?",
    a: "Depende do escopo. Sites simples ficam prontos em 5-10 dias. Projetos com automação e IA, entre 2 e 4 semanas. Sempre defino o prazo na proposta e cumpro.",
  },
  {
    q: "Por que 'feito com IA' é vantagem pra mim?",
    a: "Velocidade e custo. Uso IA pra acelerar design, código, copy e imagens — entregando em dias o que agências tradicionais entregam em meses, com qualidade equivalente e preço acessível.",
  },
  {
    q: "Vocês fazem manutenção depois da entrega?",
    a: "Sim. Todo projeto inclui suporte pós-entrega (de 30 a 180 dias dependendo do pacote). Depois disso, ofereço planos mensais de manutenção opcional.",
  },
  {
    q: "Posso pedir alterações durante o projeto?",
    a: "Sim, mudanças dentro do escopo combinado são livres. Alterações grandes que mudem o escopo são alinhadas separadamente para garantir prazo e qualidade.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Geralmente 50% no início e 50% na entrega. Para projetos maiores podemos parcelar em 2 ou 3 vezes. Aceito Pix, transferência e cartão.",
  },
  {
    q: "Atende fora de São Paulo?",
    a: "Sim! Trabalho 100% remoto e atendo clientes em todo o Brasil. Reuniões por Google Meet, WhatsApp ou e-mail.",
  },
];

export const FAQ = () => (
  <section id="faq" className="py-24 bg-surface">
    <div className="max-w-[800px] mx-auto px-6">
      <div className="reveal text-center">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <h2 className="font-display font-extrabold leading-tight tracking-tight mb-5 text-[clamp(30px,4vw,46px)]">
          Dúvidas{" "}
          <em className="font-serif-italic font-normal text-brand">comuns</em>
        </h2>
        <p className="text-[17px] text-muted-brand leading-[1.75] mb-12 font-light">
          Não encontrou sua dúvida? Manda uma mensagem que respondo rapidinho.
        </p>
      </div>

      <Accordion type="single" collapsible className="reveal space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="bg-[hsl(var(--brand-bg))] border border-border/50 hover:border-brand-soft rounded-xl px-5 transition-colors data-[state=open]:border-brand-soft"
          >
            <AccordionTrigger className="font-display text-[15px] font-medium text-foreground hover:text-brand hover:no-underline text-left py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[14px] text-muted-brand leading-relaxed font-light pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
