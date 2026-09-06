"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, MapPin, Search, Star } from "lucide-react"
import { AREAS, CAMPUS } from "@/lib/public-data"

const STATS = [
  { value: "+120", label: "vagas publicadas" },
  { value: "80", label: "cursos disponíveis" },
  { value: "99%", label: "de satisfação no atendimento" },
]

export default function Hero() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [cidade, setCidade] = useState<string>(CAMPUS[0])
  const [area, setArea] = useState<string>(AREAS[0])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (busca.trim()) params.set("busca", busca.trim())
    if (cidade && cidade !== CAMPUS[0]) params.set("cidade", cidade)
    if (area && area !== AREAS[0]) params.set("area", area)
    const query = params.toString()
    router.push(`/?${query}#oportunidades`)
  }

  return (
    <section className="lp-hero" id="top">
      <div className="lp-hero-orb lp-hero-orb-a" />
      <div className="lp-hero-orb lp-hero-orb-b" />
      <div className="lp-hero grid-lines" />
      <div className="lp-container lp-hero-inner">
        <div className="lp-hero-copy">
          <span className="lp-hero-pill">
            <Star size={12} /> Portal institucional do nosso RH
          </span>
          <h1>
            Conectamos talentos às <em>oportunidades</em> e à <em>capacitação</em> do seu futuro
          </h1>
          <p>
            Vagas em destaque, Universidade Corporativa, notícias e comunicados em um único lugar —
            transparência e proximidade entre pessoas e Gestão de Pessoas.
          </p>
        </div>

        <form className="lp-search" onSubmit={handleSubmit} aria-label="Buscar oportunidades">
          <div className="lp-search-row">
            <label className="lp-search-field lp-search-grow">
              <Search size={17} />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por cargo, habilidade ou área..."
                aria-label="Buscar por cargo, habilidade ou área"
              />
            </label>
            <label className="lp-search-field lp-search-select">
              <MapPin size={17} />
              <select value={cidade} onChange={(e) => setCidade(e.target.value)} aria-label="Filtrar por localização">
                {CAMPUS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="lp-search-field lp-search-select">
              <span className="lp-search-dot" />
              <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filtrar por área">
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
            <button className="lp-btn lp-btn-primary lp-search-submit" type="submit">
              Buscar vagas
            </button>
          </div>
          <div className="lp-search-links">
            <Link href="#oportunidades">Ver oportunidades em destaque <ArrowRight size={13} /></Link>
            <Link href="/register">Cadastre seu currículo gratuitamente <ArrowRight size={13} /></Link>
          </div>
        </form>

        <dl className="lp-stats">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dd>{stat.value}</dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}