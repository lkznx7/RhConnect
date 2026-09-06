import Link from "next/link"
import { ArrowRight, Clock, MapPin, Rocket } from "lucide-react"
import type { Vaga } from "@/lib/public-data"

const AREAS_FILTRO = [
  { label: "Todas as Áreas", value: "" },
  { label: "Tecnologia", value: "Tecnologia" },
  { label: "Operações", value: "Operações" },
]

function localizacao(vaga: Vaga) {
  const modalidade = vaga.modalidadeTrabalho ?? "Presencial"
  const incluiCampus = vaga.campus && !vaga.campus.toLowerCase().includes(modalidade.toLowerCase())
  return incluiCampus ? `${modalidade} (${vaga.campus})` : modalidade
}

export default function Oportunidades({ vagas }: { vagas: Vaga[] }) {
  const destaques = vagas.slice(0, 3)

  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-sec-head">
          <div className="lp-sec-head-copy">
            <span className="lp-sec-eyebrow">
              <Rocket size={15} />
              Processos Seletivos
            </span>
            <h2>Oportunidades em Destaque</h2>
            <p>Descubra projetos estratégicos que valorizam a autonomia, diversidade e impacto real.</p>
          </div>

          <div className="lp-sec-chips">
            {AREAS_FILTRO.map((area) => (
              <Link
                key={area.label}
                href={area.value ? `/oportunidades?area=${encodeURIComponent(area.value)}` : "/oportunidades"}
                className={`lp-chip${area.value === "" ? " lp-chip-active" : ""}`}
              >
                {area.label}
              </Link>
            ))}
          </div>
        </div>

        {destaques.length === 0 ? (
          <div className="lp-empty">
            <p>Nenhuma vaga em destaque no momento.</p>
          </div>
        ) : (
          <div className="lp-vagas-grid">
            {destaques.map((vaga) => (
              <article className="lp-vaga-card group" key={vaga.id}>
                <div>
                  <div className="lp-vaga-top">
                    <span className="lp-vaga-badge">{vaga.categoria ?? vaga.area}</span>
                    {vaga.publicadoHa && (
                      <span className="lp-vaga-time">
                        <Clock size={13} />
                        {vaga.publicadoHa}
                      </span>
                    )}
                  </div>

                  <h3 className="lp-vaga-title">{vaga.titulo}</h3>
                  {vaga.descricao && <p className="lp-vaga-desc">{vaga.descricao}</p>}

                  <div className="lp-vaga-tags">
                    <span className="lp-meta-tag">
                      <MapPin size={13} />
                      {localizacao(vaga)}
                    </span>
                    {vaga.senioridade && <span className="lp-meta-tag">{vaga.senioridade}</span>}
                    {vaga.tipoContrato && (
                      <span className="lp-meta-tag lp-meta-tag-strong">{vaga.tipoContrato}</span>
                    )}
                  </div>
                </div>

                <div className="lp-vaga-foot">
                  <div className="lp-vaga-salary">
                    <span>Remuneração &amp; Benefícios</span>
                    <strong>{vaga.faixaSalarial ?? "A combinar"}</strong>
                  </div>
                  <Link href={`/vagas/${vaga.id}`} className="lp-vaga-link">
                    Ver Detalhes
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="lp-view-all">
          <Link href="/oportunidades" className="lp-view-all-btn">
            Explorar todas as {vagas.length} vagas abertas
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}