import Link from "next/link"
import { BarChart3, Lock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"
import Logo from "./logo"

const INSTITUCIONAL = [
  { href: "/sobre-o-rh", label: "Sobre o RH" },
  { href: "/sobre-o-rh#politica", label: "Política de Pessoas" },
  { href: "/banco-de-talentos/cadastrar-curriculo", label: "Banco de Talentos" },
  { href: "/noticias", label: "Notícias & Comunicados" },
]

const ACESSO = [
  { href: "/login", label: "Entrar" },
  { href: "/register", label: "Criar Conta" },
  { href: "/forgot-password", label: "Esqueci minha senha" },
  { href: "/oportunidades", label: "Oportunidades" },
]

export default function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-brand">
          <Logo />
          <p>
            Ambiente integrado para atração de talentos, desenvolvimento profissional contínuo e
            transparência institucional em gestão de pessoas.
          </p>
          <ul className="lp-footer-pills">
            <li>
              <ShieldCheck size={14} />
              Governança Corporativa
            </li>
            <li>
              <BarChart3 size={14} />
              People Analytics
            </li>
            <li>
              <Lock size={14} />
              LGPD
            </li>
          </ul>
        </div>

        <div className="lp-footer-col">
          <h4>Institucional</h4>
          <ul>
            {INSTITUCIONAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-footer-col">
          <h4>Acesso</h4>
          <ul>
            {ACESSO.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-footer-col lp-footer-contact">
          <h4>Fale Conosco</h4>
          <ul>
            <li>
              <Mail size={15} />
              rh@connect.corp
            </li>
            <li>
              <Phone size={15} />
              (11) 4004-0000
            </li>
            <li>
              <MapPin size={15} />
              São Paulo — SP · Brasil
            </li>
          </ul>
        </div>
      </div>

      <div className="lp-footer-bottom">
        <div className="lp-container">
          <p>© 2026 RH Connect — Portal institucional de Gestão de Pessoas.</p>
          <span>Política de Privacidade · Termos de Uso · LGPD</span>
        </div>
      </div>
    </footer>
  )
}