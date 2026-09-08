import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Newspaper } from "lucide-react"
import type { Noticia } from "@/lib/public-data"

export default function Noticias({ noticias }: { noticias: Noticia[] }) {
  const destaques = noticias.slice(0, 3)

  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-sec-head">
          <div className="lp-sec-head-copy">
            <span className="lp-sec-eyebrow">
              <Newspaper size={15} />
              Transparência &amp; Notícias
            </span>
            <h2>Notícias &amp; Comunicados de RH</h2>
            <p>
              Acompanhe nossas diretrizes de bem-estar, programas corporativos e atualizações
              institucionais.
            </p>
          </div>

          <Link href="/noticias" className="lp-sec-link">
            Acessar portal de notícias
            <ArrowRight size={15} />
          </Link>
        </div>

        {destaques.length === 0 ? (
          <div className="lp-empty">
            <p>Nenhuma notícia publicada no momento.</p>
          </div>
        ) : (
          <div className="lp-news-grid">
            {destaques.map((noticia) => (
              <article className="lp-news-card" key={noticia.id}>
                <div className="lp-news-cover">
                  {noticia.capa && (
                    <Image
                      src={noticia.capa}
                      alt={noticia.titulo}
                      fill
                      sizes="(max-width: 1080px) 100vw, 380px"
                    />
                  )}
                </div>

                <div className="lp-news-body">
                  <span className="lp-news-meta">
                    <i>{noticia.data ?? noticia.criadoEm}</i>
                    ·<em>{noticia.categoria ?? noticia.tipo}</em>
                  </span>
                  <h3 className="lp-news-title">
                    <Link href={`/noticias/${noticia.id}`}>{noticia.titulo}</Link>
                  </h3>
                  {noticia.descricao && <p className="lp-news-desc">{noticia.descricao}</p>}

                  <Link href={`/noticias/${noticia.id}`} className="lp-news-more">
                    Ler Comunicado
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}