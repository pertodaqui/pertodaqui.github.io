import Head from "next/head";
import { CloudSun, GlobeHemisphereWest, Handshake, SuitcaseRolling } from "@phosphor-icons/react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function ParceirosPage() {
  return (
    <>
      <Head>
        <title>Parceiros | PertoDaqui</title>
        <meta
          name="description"
          content="Conheça os parceiros do PertoDaqui: Booking, Viator e o fornecedor de temperatura."
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
                Parceiros que fortalecem a experiência
              </h1>
            </div>
          </section>

          <section className="partners-pillars-grid grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-box bg-transparent">
              <div className="card-body">

                <h2 className="card-title">

                <SuitcaseRolling size={24} className="text-primary" />
    Booking</h2>
                <p className="text-sm text-base-content/75">
                  Apoia a camada de hospedagem com opções práticas para prolongar o passeio.
                </p>
              </div>
            </article>

            <article className="rounded-box bg-transparent">
              <div className="card-body">

                <h2 className="card-title"> 

                <GlobeHemisphereWest size={24} className="text-primary" />
    Viator</h2>
                <p className="text-sm text-base-content/75">
                  Amplia o catálogo de experiências e passeios com maior cobertura de atividades.
                </p>
              </div>
            </article>

            <article className="rounded-box bg-transparent">
              <div className="card-body">

                <h2 className="card-title">
   
                <CloudSun size={24} className="text-primary" />
    Open-meteo</h2>
                <p className="text-sm text-base-content/75">

                  Entrega contexto climático para escolhas mais assertivas no dia a dia.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Handshake size={24} className="text-primary" />
              Parceria com impacto real
            </h2>
            <p className="mt-4 text-base-content/80">
              Cada integração existe para reduzir fricção entre descoberta e ação: ver, decidir
              e seguir para a próxima etapa com confiança, sem sair do fluxo.
            </p>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
