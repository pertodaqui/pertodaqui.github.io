import Head from "next/head";
import { Compass, Lightning, MapPinArea, Sparkle } from "@phosphor-icons/react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function SobreNosPage() {
  return (
    <>
      <Head>
        <title>Sobre Nós | PertoDaqui</title>
        <meta
          name="description"
          content="Conheça a proposta do PertoDaqui: turismo de curta distância, descoberta inteligente e experiências perto de você."
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
            <div className="grid w-full grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
              <div>
                <div className="badge badge-primary badge-outline">Sobre o projeto</div>
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">Descobertas locais, sem perder tempo</h1>
                <p className="mt-4 text-base-content/75">
                  O PertoDaqui organiza lugares e atividades por distância, contexto e intenção.
                  A proposta e simples: transformar a vontade de sair da rotina em planos reais.
                </p>
              </div>
              <figure className="overflow-hidden rounded-box border border-base-300">
                <img src="/illustrations/discovery.svg" alt="Ilustração de descoberta local" className="h-full w-full object-cover" />
              </figure>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <MapPinArea size={24} className="text-primary" />
                <h2 className="card-title text-lg">Foco no que está perto</h2>
                <p className="text-sm text-base-content/75">
                  Menos busca infinita, mais opções possíveis para agora, hoje ou neste fim de semana.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <Compass size={24} className="text-primary" />
                <h2 className="card-title text-lg">Decisão rápida</h2>
                <p className="text-sm text-base-content/75">
                  Filtros claros, rota imediata e leitura simples para decidir em poucos cliques.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <Lightning size={24} className="text-primary" />
                <h2 className="card-title text-lg">Contexto inteligente</h2>
                <p className="text-sm text-base-content/75">
                  Distância real e clima no local para priorizar o que faz sentido no momento.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Sparkle size={24} className="text-primary" />
              O que entregamos na prática
            </h2>
            <p className="mt-4 text-base-content/80">
              Para quem busca passeio: sugestões úteis, próximas e acionáveis. Para quem anuncia:
              presença diante de pessoas prontas para visitar, comprar e reservar.
            </p>
            <p className="mt-3 text-base-content/80">
              O PertoDaqui existe para reduzir atrito entre vontade e ação. Quando você abre o site,
              a expectativa é sair com uma decisão, não com mais dúvidas.
            </p>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
