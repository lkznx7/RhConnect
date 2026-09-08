import { Suspense } from "react"
import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Oportunidades from "@/components/landing/oportunidades"
import Cursos from "@/components/landing/cursos"
import Noticias from "@/components/landing/noticias"
import TalentosCta from "@/components/landing/talentos-cta"
import Footer from "@/components/landing/footer"
import { CURSOS_FALLBACK, NOTICIAS_FALLBACK, VAGAS_FALLBACK } from "@/lib/public-data"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="lp-page">
        <Hero />
        <Suspense fallback={null}>
          <Oportunidades vagas={VAGAS_FALLBACK} />
        </Suspense>
        <Cursos cursos={CURSOS_FALLBACK} />
        <Noticias noticias={NOTICIAS_FALLBACK} />
        <TalentosCta />
      </main>
      <Footer />
    </>
  )
}