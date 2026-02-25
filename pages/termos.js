import Head from "next/head";
import {
  FileText,
  Gavel,
  Lifebuoy,
  LockKeyOpen,
  ShieldWarning,
  Wrench,
  Scales,
  UserList
} from "@phosphor-icons/react";
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
            <div className="w-full p-6 md:p-8">
              <h1 className="font-bold" style={{ fontSize: "clamp(1.6rem, 4.8vw, 4.4rem)", lineHeight: 0.9 }}>
                Termos de Uso
              </h1>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><FileText size={22} className="text-primary" /> Sobre o serviço</h2>
                <p className="text-sm text-base-content/80">
                  O PertoDaqui organiza sugestoes de lugares e atividades com base em localizacao,
                  distancia e filtros de preferencia. A plataforma pode evoluir funcionalidades,
                  interfaces e integracoes sem aviso previo.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><UserList size={22} className="text-primary" /> Elegibilidade e conduta</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Voce deve usar o servico em conformidade com a legislacao aplicavel.</li>
                  <li>E proibido uso para fraude, abuso, assedio ou atividades ilegais.</li>
                  <li>Nao e permitido tentar contornar seguranca ou limites tecnicos.</li>
                  <li>Nao e permitido extrair, copiar ou redistribuir dados em massa sem autorizacao.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Wrench size={22} className="text-primary" /> Disponibilidade e alteracoes</h2>
                <p className="text-sm text-base-content/80">
                  Buscamos manter o servico disponivel e dados atualizados, mas pode haver
                  interrupcoes, indisponibilidades temporarias, mudancas de interface e variacoes
                  de conteudo sem garantia de continuidade ininterrupta.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><ShieldWarning size={22} className="text-primary" /> Conteudo de terceiros</h2>
                <p className="text-sm text-base-content/80">
                  Parte das informacoes pode vir de fontes externas e parceiros. O PertoDaqui nao
                  controla integralmente dados de terceiros e nao garante exatidao absoluta de
                  horarios, precos, disponibilidade, regras comerciais ou condicoes locais.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Gavel size={22} className="text-primary" /> Propriedade intelectual</h2>
                <p className="text-sm text-base-content/80">
                  Marca, codigo, interface, identidade visual e conteudos originais do PertoDaqui
                  sao protegidos por legislacao de propriedade intelectual. Reproducao, engenharia
                  reversa ou uso comercial sem autorizacao expressa e proibido.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><LockKeyOpen size={22} className="text-primary" /> Limitacao de responsabilidade</h2>
                <p className="text-sm text-base-content/80">
                  O uso da plataforma ocorre por conta e risco do usuario. O PertoDaqui nao se
                  responsabiliza por perdas indiretas, lucros cessantes ou danos decorrentes de
                  decisoes tomadas com base nas informacoes exibidas.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Scales size={22} className="text-primary" /> Suspensao e encerramento</h2>
                <p className="text-sm text-base-content/80">
                  Podemos restringir ou suspender acesso em caso de violacao destes termos, uso
                  abusivo da plataforma, risco tecnico ou obrigacao legal.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Lifebuoy size={22} className="text-primary" /> Atualizacoes e contato</h2>
                <p className="text-sm text-base-content/80">
                  Estes termos podem ser atualizados periodicamente. Em caso de duvidas, contato em{" "}
                  <a href="mailto:contato@pertodaqui.app" className="link link-primary">
                    contato@pertodaqui.app
                  </a>.
                </p>
              </div>
            </article>
          </section>
        </div>
      </StaticPageLayout>
    </>
  );
}
