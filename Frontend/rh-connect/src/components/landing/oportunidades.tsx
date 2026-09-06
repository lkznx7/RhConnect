"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Briefcase, FileText, MapPin } from "lucide-react"
import SectionHeader from "./section-header"
import type { Vaga } from "@/lib/public-data"

export default function Oportunidades({ vagas }: { vagas: Vaga[] }) {
  const searchParams = useSearchParams()
  const busca = searchParams.get("busca")?.toLowerCase().trim() ?? ""
  const cidade = searchParams.get("cidade") ?? ""
  const area = searchParams.get("area") ?? ""

  const filtered = useMemo(() => {
    return vagas.filter((vaga) => {
      const haystack = `${vaga.titulo} ${vaga.area} ${vaga.campus} ${vaga.tipoContrato} ${vaga.modalidadeTrabalho}`.toLowerCase()
      if (busca && !haystack.includes(busca)) return false
      if (cidade && vaga.campus.toLowerCase() !== cidade.toLowerCase()) return false
      if (area && vaga.area.toLowerCase() !== area.toLowerCase()) return false
      return true
    })
  }, [vagas, busca, cidade, area])

  const hasFilter = busca || cidade || area

  return (
    <section className="lp-section" id="oportunidades">
      <div className="lp-container">
        <SectionHeader
          eyebrow="Oportunidades em Destaque"
          title="Encontre a vaga que combina com você"
          description={hasFilter ? `Exibindo ${filtered.length} resultado(s) para a busca atual.` : "Acompanhe as oportunidades abertas nas nossas unidades e concorra a editais com transparência."}
        />
        {hasFilter && (
          <Link className="lp-clear-filters" href="/#oportunidades">
            <ArrowRight size={13} /> Limpar filtros e ver todas
          </Link>
        )}
        {filtered.length > 0 ? (
          <div className="lp-card-grid">
            {filtered.map((vaga) => (
              <article key={vaga.id} className="lp-card lp-vaga-card">
                <div className="lp-card-top">
                  <span className="lp-card-icon"><Briefcase size={18} /></span>
                  {vaga.numeroEdital && <span className="lp-tag lp-tag-outline">{vaga.numeroEdital}</span>}
                </div>
                <h3>{vaga.titulo}</h3>
                <p className="lp-card-loc"><MapPin size={13} /> Campus {vaga.campus}</p>
                <div className="lp-chip-row">
                  <span className="lp-tag">{vaga.area}</span>
                  <span className="lp-tag">{vaga.tipoContrato}</span>
                  <span className="lp-tag">{vaga.modalidadeTrabalho}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="lp-empty">
            <FileText size={22} />
            <p>Nenhuma oportunidade encontrada para os filtros informados.</p>
            <Link className="lp-btn lp-btn-outline" href="/#oportunidades">Limpar busca</Link>
          </div>
        )}
      </div>
    </section>
  )
}