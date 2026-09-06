"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "./logo"

const NAV_LINKS = [
  { label: "Início", href: "#top" },
  { label: "Sobre o RH", href: "#sobre" },
  { label: "Oportunidades", href: "#oportunidades" },
  { label: "Cursos", href: "#cursos" },
  { label: "Notícias", href: "#noticias" },
  { label: "Banco de Talentos", href: "#talentos" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="lp-navbar">
      <div className="lp-container lp-navbar-inner">
        <Logo />

        <nav className={open ? "lp-nav lp-nav-open" : "lp-nav"} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="lp-nav-actions">
            <Link className="lp-btn lp-btn-outline" href="/login" onClick={() => setOpen(false)}>
              Acessar Portal
            </Link>
            <Link className="lp-btn lp-btn-primary" href="/register" onClick={() => setOpen(false)}>
              Cadastrar Currículo
            </Link>
          </div>
        </nav>

        <button className="lp-nav-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}