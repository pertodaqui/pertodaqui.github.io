import Head from "next/head";
import { FileText, Gavel, Lifebuoy, LockKeyOpen, ShieldWarning, Wrench } from "@phosphor-icons/react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function TermosPage() {
  return (
    <>
      <Head>
        <title>Termos de Uso | PertoDaqui</title>
        <meta
          name="description"
          content="Termos de Uso do PertoDaqui. Condições para utilização da plataforma."
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
                <div className="badge badge-primary badge-outline">Termos</div>
                <h1 className="mt-3 text-3xl font-bold md:text-4xl">Termos de Uso</h1>
                <p className="mt-2 text-sm opacity-70">Última atualização: 2026</p>
                <p className="mt-4 text-base-content/75">
                  Ao acessar o PertoDaqui, você concorda com as condições abaixo.
                </p>
              </div>
              <figure className="overflow-hidden rounded-box border border-base-300">
                <img src="/illustrations/legal.svg" alt="Ilustração de termos e condições" className="h-full w-full object-cover" />
              </figure>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><FileText size={22} className="text-primary" /> 1. Sobre o serviço</h2>
                <p className="text-sm text-base-content/80">
                  O PertoDaqui ajuda usuários a descobrir atividades e estabelecimentos próximos
                  com base em localização, distância e filtros.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><ShieldWarning size={22} className="text-primary" /> 2. Uso aceitável</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Não usar a plataforma para atividades ilegais.</li>
                  <li>Não tentar burlar segurança e limitações técnicas.</li>
                  <li>Não extrair conteúdo em massa sem autorização.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Wrench size={22} className="text-primary" /> 3. Conteúdo e disponibilidade</h2>
                <p className="text-sm text-base-content/80">
                  Buscamos manter dados atualizados, mas não garantimos precisão absoluta ou
                  disponibilidade contínua.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><LockKeyOpen size={22} className="text-primary" /> 4. Limitação de responsabilidade</h2>
                <p className="text-sm text-base-content/80">
                  O uso do serviço é por conta e risco do usuário. Decisões baseadas nas informações
                  exibidas são de responsabilidade do próprio usuário.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Gavel size={22} className="text-primary" /> 5. Propriedade intelectual</h2>
                <p className="text-sm text-base-content/80">
                  Marca, interface e elementos originais do PertoDaqui são protegidos. Reprodução
                  não autorizada é proibida.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Lifebuoy size={22} className="text-primary" /> 6. Alterações e contato</h2>
                <p className="text-sm text-base-content/80">
                  Podemos atualizar estes termos periodicamente. Dúvidas:{" "}
                  <a href="mailto:contato@pertodaqui.app" className="link link-primary">
                    contato@pertodaqui.app
                  </a>
                  .
                </p>
              </div>
            </article>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
