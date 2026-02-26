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
                  O PertoDaqui organiza sugestões de lugares e atividades com base em localização,
                  distância e filtros de preferência. A plataforma pode evoluir funcionalidades,
                  interfaces e integrações sem aviso prévio.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><UserList size={22} className="text-primary" /> Elegibilidade e conduta</h2>
                <ul className="list-disc space-y-1 pl-6 text-sm text-base-content/80">
                  <li>Você deve usar o serviço em conformidade com a legislação aplicável.</li>
                  <li>É proibido uso para fraude, abuso, assédio ou atividades ilegais.</li>
                  <li>Não é permitido tentar contornar segurança ou limites técnicos.</li>
                  <li>Não é permitido extrair, copiar ou redistribuir dados em massa sem autorização.</li>
                </ul>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Wrench size={22} className="text-primary" /> Disponibilidade e alterações</h2>
                <p className="text-sm text-base-content/80">
                  Buscamos manter o serviço disponível e dados atualizados, mas pode haver
                  interrupções, indisponibilidades temporárias, mudanças de interface e variações
                  de conteúdo sem garantia de continuidade ininterrupta.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><ShieldWarning size={22} className="text-primary" /> Conteúdo de terceiros</h2>
                <p className="text-sm text-base-content/80">
                  Parte das informações pode vir de fontes externas e parceiros. O PertoDaqui não
                  controla integralmente dados de terceiros e não garante exatidão absoluta de
                  horários, preços, disponibilidade, regras comerciais ou condições locais.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Gavel size={22} className="text-primary" /> Propriedade intelectual</h2>
                <p className="text-sm text-base-content/80">
                  Marca, código, interface, identidade visual e conteúdos originais do PertoDaqui
                  são protegidos por legislação de propriedade intelectual. Reprodução, engenharia
                  reversa ou uso comercial sem autorização expressa é proibido.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><LockKeyOpen size={22} className="text-primary" /> Limitação de responsabilidade</h2>
                <p className="text-sm text-base-content/80">
                  O uso da plataforma ocorre por conta e risco do usuário. O PertoDaqui não se
                  responsabiliza por perdas indiretas, lucros cessantes ou danos decorrentes de
                  decisões tomadas com base nas informações exibidas.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Scales size={22} className="text-primary" /> Suspensão e encerramento</h2>
                <p className="text-sm text-base-content/80">
                  Podemos restringir ou suspender acesso em caso de violação destes termos, uso
                  abusivo da plataforma, risco técnico ou obrigação legal.
                </p>
              </div>
            </article>
            <article className="rounded-box bg-transparent">
              <div className="card-body">
                <h2 className="card-title text-lg"><Lifebuoy size={22} className="text-primary" /> Atualizações e contato</h2>
                <p className="text-sm text-base-content/80">
                  Estes termos podem ser atualizados periodicamente. Em caso de dúvidas, contato em{" "}
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
