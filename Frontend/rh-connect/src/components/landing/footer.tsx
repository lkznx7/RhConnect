import Link from "next/link"
import { HeartHandshake, Lock, ShieldCheck } from "lucide-react"
import Logo from "./logo"

const FOOTER_LINKS = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#top" },
      { label: "Sobre o RH", href: "#sobre" },
      { label: "Oportunidades", href: "#oportunidades" },
      { label: "Cursos", href: "#cursos" },
      { label: "Notícias", href: "#noticias" },
    ],
  },
  {
    title: "Portal",
    links: [
      { label: "Acessar Portal", href: "/login" },
      { label: "Criar conta", href: "/register" },
      { label: "Recuperar senha", href: "/forgot-password" },
      { label: "Banco de Talentos", href: "#talentos" },
      { label: "Newsletter", href: "#newsletter" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-container lp-footer-inner">
        <div className="lp-footer-brand">
          <Logo inverse />
          <p>
            Plataforma de Gestão de Pessoas que conecta oportunidades, capacitação e comunicação entre RH,
            candidatos e colaboradores.
          </p>
          <ul className="lp-footer-pills">
            <li><ShieldCheck size={13} /> Conformidade LGPD</li>
            <li><Lock size={13} /> Criptografia SSL 256-bit</li>
          </ul>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div className="lp-footer-col" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lp-footer-col">
          <h4>Contato & Ouvidoria</h4>
          <ul className="lp-footer-contact">
            <li>rh@rhconnect.gov.br</li>
            <li>0800 000 0000</li>
            <li>Segunda a sexta, 8h às 17h</li>
            <li>
              <Link href="#sobre">Fale com o RH <HeartHandshake size={12} /></Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="lp-footer-bottom">
        <div className="lp-container">
          <p>© {new Date().getFullYear()} RH Connect · Gestão de Pessoas. Todos os direitos reservados.</p>
          <span>Termos de Uso · Política de Privacidade</span>
        </div>
      </div>
    </footer>
  )
}