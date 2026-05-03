import { MessageCircle } from "lucide-react";

const phone = "5511958205231";
const message = "Olá Lucas! Vim pelo site da LM InfoTech e quero conversar sobre um projeto.";

export const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full pl-4 pr-5 py-3.5 shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.7)] transition-all hover:-translate-y-1 animate-float"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    <MessageCircle size={22} fill="white" strokeWidth={0} className="relative z-10" />
    <span className="relative z-10 hidden sm:inline font-display text-sm font-medium">
      Fale comigo
    </span>
  </a>
);
