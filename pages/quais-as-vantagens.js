import Head from "next/head";
import { Cpu, Funnel, MapTrifold, Medal, TrendUp, UsersThree } from "@phosphor-icons/react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function QuaisAsVantagensPage() {
  return (
    <>
      <Head>
        <title>Quais as Vantagens | PertoDaqui</title>
        <meta
          name="description"
          content="Veja as vantagens de estar no PertoDaqui e por que a presença local inteligente gera mais resultado."
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
                Por que estar no PertoDaqui
              </h1>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-box bg-transparent"><div className="card-body"><UsersThree size={24} className="text-primary" /><h2 className="card-title text-lg">Audiência qualificada</h2><p className="text-sm text-base-content/75">Usuário local e pronto para escolher.</p></div></article>
            <article className="rounded-box bg-transparent"><div className="card-body"><MapTrifold size={24} className="text-primary" /><h2 className="card-title text-lg">Descoberta por proximidade</h2><p className="text-sm text-base-content/75">Distância e contexto favorecem visitas reais.</p></div></article>
            <article className="rounded-box bg-transparent"><div className="card-body"><Cpu size={24} className="text-primary" /><h2 className="card-title text-lg">Roteiros com IA</h2><p className="text-sm text-base-content/75">Seu negócio pode entrar em combinações inteligentes.</p></div></article>
            <article className="rounded-box bg-transparent"><div className="card-body"><Funnel size={24} className="text-primary" /><h2 className="card-title text-lg">Menor desperdício</h2><p className="text-sm text-base-content/75">Menos alcance genérico, mais decisão local.</p></div></article>
            <article className="rounded-box bg-transparent"><div className="card-body"><TrendUp size={24} className="text-primary" /><h2 className="card-title text-lg">Crescimento contínuo</h2><p className="text-sm text-base-content/75">Mais lembrança de marca e recorrência.</p></div></article>
            <article className="rounded-box bg-transparent"><div className="card-body"><Medal size={24} className="text-primary" /><h2 className="card-title text-lg">Vantagem competitiva</h2><p className="text-sm text-base-content/75">Quem aparece antes constrói preferência antes.</p></div></article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <p className="text-base-content/80">
              Não aparecer custa caro: menos tráfego, menos lembrança e menos oportunidade de venda.
              Participar cedo é um atalho para consolidar presença local com melhor custo-benefício.
            </p>
            <div className="mt-6 rounded-box border border-primary/20 bg-primary/5 p-4">
              <p className="font-semibold">Quer incluir sua empresa?</p>
              <p className="mt-1 text-sm">
                Fale com o time:{" "}
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
