import Head from "next/head";
import { ArrowCircleRight, ChartLineUp, Cpu, MapPin, Megaphone } from "@phosphor-icons/react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function ComoAparecerPage() {
  return (
    <>
      <Head>
        <title>Como Aparecer | PertoDaqui</title>
        <meta
          name="description"
          content="Entenda as vantagens de aparecer no PertoDaqui e como participar dos roteiros criados por inteligência artificial."
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
                <div className="badge badge-primary badge-outline">Para empresas</div>
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">Como aparecer no PertoDaqui</h1>
                <p className="mt-4 text-base-content/75">
                  Sua marca passa a ser descoberta por usuários que já estão no contexto de decisão.
                  Menos mídia desperdiçada, mais oportunidade local.
                </p>
                <a href="mailto:contato@pertodaqui.app" className="btn btn-primary mt-5">
                  Falar com a equipe
                  <ArrowCircleRight size={18} />
                </a>
              </div>
              <figure className="overflow-hidden rounded-box border border-base-300">
                <img src="/illustrations/growth.svg" alt="Ilustração de crescimento de presença local" className="h-full w-full object-cover" />
              </figure>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <MapPin size={24} className="text-primary" />
                <h2 className="card-title text-lg">1. Cadastre seu negócio</h2>
                <p className="text-sm text-base-content/75">
                  Compartilhe informações essenciais para aparecer com qualidade nas listagens.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <Megaphone size={24} className="text-primary" />
                <h2 className="card-title text-lg">2. Ganhe visibilidade</h2>
                <p className="text-sm text-base-content/75">
                  Seu ponto entra nas buscas por categoria, distância e perfil de interesse.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <ChartLineUp size={24} className="text-primary" />
                <h2 className="card-title text-lg">3. Evolua com dados</h2>
                <p className="text-sm text-base-content/75">
                  A presença recorrente aumenta reconhecimento e melhora conversão local.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Cpu size={24} className="text-primary" />
              Roteiros com inteligência artificial
            </h2>
            <p className="mt-4 text-base-content/80">
              O PertoDaqui combina sinais de contexto e comportamento para sugerir rotas e combinações.
              Estar na plataforma aumenta sua chance de aparecer nesses roteiros automaticamente.
            </p>
            <div className="mt-6 rounded-box border border-primary/20 bg-primary/5 p-4">
              <p className="font-semibold">Custo baixo para entrar, custo alto para ficar fora.</p>
              <p className="mt-1 text-sm text-base-content/80">
                Fale com a equipe:{" "}
                <a href="mailto:contato@pertodaqui.app" className="link link-primary">
                  contato@pertodaqui.app
                </a>
              </p>
            </div>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
