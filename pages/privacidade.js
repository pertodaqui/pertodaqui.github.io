import Head from "next/head";
import { Briefcase, EnvelopeSimple, House } from "@phosphor-icons/react";

export default function Privacidade() {
  return (
    <>
      <Head>
        <title>PertoDaqui - Politica de Privacidade</title>
        <meta
          name="description"
          content="Politica de privacidade do PertoDaqui."
        />
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
            <h1>Politica de Privacidade</h1>
            <p>Ultima atualizacao: 2026</p>
            <p>
              Esta Politica descreve como coletamos, usamos e protegemos suas
              informacoes ao usar o PertoDaqui.
            </p>
            <h2>Coleta de dados</h2>
            <p>
              Podemos coletar dados de localizacao (com sua permissao), dados de
              navegacao e preferencias de filtros para melhorar as sugestoes.
            </p>
            <h2>Uso dos dados</h2>
            <p>
              Usamos os dados para personalizar resultados, aprimorar a
              plataforma e fornecer informacoes relevantes.
            </p>
            <h2>Compartilhamento</h2>
            <p>
              Nao vendemos seus dados. Podemos compartilhar informacoes
              agregadas para fins de analise.
            </p>
            <h2>Seus direitos</h2>
            <p>
              Voce pode solicitar acesso, correcao ou exclusao de dados pelo
              email contato@pertodaqui.com.
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
