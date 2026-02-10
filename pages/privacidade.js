import Head from "next/head";
import { Briefcase, EnvelopeSimple } from "@phosphor-icons/react";

export default function Privacidade() {
  return (
    <>
      <Head>
        <title>PertoDaqui - Política de Privacidade</title>
        <meta
          name="description"
          content="Política de privacidade do PertoDaqui."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="site-header">
          <div className="site-header-inner">
            <a href="/" aria-label="Ir para a página inicial">
              <img src="/logo.svg" alt="PertoDaqui" className="logo" />
            </a>
            <div className="header-actions">
              <a
                className="cta-link"
                href="https://buy.stripe.com/bJe14mfCd9HB6Zy7P8gYU00"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divulgue seu negócio"
                title="Divulgue seu negócio"
                onClick={() => {
                  window.gtag?.("event", "cta_divulgue", {
                    event_category: "engagement",
                    event_label: "divulgue_negocio"
                  });
                }}
              >
                <span aria-hidden="true" className="cta-icon">
                  <Briefcase size={20} weight="bold" />
                </span>
                <span className="cta-text">Divulgue seu negócio aqui</span>
              </a>
              <a
                className="cta-contact"
                href="mailto:contato@pertodaqui.app"
                aria-label="Enviar email para contato@pertodaqui.app"
                title="contato@pertodaqui.app"
              >
                <EnvelopeSimple size={20} weight="bold" />
              </a>
            </div>
          </div>
        </header>

        <main className="content legal-content">
          <section className="legal-card">
            <h1>Política de Privacidade</h1>
            <p>Última atualização: 2026</p>
            <p>
              Esta Política descreve como coletamos, usamos e protegemos suas
              informações ao usar o PertoDaqui.
            </p>
            <h2>Coleta de dados</h2>
            <p>
              Podemos coletar dados de localização (com sua permissão), dados de
              navegação e preferências de filtros para melhorar as sugestões.
            </p>
            <h2>Uso dos dados</h2>
            <p>
              Usamos os dados para personalizar resultados, aprimorar a
              plataforma e fornecer informações relevantes.
            </p>
            <h2>Compartilhamento</h2>
            <p>
              Não vendemos seus dados. Podemos compartilhar informações
              agregadas para fins de análise.
            </p>
            <h2>Seus direitos</h2>
            <p>
              Você pode solicitar acesso, correção ou exclusão de dados pelo
              email contato@pertodaqui.app.
            </p>
          </section>

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="footer-logo">PertoDaqui</span>
                <p className="footer-slogan">
                  Descubra o melhor perto de você.
                </p>
              </div>
              <nav className="footer-links" aria-label="Links institucionais">
                <a href="/privacidade">Política de privacidade</a>
                <a href="/termos">Termos de uso</a>
                <a href="mailto:contato@pertodaqui.app">Contato</a>
              </nav>
              <span className="footer-copy">© 2026 PertoDaqui</span>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
