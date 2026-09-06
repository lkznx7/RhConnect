import {
  BadgeCheck,
  ClipboardCheck,
  Network,
  SmilePlus,
  Star,
  TrendingUp,
} from "lucide-react"

function Feature({ icon: Icon, title, children }: { icon: typeof ClipboardCheck; title: string; children: string }) {
  return (
    <div className="feature-row">
      <div className="feature-icon"><Icon size={18} /></div>
      <div><h2>{title}</h2><p>{children}</p></div>
    </div>
  )
}

export default function BrandPanel() {
  return (
    <aside className="brand-panel">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
      <div className="brand-content">
        <header className="brand-header">
          <div className="brand-mark"><Network size={23} strokeWidth={2.2} /></div>
          <div><strong>RH Connect</strong><span>PESSOAS &amp; RESULTADOS</span></div>
        </header>
        <p className="brand-tagline">Conecta pessoas, transforma resultados.</p>
      </div>

      <div className="brand-content brand-middle">
        <div className="version-pill"><BadgeCheck size={13} /> Plataforma Unificada v4.8</div>
        <h1>O ecossistema integrado para sua jornada profissional.</h1>
        <div className="feature-list">
          <Feature icon={ClipboardCheck} title="Candidaturas Simplificadas">Acompanhamento transparente e em tempo real de processos seletivos.</Feature>
          <Feature icon={TrendingUp} title="Trilhas de Desenvolvimento Contínuo">Capacitações, competências mapeadas e plano de crescimento corporativo.</Feature>
          <Feature icon={SmilePlus} title="Gestão Humanizada &amp; Transparente">Feedback bidirecional, holerites dinâmicos e governança de ponta a ponta.</Feature>
        </div>
      </div>

      <div className="testimonial">
        <div className="testimonial-top"><div className="stars"><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} /></div><strong>94%</strong></div>
        <p>“A centralização de feedbacks e benefícios simplificou o cotidiano dos nossos 4.200 colaboradores.”</p>
        <div className="testimonial-person"><img className="avatar" alt="Marina Duarte" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbzEvbtuFvIRJBLhsZib3RTKtgImKr3ni19sCFvfJsEjhmY7zaNsPKwrczBN0RX7kbJtM4MOq7O4yapKPNEY09eOIy3PDS2UMuIcFNLurd6k8RofJkhewD4pBT5G8v_1mkIzAWpaLUmTz46iMCr7CMAZmCFmiCeQDo5iKWQj4l-grz2mJYrSA8vsEUOXrRnc4ETkk5BEzRjyg5bhImkH406kFu-IU_BMLAt0viskAkVGcir-YVOE4W" /><span>Marina Duarte • VP de Gente &amp; Gestão</span></div>
      </div>
    </aside>
  )
}