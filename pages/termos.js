import Head from "next/head";
import { Briefcase, EnvelopeSimple, House } from "@phosphor-icons/react";

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
            <a href="/" aria-label="Ir para a pagina inicial">
              <img src="/logo.svg" alt="PertoDaqui" className="logo" />
            </a>
            <div className="header-actions">
              <a
                className="cta-link"
                href="https://buy.stripe.com/bJe14mfCd9HB6Zy7P8gYU00"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divulgue seu negocio"
                title="Divulgue seu negocio"
              >
                <span aria-hidden="true" className="cta-icon">
                  <Briefcase size={20} weight="bold" />
                </span>
                <span className="cta-text">Divulgue seu negocio aqui</span>
              </a>
              <a className="cta-home" href="/" aria-label="Pagina inicial" title="Inicio">
                <House size={20} weight="bold" />
              </a>
              <a
                className="cta-contact"
                href="mailto:contato@pertodaqui.com"
                aria-label="Enviar email para contato@pertodaqui.com"
                title="contato@pertodaqui.com"
              >
                <EnvelopeSimple size={20} weight="bold" />
              </a>
            </div>
          </div>
        </header>

        <main className="content legal-content">
          <section className="legal-card">
            <h1>Termos de Uso</h1>
            <p>Ultima atualizacao: 2026</p>
            <p>
              Ao utilizar o PertoDaqui, voce concorda com os termos descritos
              abaixo.
            </p>
            <h2>Uso da plataforma</h2>
            <p>
              O PertoDaqui e uma plataforma de descoberta de negocios e
              experiencias. Voce e responsavel pelo uso correto das informacoes
              apresentadas.
            </p>
            <h2>Conteudo e disponibilidade</h2>
            <p>
              Trabalhamos para manter os dados atualizados, mas nao garantimos
              disponibilidade, precos ou informacoes de terceiros.
            </p>
            <h2>Conduta</h2>
            <p>
              Nao e permitido usar a plataforma para fins ilegais, abusivos ou
              que violem direitos de terceiros.
            </p>
            <h2>Suporte</h2>
            <p>
              Para duvidas ou suporte, entre em contato pelo email
              contato@pertodaqui.com.
            </p>
          </section>

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="footer-logo">PertoDaqui</span>
                <p className="footer-slogan">
                  Descubra o melhor perto de voce.
                </p>
              </div>
              <nav className="footer-links" aria-label="Links institucionais">
                <a href="/privacidade">Politica de privacidade</a>
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
