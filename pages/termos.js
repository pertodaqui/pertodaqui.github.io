import Head from "next/head";
import { Briefcase, EnvelopeSimple } from "@phosphor-icons/react";

export default function Termos() {
  return (
    <>
      <Head>
        <title>PertoDaqui - Termos de Uso</title>
        <meta name="description" content="Termos de uso do PertoDaqui." />
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
            <h1>Termos de Uso</h1>
            <p>Última atualização: 2026</p>
            <p>
              Ao utilizar o PertoDaqui, você concorda com os termos descritos
              abaixo.
            </p>
            <h2>Uso da plataforma</h2>
            <p>
              O PertoDaqui é uma plataforma de descoberta de negócios e
              experiências. Você é responsável pelo uso correto das informações
              apresentadas.
            </p>
            <h2>Conteúdo e disponibilidade</h2>
            <p>
              Trabalhamos para manter os dados atualizados, mas não garantimos
              disponibilidade, preços ou informações de terceiros.
            </p>
            <h2>Conduta</h2>
            <p>
              Não é permitido usar a plataforma para fins ilegais, abusivos ou
              que violem direitos de terceiros.
            </p>
            <h2>Suporte</h2>
            <p>
              Para dúvidas ou suporte, entre em contato pelo email
              contato@pertodaqui.app.
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
                <a href="/contato">Contato</a>
              </nav>
              <span className="footer-copy">© 2026 PertoDaqui</span>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
