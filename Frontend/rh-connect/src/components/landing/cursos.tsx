import { Blend, Building2, GraduationCap, MonitorSmartphone, TrendingUp, Video } from "lucide-react"
import SectionHeader from "./section-header"
import type { Curso } from "@/lib/public-data"

const MODALIDADE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  "EAD Síncrono": Video,
  "Presencial": Building2,
  "Autoinstrucional": MonitorSmartphone,
  "Híbrido": Blend,
}

export default function Cursos({ cursos }: { cursos: Curso[] }) {
  return (
    <section className="lp-section lp-section-alt" id="cursos">
      <div className="lp-container">
        <SectionHeader
          eyebrow="Universidade Corporativa & Capacitação"
          title="Aprenda, evolua e alcance novos patamares"
          description="Trilhas de desenvolvimento, cursos e formações para que cada pessoa cresça junto com a instituição."
        />

        <div className="lp-card-grid">
          {cursos.map((curso) => {
            const Icon = MODALIDADE_ICONS[curso.modalidade] ?? GraduationCap
            return (
              <article key={curso.id} className="lp-card lp-curso-card">
                <div className="lp-card-top">
                  <span className="lp-card-icon lp-card-icon-teal"><Icon size={18} /></span>
                  <span className="lp-tag lp-tag-teal">{curso.nivelProficiencia}</span>
                </div>
                <h3>{curso.titulo}</h3>
                <p className="lp-card-meta"><GraduationCap size={13} /> {curso.areaConhecimento}</p>
                <div className="lp-chip-row">
                  <span className="lp-tag">{curso.modalidade}</span>
                  {curso.instrutor && <span className="lp-tag lp-tag-instrutor"><TrendingUp size={11} /> {curso.instrutor}</span>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}