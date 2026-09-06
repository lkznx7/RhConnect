import { Suspense } from "react"
import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Oportunidades from "@/components/landing/oportunidades"
import Cursos from "@/components/landing/cursos"
import Noticias from "@/components/landing/noticias"
import Sobre from "@/components/landing/sobre"
import TalentosCta from "@/components/landing/talentos-cta"
import Newsletter from "@/components/landing/newsletter"
import Footer from "@/components/landing/footer"
import {
  CURSOS_FALLBACK,
  NOTICIAS_FALLBACK,
  VAGAS_FALLBACK,
  type Curso,
  type Noticia,
  type Vaga,
} from "@/lib/public-data"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"

export const revalidate = 60

async function fetchList<T>(path: string, fallback: T[]): Promise<T[]> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } })
    if (!response.ok) return fallback
    const data = (await response.json()) as Record<string, unknown>
    const key = path.split("?")[0].split("/")[1]
    const list = data[key] as T[] | undefined
    return Array.isArray(list) && list.length > 0 ? list : fallback
  } catch {
    return fallback
  }
}

export default async function HomePage() {
  const [vagas, cursos, noticias] = await Promise.all([
    fetchList<Vaga>("/vagas?tamanhoPagina=4", VAGAS_FALLBACK),
    fetchList<Curso>("/cursos?tamanhoPagina=4", CURSOS_FALLBACK),
    fetchList<Noticia>("/noticias?tamanhoPagina=4", NOTICIAS_FALLBACK),
  ])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Oportunidades vagas={vagas} />
        </Suspense>
        <Sobre />
        <Cursos cursos={cursos} />
        <Noticias noticias={noticias} />
        <Newsletter />
        <TalentosCta />
      </main>
      <Footer />
    </>
  )
}