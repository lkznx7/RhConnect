"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  MailCheck,
  ShieldCheck,
} from "lucide-react"
import { forgotPassword } from "@/services/auth"
import BrandPanel from "../auth/brand-panel"
import { isValidEmail, isValidCpf, maskCpf } from "@/lib/validators"

const RESEND_SECONDS = 60

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  function validate(): string | null {
    const value = identifier.trim()
    if (!value) return "Informe seu e-mail ou CPF cadastrado."
    if (/[a-zA-Z@]/.test(value)) {
      return isValidEmail(value) ? null : "Informe um e-mail válido."
    }
    return isValidCpf(value) ? null : "Informe um CPF cadastrado válido."
  }

  async function requestRecovery() {
    const validation = validate()
    if (validation) {
      setError(validation)
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await forgotPassword(identifier.trim())
      setSent(true)
      setCountdown(RESEND_SECONDS)
    } catch (err: unknown) {
      const response = (err as { response?: { data?: { mensagem?: string; message?: string } } })?.response?.data
      setError(response?.mensagem ?? response?.message ?? "Não foi possível enviar o e-mail de recuperação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await requestRecovery()
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <BrandPanel />

        <div className="auth-panel">
          <div className="auth-content">
            <div className="auth-header">
              <div>
                <h2 className="auth-title">Recuperar senha</h2>
                <p>Informe seu e-mail corporativo ou CPF cadastrado. Enviaremos um link para você redefinir sua senha.</p>
              </div>
              <span className="secure-pill"><span /> Acesso<br />Seguro</span>
            </div>

            {sent ? (
              <div className="success-box">
                <div className="success-icon"><MailCheck size={26} /></div>
                <h3>E-mail de recuperação enviado!</h3>
                <p>Se o identificador <strong>{identifier.trim()}</strong> estiver cadastrado, você receberá um link de redefinição em instantes. Verifique sua caixa de entrada e a pasta de spam.</p>
                <button className="submit-button" type="button" disabled={countdown > 0 || isSubmitting} onClick={requestRecovery}>
                  {isSubmitting ? <Loader2 size={18} className="spin" /> : null}
                  {countdown > 0 ? `Reenviar em ${countdown}s` : "Reenviar e-mail"}
                </button>
              </div>
            ) : (
              <form className="auth-form login-form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="recovery-identifier">E-mail corporativo ou CPF</label>
                <div className="input-wrap">
                  <Mail size={17} />
                  <input
                    id="recovery-identifier"
                    placeholder="nome@empresa.com.br ou 000.000.000-00"
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/[a-zA-Z@]/.test(value)) {
                        setIdentifier(value)
                      } else {
                        setIdentifier(maskCpf(value))
                      }
                    }}
                  />
                </div>
                <p className="helper-text">Digite o e-mail ou CPF vinculado à sua conta. O link de redefinição é válido por um período limitado.</p>

                {error && <p className="form-error" role="alert">{error}</p>}

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="spin" /> : <ArrowRight size={18} />}
                  {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
                </button>

                <Link className="back-link" href="/login"><ArrowLeft size={15} /> Voltar para o login</Link>
              </form>
            )}
          </div>

          <footer className="auth-footer">
            <p>Ainda não tem conta? <Link href="/register">Crie sua conta gratuitamente</Link></p>
            <div><span><ShieldCheck size={14} /> Ambiente Seguro com Criptografia SSL 256-bit</span><span>Conformidade LGPD&nbsp;&nbsp; • &nbsp;&nbsp;Termos de Uso</span></div>
          </footer>
        </div>
      </section>
    </main>
  )
}