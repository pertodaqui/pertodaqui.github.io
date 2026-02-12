import Head from "next/head";
import { Cookie, Database, LockKey, ShieldCheck, UserCircleGear } from "@phosphor-icons/react";
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
            <div className="grid w-full grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
              <div>
                <div className="badge badge-primary badge-outline">Privacidade</div>
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">Política de Privacidade</h1>
                <p className="mt-2 text-sm opacity-70">Última atualização: 2026</p>
                <p className="mt-4 text-base-content/75">
                  Este documento explica como tratamos dados relacionados ao uso da plataforma.
                </p>
              </div>
              <figure className="overflow-hidden rounded-box border border-base-300">
                <img src="/illustrations/legal.svg" alt="Ilustração de privacidade e proteção de dados" className="h-full w-full object-cover" />
              </figure>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Database size={22} className="text-primary" /> Dados que coletamos</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Localização aproximada, mediante permissão do navegador.</li>
                  <li>Preferências de filtros, distância e categorias selecionadas.</li>
                  <li>Dados técnicos para estabilidade do serviço.</li>
                  <li>Dados climáticos consultados por coordenada.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Cookie size={22} className="text-primary" /> Como usamos os dados</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Exibir recomendações próximas de você.</li>
                  <li>Ordenar resultados por distância e preferências.</li>
                  <li>Mostrar contexto climático para decisão.</li>
                  <li>Melhorar desempenho, segurança e experiência.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><LockKey size={22} className="text-primary" /> Compartilhamento e retenção</h2>
                <p className="text-sm text-base-content/80">
                  Não vendemos dados pessoais. Integrações com parceiros técnicos ocorrem apenas
                  para viabilizar funcionalidades. Parte das preferências pode ficar no navegador.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><UserCircleGear size={22} className="text-primary" /> Seus direitos</h2>
                <p className="text-sm text-base-content/80">
                  Você pode solicitar informações sobre tratamento, correção e exclusão quando
                  aplicável, além de revogar permissões de localização no seu dispositivo.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-box bg-transparent p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <ShieldCheck size={24} className="text-primary" />
              Contato
            </h2>
            <p className="mt-3 text-base-content/80">
              Para dúvidas sobre privacidade:{" "}
              <a href="mailto:contato@pertodaqui.app" className="link link-primary">
                contato@pertodaqui.app
              </a>
              .
            </p>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
