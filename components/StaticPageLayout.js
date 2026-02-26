import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function StaticPageLayout({ children }) {
  const [theme, setTheme] = useState("winter");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("v2-theme");
    if (saved === "night" || saved === "winter") {
      setTheme(saved);
    } else if (saved === "dark") {
      setTheme("night");
    } else if (saved === "cupcake") {
      setTheme("winter");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "winter" ? "night" : "winter";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("v2-theme", next);
      }
      return next;
    });
  };
  return (
    <div data-theme={theme} className="min-h-screen bg-base-200 text-base-content flex flex-col">
      <header
        className="border-b border-base-300 bg-base-100"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div className="navbar mx-auto w-full max-w-7xl px-4 md:px-8" style={{ minHeight: "108px" }}>
          <div className="navbar-start">
            <a href="/" className="px-0 h-full min-h-0 inline-flex items-center hover:bg-transparent" aria-label="Ir para a página inicial">
              <img
                src={theme === "night" ? "/logo-dark.svg" : "/logo.svg"}
                alt="PertoDaqui"
                className="w-auto"
                style={{ height: "72px" }}
              />
            </a>
          </div>
          <div className="navbar-end gap-2">
            <div
              className="tooltip tooltip-bottom"
              data-tip={theme === "winter" ? "Ativar modo escuro" : "Ativar modo claro"}
            >
              <button
                type="button"
                className="btn btn-ghost btn-circle"
                onClick={toggleTheme}
                aria-label={theme === "winter" ? "Ativar modo escuro" : "Ativar modo claro"}
                title={theme === "winter" ? "Modo escuro" : "Modo claro"}
              >
                {theme === "winter" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main
        className="mx-auto w-full max-w-7xl flex-1 px-4 pb-0 pt-0 md:px-8 md:pb-0"
        style={{ paddingTop: "140px", paddingBottom: "90px" }}
      >
        {children}
      </main>

      <footer className="v2-site-footer w-full border-t border-base-300 bg-base-100 py-6">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 v2-footer-inner">
          <aside>
            <p className="font-semibold">PertoDaqui © 2026</p>
            <p className="text-sm text-base-content/70">
              Turismo de curta distância para sair do tédio e conhecer o que existe ao seu redor.
            </p>
          </aside>
          <div className="v2-footer-columns text-sm">
            <div className="v2-footer-col">
              <strong className="v2-footer-col-title">SITE</strong>
              <a href="/sobre-nos/" className="link link-hover">Sobre nós</a>
              <a href="/parceiros/" className="link link-hover">Parceiros</a>
            </div>
            <div className="v2-footer-col">
              <strong className="v2-footer-col-title">Para empresas</strong>
              <a href="/quais-as-vantagens/" className="link link-hover">Quais as vantagens</a>
              <a href="/como-aparecer/" className="link link-hover">Como aparecer</a>
            </div>
            <div className="v2-footer-col">
              <strong className="v2-footer-col-title">Ajuda</strong>
              <a href="/privacidade/" className="link link-hover">Política de privacidade</a>
              <a href="/termos/" className="link link-hover">Termos de uso</a>
              <a href="mailto:contato@pertodaqui.app" className="link link-hover">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
