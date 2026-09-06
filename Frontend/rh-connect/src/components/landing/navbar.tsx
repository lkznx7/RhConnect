"use client"

import { useState } from "react"
import Link from "next/link"
import { LogIn, Menu, UserPlus, X } from "lucide-react"
import Logo from "./logo"

const NAV_LINKS = [
  { href: "/sobre-o-rh", label: "Sobre o RH" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/cursos", label: "Cursos" },
  { href: "/noticias", label: "Notícias" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="lp-navbar">
      <div className="lp-container lp-navbar-inner">
        <Logo />

        <nav className={`lp-nav${open ? " lp-nav-open" : ""}`} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <div className="lp-nav-actions">
            <Link href="/login" className="lp-btn lp-btn-outline" onClick={() => setOpen(false)}>
              <LogIn size={15} />
              Entrar
            </Link>
            <Link href="/register" className="lp-btn lp-btn-primary" onClick={() => setOpen(false)}>
              <UserPlus size={15} />
              Criar Conta
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className="lp-nav-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}