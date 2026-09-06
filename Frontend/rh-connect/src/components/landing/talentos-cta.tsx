import Link from "next/link"
import { Bell, Lock, Send, Users } from "lucide-react"

export default function TalentosCta() {
  return (
    <section className="lp-section lp-section-cta">
      <div className="lp-container">
        <div className="lp-cta">
          <div className="lp-cta-blob lp-cta-blob-a" />
          <div className="lp-cta-blob lp-cta-blob-b" />

          <div className="lp-cta-copy">
            <span className="lp-cta-pill">
              <Users size={15} />
              Banco de Talentos Estratégico
            </span>
            <h2>Não encontrou a posição desejada no momento?</h2>
            <p>
              Cadastre seu perfil profissional em nosso radar de talentos. Nossos Business Partners
              analisam diariamente novas compatibilidades para futuras oportunidades internas e
              projetos prioritários.
            </p>
            <div className="lp-cta-trust">
              <span>
                <Lock size={15} />
                Privacidade LGPD Garantida
              </span>
              <span>
                <Bell size={15} />
                Alertas automáticos de novas vagas
              </span>
            </div>
          </div>

          <div className="lp-cta-actions">
            <Link href="/banco-de-talentos/cadastrar-curriculo" className="lp-cta-btn lp-cta-btn-solid">
              Cadastrar Meu Currículo
              <Send size={17} />
            </Link>
            <Link href="/sobre-o-rh" className="lp-cta-btn lp-cta-btn-ghost">
              Saber Como Funciona
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}