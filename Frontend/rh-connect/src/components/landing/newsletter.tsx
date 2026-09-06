"use client"

import { FormEvent, useState } from "react"
import { Check, Loader2, Mail } from "lucide-react"
import { isValidEmail } from "@/lib/validators"

const NEWSLETTER_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"}/noticias/newsletter`

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setStatus("error")
      return
    }
    setStatus("loading")
    try {
      const response = await fetch(NEWSLETTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error("Falha ao inscrever")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="lp-section lp-newsletter" id="newsletter">
      <div className="lp-container">
        <div className="lp-newsletter-box">
          <div className="lp-newsletter-copy">
            <h2>Receba as novidades no seu e-mail</h2>
            <p>Assine a newsletter e acompanhe editais, comunicados e abertura de turmas em primeira mão.</p>
          </div>

          {status === "success" ? (
            <p className="lp-newsletter-success"><Check size={16} /> Inscrição na newsletter realizada com sucesso.</p>
          ) : (
            <form className="lp-newsletter-form" onSubmit={handleSubmit} noValidate>
              <label className="lp-newsletter-input">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="Seu e-mail corporativo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Seu e-mail corporativo"
                />
              </label>
              <button className="lp-btn lp-btn-primary" type="submit" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 size={15} className="spin" /> : "Assinar newsletter"}
              </button>
            </form>
          )}
          {status === "error" && <p className="lp-form-error">Verifique seu e-mail e tente novamente.</p>}
        </div>
      </div>
    </section>
  )
}