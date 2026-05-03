import { useEffect, useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  package: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Conta um pouco mais sobre o projeto").max(2000),
});

const services = [
  "Site com IA",
  "Automação com IA",
  "Agente de IA / Chatbot",
  "Conteúdo com IA",
  "Imagens e Vídeos com IA",
  "GPT Personalizado",
  "Outro / não sei ainda",
];

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [pkg, setPkg] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setPkg(detail);
    };
    window.addEventListener("lm:select-package", handler);
    return () => window.removeEventListener("lm:select-package", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: String(fd.get("service") || ""),
      package: String(fd.get("package") || ""),
      message: String(fd.get("message") || ""),
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(first?.message || "Preencha o formulário corretamente.");
      return;
    }

    setSending(true);
    const { error } = await supabase.functions.invoke("submit-lead", {
      body: parsed.data,
    });
    setSending(false);

    if (error) {
      console.error(error);
      toast.error("Não consegui enviar agora. Tente pelo WhatsApp.");
      return;
    }
    setSubmitted(true);
    toast.success("Mensagem enviada! Respondo em até 24h.");
  };

  const inputClass =
    "w-full bg-[hsl(var(--brand-bg))] border border-border/50 focus:border-brand rounded-lg px-4 py-3 font-display text-[15px] text-foreground outline-none transition-colors font-light placeholder:text-faint";

  return (
    <section id="contato" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-blue)/0.10),transparent_70%)]" />

      <div className="max-w-[1100px] mx-auto px-6 relative">
        <div className="reveal">
          <Eyebrow>Vamos conversar</Eyebrow>
          <h2 className="font-display font-extrabold leading-tight tracking-tight mb-5 text-[clamp(30px,4vw,46px)]">
            Vamos construir algo<br />
            <em className="font-serif-italic font-normal text-brand">incrível juntos</em>
          </h2>
          <p className="text-[17px] text-muted-brand leading-[1.75] max-w-[560px] mb-14 font-light">
            Me conta o que você precisa. Respondo em até 24 horas com uma proposta personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div className="reveal">
            <h3 className="font-display font-bold leading-tight tracking-tight mb-4 text-[clamp(22px,2.5vw,28px)]">
              Manda uma mensagem
            </h3>
            <p className="text-[15px] text-muted-brand leading-[1.8] mb-9 font-light">
              Seja um site, uma automação, um agente de IA ou uma ideia ainda no papel —
              estou aqui para transformar isso em tecnologia que funciona.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { Icon: Mail, label: "E-mail", value: "lucasmourainfotech@gmail.com" },
                { Icon: Phone, label: "WhatsApp", value: "(11) 95820-5231" },
                { Icon: MapPin, label: "Localização", value: "São Paulo · 100% remoto" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-brand/10 border border-brand-soft rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-faint mb-0.5">{label}</div>
                    <div className="text-[15px] text-foreground font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-d1">
            <div className="relative bg-surface border border-border/50 rounded-[20px] p-9 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-medium text-muted-brand tracking-wide">
                        Seu nome
                      </label>
                      <input name="name" type="text" placeholder="Maria Silva" required maxLength={100} className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-medium text-muted-brand tracking-wide">
                        E-mail
                      </label>
                      <input name="email" type="email" placeholder="maria@empresa.com" required maxLength={255} className={inputClass} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-muted-brand tracking-wide">
                      WhatsApp <span className="text-faint">(opcional)</span>
                    </label>
                    <input name="phone" type="tel" placeholder="(11) 99999-9999" maxLength={30} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-medium text-muted-brand tracking-wide">
                        Serviço de interesse
                      </label>
                      <select name="service" required className={`${inputClass} cursor-pointer`} defaultValue="">
                        <option value="" disabled>Selecione</option>
                        {services.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-medium text-muted-brand tracking-wide">
                        Pacote <span className="text-faint">(opcional)</span>
                      </label>
                      <select
                        name="package"
                        value={pkg}
                        onChange={(e) => setPkg(e.target.value)}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">Sem preferência</option>
                        <option value="Essencial">Essencial</option>
                        <option value="Profissional">Profissional</option>
                        <option value="Premium IA">Premium IA</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-medium text-muted-brand tracking-wide">
                      Conta um pouco sobre o projeto
                    </label>
                    <textarea
                      name="message"
                      required
                      maxLength={2000}
                      placeholder="Descreva brevemente o que você precisa. Quanto mais detalhes, melhor!"
                      className={`${inputClass} resize-y min-h-[120px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-shine w-full flex items-center justify-center gap-2.5 bg-brand hover:bg-[hsl(var(--brand-blue-soft))] text-white font-display text-base font-medium py-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar mensagem
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-[hsl(var(--success)/0.15)] border border-[hsl(var(--success)/0.4)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-[hsl(var(--success))]" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">Mensagem enviada!</h3>
                  <p className="text-[15px] text-muted-brand font-light">
                    Recebi seu contato e vou responder em até 24 horas. Até já!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
