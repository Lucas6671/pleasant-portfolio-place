import { useState } from "react";
import { useScrolled } from "@/hooks/use-scrolled";
import { Menu, X } from "lucide-react";

const links = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "casos", label: "Casos de uso" },
  { id: "sobre", label: "Sobre" },
];

export const Navbar = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 transition-all duration-300 ${
          scrolled
            ? "bg-[hsl(var(--brand-bg)/0.85)] backdrop-blur-xl border-b border-border/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1100px] mx-auto h-[68px] flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 border border-brand rounded-lg flex items-center justify-center text-[11px] font-extrabold text-brand bg-brand/10 overflow-hidden tracking-tight">
              LM
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand/30" />
            </div>
            <span className="font-display font-bold text-[15px] text-foreground tracking-wider">
              LM <span className="text-brand">InfoTech</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-9 list-none">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="relative font-display text-sm text-muted-brand hover:text-foreground transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-all hover:after:w-full"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contato"
                className="bg-brand hover:bg-[hsl(var(--brand-blue-soft))] text-white px-5 py-2.5 rounded-lg font-display text-sm font-medium transition-all hover:-translate-y-0.5 inline-block"
              >
                Falar comigo
              </a>
            </li>
          </ul>

          <button
            className="md:hidden p-1 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 z-[99] bg-[hsl(var(--brand-bg)/0.97)] backdrop-blur-2xl flex flex-col items-center justify-center gap-10">
          {[...links, { id: "contato", label: "Contato" }].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-bold text-foreground hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};
