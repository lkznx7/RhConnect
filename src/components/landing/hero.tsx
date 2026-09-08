import Image from "next/image"
import {
  ArrowRight,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Smile,
  TrendingUp,
  Users,
} from "lucide-react"

const STATS = [
  {
    icon: <Users size={20} />,
    tag: "Ativo",
    tagClass: "",
    value: "+1.400",
    valuePrimary: false,
    label: "Colaboradores Ativos",
    note: "Operação integrada Brasil e LATAM",
  },
  {
    icon: <Briefcase size={20} />,
    tag: "Em Seleção",
    tagClass: "lp-stat-icon-secondary",
    value: "48",
    valuePrimary: true,
    label: "Vagas Abertas",
    note: "8 novas vagas adicionadas hoje",
  },
  {
    icon: <Smile size={20} />,
    tag: null,
    tagClass: "",
    rising: "+3.2%",
    value: "94%",
    valuePrimary: false,
    label: "Índice de Satisfação",
    note: "Pesquisa de Clima Organizacional 2024",
  },
  {
    icon: <GraduationCap size={20} />,
    tag: "LMS Ativo",
    tagClass: "",
    value: "120+",
    valuePrimary: false,
    label: "Cursos Corporativos",
    note: "Mais de 14.500 horas completadas",
  },
]

export default function Hero() {
  return (
    <>
      <section className="lp-hero">
        <div className="lp-hero-blob lp-hero-blob-a" />
        <div className="lp-hero-blob lp-hero-blob-b" />

        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-row">
            <div className="lp-hero-copy">
              <span className="lp-hero-pill">
                <i className="lp-hero-pill-dot" />
                Portal Unificado de Pessoas &amp; Carreira
              </span>

              <h1 className="lp-hero-title">
                Conectando talentos, desenvolvendo pessoas e impulsionando resultados.
              </h1>

              <p className="lp-hero-text">
                Cultivamos um ecossistema humanizado orientado à mobilidade interna, governança
                transparente e aprendizado contínuo para construir trajetórias profissionais de
                excelência.
              </p>

              <form className="lp-searchbar" action="/oportunidades" method="get">
                <label className="lp-searchfield lp-searchfield-grow">
                  <Search size={18} />
                  <input name="busca" placeholder="Cargo, habilidade ou área..." type="text" />
                </label>
                <label className="lp-searchfield">
                  <MapPin size={18} />
                  <select name="cidade" defaultValue="">
                    <option value="">Todas as Cidades</option>
                    <option value="Sao Paulo - SP">São Paulo - SP</option>
                    <option value="Alphaville - SP">Alphaville - SP</option>
                    <option value="100% Remoto">100% Remoto</option>
                    <option value="Belo Horizonte - MG">Belo Horizonte - MG</option>
                  </select>
                </label>
                <button className="lp-searchbtn" type="submit">
                  Buscar Vagas
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="lp-hero-badges">
                <span className="lp-hero-badge">
                  <ShieldCheck size={16} />
                  Processos auditados por Compliance
                </span>
                <span className="lp-hero-badge">
                  <Award size={16} />
                  Top Employer Brasil 2024
                </span>
              </div>
            </div>

            <div className="lp-hero-visual">
              <figure className="lp-hero-figure">
                <Image
                  src="/landing/hero.jpg"
                  alt="Equipe colaborando em escritório corporativo moderno"
                  fill
                  sizes="(max-width: 1080px) 100vw, 420px"
                  priority
                />
                <div className="lp-hero-figure-shade" />
                <figcaption className="lp-hero-caption">
                  <div className="lp-hero-caption-top">
                    <span>Cultura &amp; Pessoas</span>
                    <Heart size={15} />
                  </div>
                  <p>Gente que transforma empresas em potências humanas.</p>
                </figcaption>
              </figure>

              <div className="lp-hero-float">
                <span className="lp-hero-float-icon">
                  <TrendingUp size={20} />
                </span>
                <div>
                  <em>Promoções Internas</em>
                  <strong>62% no Ano</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lp-statsband">
        <div className="lp-container">
          <div className="lp-stats-grid">
            {STATS.map((stat) => (
              <div className="lp-stat-card" key={stat.label}>
                <div className="lp-stat-top">
                  <span className={`lp-stat-icon${stat.tagClass}`}>{stat.icon}</span>
                  {stat.rising ? (
                    <span className="lp-stat-rising">
                      <TrendingUp size={14} />
                      {stat.rising}
                    </span>
                  ) : stat.tag ? (
                    <span className="lp-stat-tag">{stat.tag}</span>
                  ) : null}
                </div>
                <div>
                  <p className={`lp-stat-value${stat.valuePrimary ? " lp-stat-value-primary" : ""}`}>
                    {stat.value}
                  </p>
                  <p className="lp-stat-label">{stat.label}</p>
                  <p className="lp-stat-note">{stat.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}