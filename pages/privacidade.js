import Head from "next/head";
import {
  Cookie,
  Database,
  LockKey,
  ShieldCheck,
  UserCircleGear,
  ClockCounterClockwise,
  GlobeHemisphereWest,
  Handshake
} from "@phosphor-icons/react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function PrivacidadePage() {
  return (
    <>
      <Head>
        <title>Política de Privacidade | PertoDaqui</title>
        <meta
          name="description"
          content="Política de Privacidade do PertoDaqui. Saiba quais dados coletamos, como usamos e seus direitos."
        />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css"
        />
      </Head>

      <StaticPageLayout>
        <div className="space-y-6">
          <section className="overflow-hidden bg-transparent">
            <div className="w-full p-6 md:p-8">
              <h1 className="font-bold" style={{ fontSize: "clamp(1.6rem, 4.8vw, 4.4rem)", lineHeight: 0.9 }}>
                Política de Privacidade
              </h1>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Database size={22} className="text-primary" /> Dados que coletamos</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Dados de uso do produto, como filtros, raio e categorias selecionadas.</li>
                  <li>Localizacao aproximada, apenas com permissao do navegador.</li>
                  <li>Dados tecnicos: tipo de dispositivo, navegador e logs de erro.</li>
                  <li>Dados de contexto, como clima por coordenada para enriquecer sugestoes.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Cookie size={22} className="text-primary" /> Finalidade do tratamento</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Entregar recomendacoes locais com melhor relevancia.</li>
                  <li>Ordenar resultados por distancia e preferencia.</li>
                  <li>Aprimorar desempenho, seguranca e estabilidade da plataforma.</li>
                  <li>Detectar abuso, indisponibilidades e tentativas de uso indevido.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><GlobeHemisphereWest size={22} className="text-primary" /> Base legal e consentimento</h2>
                <p className="text-sm text-base-content/80">
                  O tratamento ocorre com base em consentimento (ex.: localizacao), execucao de
                  funcionalidades solicitadas pelo usuario e interesse legitimo para seguranca e
                  melhoria do servico. Permissoes podem ser revogadas a qualquer momento no navegador.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><ClockCounterClockwise size={22} className="text-primary" /> Retencao e descarte</h2>
                <p className="text-sm text-base-content/80">
                  Mantemos dados apenas pelo tempo necessario para cumprir as finalidades descritas
                  nesta politica, requisitos legais e prevencao de fraude. Apos esse periodo, os
                  dados sao excluidos ou anonimizados.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Handshake size={22} className="text-primary" /> Compartilhamento com terceiros</h2>
                <p className="text-sm text-base-content/80">
                  Nao vendemos dados pessoais. Compartilhamentos sao limitados a fornecedores
                  estritamente necessarios para operacao tecnica da plataforma (ex.: servicos de
                  infraestrutura e APIs de apoio), observando medidas de seguranca.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><UserCircleGear size={22} className="text-primary" /> Direitos do titular</h2>
                <p className="text-sm text-base-content/80">
                  Voce pode solicitar confirmacao de tratamento, acesso, correcao, anonimização,
                  portabilidade quando aplicavel e exclusao de dados pessoais, alem de se opor a
                  tratamentos especificos, nos limites legais.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <ShieldCheck size={24} className="text-primary" />
              Seguranca e contato
            </h2>
            <div className="mt-3 space-y-3 text-base-content/80">
              <p>
                Adotamos medidas tecnicas e organizacionais para reduzir risco de acesso nao
                autorizado, perda e alteracao indevida de dados.
              </p>
              <p>
                Para solicitacoes relacionadas a privacidade e protecao de dados, envie email para{" "}
                <a href="mailto:contato@pertodaqui.app" className="link link-primary">
                  contato@pertodaqui.app
                </a>.
              </p>
              <p className="text-sm opacity-80">
                Esta politica pode ser atualizada periodicamente. Recomendamos revisao regular.
              </p>
            </div>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
