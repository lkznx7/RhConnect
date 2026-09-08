import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Laptop, School } from "lucide-react"
import type { Curso } from "@/lib/public-data"

function badgeClass(badge?: string) {
  if (!badge) return ""
  if (badge.toLowerCase().includes("certific")) return " lp-course-badge-cert"
  if (badge.toLowerCase().includes("essencial")) return " lp-course-badge-essencial"
  return ""
}

function formatIcon(formato?: string) {
  if (!formato) return <Laptop size={15} />
  const normalizado = formato.toLowerCase()
  if (normalizado.includes("híbrido") || normalizado.includes("hibrido")) return <School size={15} />
  return <Laptop size={15} />
}

export default function Cursos({ cursos }: { cursos: Curso[] }) {
  const destaqueCursos = cursos.slice(0, 3)

  return (
    <section className="lp-section lp-section-alt">
      <div className="lp-container">
        <div className="lp-sec-head">
          <div className="lp-sec-head-copy">
            <span className="lp-sec-eyebrow lp-sec-eyebrow-secondary">
              <School size={15} />
              Educação Contínua
            </span>
            <h2>Universidade Corporativa &amp; Capacitação</h2>
            <p>Trilhas estruturadas para acelerar competências de liderança, técnica e inteligência emocional.</p>
          </div>

          <Link href="/cursos" className="lp-sec-link">
            Ver catálogo completo de cursos
            <ArrowRight size={15} />
          </Link>
        </div>

        {destaqueCursos.length === 0 ? (
          <div className="lp-empty">
            <p>Nenhum curso em destaque no momento.</p>
          </div>
        ) : (
          <div className="lp-cursos-grid">
            {destaqueCursos.map((curso) => (
              <article className="lp-course-card group" key={curso.id}>
                <div className="lp-course-cover">
                  {curso.capa && (
                    <Image
                      src={curso.capa}
                      alt={curso.titulo}
                      fill
                      sizes="(max-width: 1080px) 100vw, 380px"
                    />
                  )}
                  <span className="lp-course-badges">
                    {curso.badge && (
                      <span className={`lp-course-badge${badgeClass(curso.badge)}`}>{curso.badge}</span>
                    )}
                  </span>
                  {curso.cargaHoraria && (
                    <span className="lp-course-hours">
                      <Clock size={13} />
                      {curso.cargaHoraria} Carga Horária
                    </span>
                  )}
                </div>

                <div className="lp-course-body">
                  <span className="lp-course-eyebrow">
                    <i />
                    {curso.areaConhecimento}
                  </span>
                  <h3 className="lp-course-title">{curso.titulo}</h3>
                  {curso.descricao && <p className="lp-course-desc">{curso.descricao}</p>}

                  <div className="lp-course-foot">
                    {curso.formato && (
                      <span className="lp-course-format">
                        {formatIcon(curso.formato)}
                        {curso.formato}
                      </span>
                    )}
                    <Link href={`/cursos/${curso.id}`} className="lp-course-link">
                      Acessar Trilha
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}