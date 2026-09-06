import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"

export default function TalentosCta() {
  return (
    <section className="lp-section" id="talentos">
      <div className="lp-container">
        <div className="lp-cta">
          <div className="lp-cta-icon"><FileText size={24} /></div>
          <div className="lp-cta-copy">
            <h2>Banco de Talentos</h2>
            <p>
              Não encontrou a vaga ideal agora? Cadastre seu currículo e fique disponível para novas oportunidades,
              trilhas de capacitação e editais futuros.
            </p>
          </div>
          <div className="lp-cta-actions">
            <Link className="lp-btn lp-btn-light" href="/register">
              Cadastrar Currículo <ArrowRight size={15} />
            </Link>
            <Link className="lp-btn lp-btn-ghost" href="/login">
              Acessar Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}