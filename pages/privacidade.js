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
                  <li>Localização aproximada, apenas com permissão do navegador.</li>
                  <li>Dados técnicos: tipo de dispositivo, navegador e logs de erro.</li>
                  <li>Dados de contexto, como clima por coordenada para enriquecer sugestões.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Cookie size={22} className="text-primary" /> Finalidade do tratamento</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Entregar recomendações locais com melhor relevância.</li>
                  <li>Ordenar resultados por distância e preferência.</li>
                  <li>Aprimorar desempenho, segurança e estabilidade da plataforma.</li>
                  <li>Detectar abuso, indisponibilidades e tentativas de uso indevido.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><GlobeHemisphereWest size={22} className="text-primary" /> Base legal e consentimento</h2>
                <p className="text-sm text-base-content/80">
                  O tratamento ocorre com base em consentimento (ex.: localização), execução de
                  funcionalidades solicitadas pelo usuário e interesse legítimo para segurança e
                  melhoria do serviço. Permissões podem ser revogadas a qualquer momento no navegador.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><ClockCounterClockwise size={22} className="text-primary" /> Retenção e descarte</h2>
                <p className="text-sm text-base-content/80">
                  Mantemos dados apenas pelo tempo necessário para cumprir as finalidades descritas
                  nesta política, requisitos legais e prevenção de fraude. Após esse período, os
                  dados são excluídos ou anonimizados.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Handshake size={22} className="text-primary" /> Compartilhamento com terceiros</h2>
                <p className="text-sm text-base-content/80">
                  Não vendemos dados pessoais. Compartilhamentos são limitados a fornecedores
                  estritamente necessários para operação técnica da plataforma (ex.: serviços de
                  infraestrutura e APIs de apoio), observando medidas de segurança.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><UserCircleGear size={22} className="text-primary" /> Direitos do titular</h2>
                <p className="text-sm text-base-content/80">
                  Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
                  portabilidade quando aplicável e exclusão de dados pessoais, além de se opor a
                  tratamentos específicos, nos limites legais.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <ShieldCheck size={24} className="text-primary" />
              Segurança e contato
            </h2>
            <div className="mt-3 space-y-3 text-base-content/80">
              <p>
                Adotamos medidas técnicas e organizacionais para reduzir risco de acesso não
                autorizado, perda e alteração indevida de dados.
              </p>
              <p>
                Para solicitações relacionadas a privacidade e proteção de dados, envie email para{" "}
                <a href="mailto:contato@pertodaqui.app" className="link link-primary">
                  contato@pertodaqui.app
                </a>.
              </p>
              <p className="text-sm opacity-80">
                Esta política pode ser atualizada periodicamente. Recomendamos revisão regular.
              </p>
            </div>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
