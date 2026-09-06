import { CalendarDays, Newspaper } from "lucide-react"
import SectionHeader from "./section-header"
import type { Noticia } from "@/lib/public-data"

function formatDate(value?: string): string {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(date)
}

function coverTone(index: number): string {
  const tones = ["lp-cover-a", "lp-cover-b", "lp-cover-c"]
  return tones[index % tones.length]
}

export default function Noticias({ noticias }: { noticias: Noticia[] }) {
  return (
    <section className="lp-section" id="noticias">
      <div className="lp-container">
        <SectionHeader
          eyebrow="Notícias & Comunicados"
          title="Fique por dentro do que acontece no RH"
          description="Comunicados, portarias, decretos e avisos em um mural único e de fácil acesso."
        />

        <div className="lp-news-grid">
          {noticias.map((noticia, index) => (
            <article key={noticia.id} className="lp-card lp-news-card">
              <div className={`lp-news-cover ${coverTone(index)}`}>
                <span className="lp-news-type">{noticia.tipo}</span>
              </div>
              <div className="lp-news-body">
                <span className="lp-news-date"><CalendarDays size={12} /> {formatDate(noticia.criadoEm)}</span>
                <h3>{noticia.titulo}</h3>
                <span className="lp-news-more"><Newspaper size={13} /> Ler comunicado completo</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}