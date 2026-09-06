import { HeartHandshake, Lightbulb, Scale } from "lucide-react"
import SectionHeader from "./section-header"

const PILARES = [
  {
    icon: HeartHandshake,
    title: "Gente no Centro",
    description: "Decisões e processos desenhados com foco genuíno nas pessoas que constroem a instituição.",
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Práticas modernas de gestão, tecnologia e novos caminhos para desenvolvimento e acolhimento.",
  },
  {
    icon: Scale,
    title: "Transparência",
    description: "Editais, comunicados e critérios claros — um RH aberto, ético e em conformidade com a LGPD.",
  },
]

export default function Sobre() {
  return (
    <section className="lp-section lp-section-sobre" id="sobre">
      <div className="lp-container">
        <SectionHeader
          eyebrow="Sobre o RH"
          title="Um RH que valoriza pessoas em cada etapa"
          description="Trabalhamos com pilares estratégicos que orientam a Gestão de Pessoas e a convivência institucional."
        />

        <div className="lp-pilares">
          {PILARES.map((pilar) => (
            <article key={pilar.title} className="lp-pilar">
              <span className="lp-pilar-icon"><pilar.icon size={20} /></span>
              <h3>{pilar.title}</h3>
              <p>{pilar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}