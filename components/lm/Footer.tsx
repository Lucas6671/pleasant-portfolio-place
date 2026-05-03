import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/50 bg-background">
    <div className="max-w-[1100px] mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div className="md:col-span-2">
          <a href="#inicio" className="flex items-center gap-2.5 mb-4">
            <div className="relative w-9 h-9 border border-brand rounded-lg flex items-center justify-center text-[11px] font-extrabold text-brand bg-brand/10">
              LM
            </div>
            <span className="font-display font-bold text-[15px] tracking-wider">
              LM <span className="text-brand">InfoTech</span>
            </span>
          </a>
          <p className="text-[14px] text-muted-brand leading-relaxed font-light max-w-md">
            Sites, automações, agentes de IA e conteúdo inteligente para empresas
            que querem crescer com tecnologia. Feito 100% com IA.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wide">
            Navegação
          </h4>
          <ul className="space-y-2.5">
            {[
              ["#servicos", "Serviços"],
              ["#casos", "Casos de uso"],
              ["#pacotes", "Pacotes"],
              ["#processo", "Processo"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <li key={label}>
                <a href={href} className="text-[13px] text-faint hover:text-brand transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wide">
            Contato
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a href="mailto:lucasmourainfotech@gmail.com" className="flex items-center gap-2 text-[13px] text-faint hover:text-brand transition-colors">
                <Mail size={13} /> lucasmourainfotech@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/5511958205231" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-faint hover:text-brand transition-colors">
                <Phone size={13} /> (11) 95820-5231
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg border border-border/50 hover:border-brand-soft hover:bg-brand/10 flex items-center justify-center text-faint hover:text-brand transition-all">
              <Instagram size={15} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-border/50 hover:border-brand-soft hover:bg-brand/10 flex items-center justify-center text-faint hover:text-brand transition-all">
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-7 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-faint font-light">
          © {new Date().getFullYear()} <span className="text-brand font-medium">LM InfoTech</span> — Feito 100% com IA.
        </p>
        <p className="text-[12px] text-faint font-light">
          Em conformidade com a LGPD · Seus dados são tratados com segurança.
        </p>
      </div>
    </div>
  </footer>
);
