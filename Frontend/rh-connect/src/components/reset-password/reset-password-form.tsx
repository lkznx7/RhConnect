"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Check,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react"
import { resetPassword } from "@/services/auth"
import BrandPanel from "../auth/brand-panel"
import {
  checkPasswordRequirements,
  getPasswordStrength,
  isValidPassword,
} from "@/lib/validators"

const REQUISITOS = [
  { key: "length" as const, label: "Mínimo de 8 caracteres" },
  { key: "uppercase" as const, label: "Uma letra maiúscula" },
  { key: "lowercase" as const, label: "Uma letra minúscula" },
  { key: "number" as const, label: "Um número" },
  { key: "special" as const, label: "Um caractere especial" },
]

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? searchParams.get("reset_token") ?? ""

  const [senha, setSenha] = useState("")
  const [confirmacao, setConfirmacao] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const requirements = checkPasswordRequirements(senha)
  const strength = getPasswordStrength(senha)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidPassword(senha)) {
      setError("Sua nova senha não atende aos requisitos mínimos.")
      return
    }
    if (senha !== confirmacao) {
      setError("As senhas não conferem.")
      return
    }
    if (!token) {
      setError("Link de recuperação inválido ou expirado. Solicite um novo link.")
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await resetPassword(token, senha, confirmacao)
      setSuccess(true)
      setError(null)
    } catch (err: unknown) {
      const response = (err as { response?: { data?: { mensagem?: string; message?: string } } })?.response?.data
      setError(response?.mensagem ?? response?.message ?? "Não foi possível redefinir sua senha. O link pode ter expirado.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <BrandPanel />

        <div className="auth-panel">
          <div className="auth-content">
            <div className="auth-header">
              <div>
                <h2 className="auth-title">Definir nova senha</h2>
                <p>Crie uma nova senha para sua conta. Escolha uma senha forte que você não utilize em outros serviços.</p>
              </div>
              <span className="secure-pill"><span /> Acesso<br />Seguro</span>
            </div>

            {success ? (
              <div className="success-box">
                <div className="success-icon"><Check size={26} /></div>
                <h3>Senha redefinida com sucesso!</h3>
                <p>Sua senha foi atualizada. Agora você pode entrar na sua conta com a nova senha.</p>
                <Link className="submit-button" href="/login">Ir para o Login</Link>
              </div>
            ) : (
              <form className="auth-form login-form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="reset-password">Nova senha</label>
                <div className="input-wrap">
                  <LockKeyhole size={17} />
                  <input id="reset-password" placeholder="Digite sua nova senha" type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>

                {senha && (
                  <>
                    <div className="strength-wrap">
                      <div className="strength-bar">
                        {[1, 2, 3].map((level) => (
                          <span key={level} className={`strength-seg ${level <= strength.score ? `seg-${strength.label}` : ""}`} />
                        ))}
                      </div>
                      <span className="strength-label">{strength.label === "fraca" ? "Força: fraca" : strength.label === "media" ? "Força: média" : "Força: forte"}</span>
                    </div>
                    <ul className="req-list">
                      {REQUISITOS.map(({ key, label }) => (
                        <li key={key} className={requirements[key] ? "ok" : ""}>
                          <span className="req-check">{requirements[key] ? <Check size={11} /> : ""}</span>
                          {label}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <label htmlFor="reset-confirm">Confirmar nova senha</label>
                <div className="input-wrap">
                  <LockKeyhole size={17} />
                  <input id="reset-confirm" placeholder="Repita sua nova senha" type="password" autoComplete="new-password" value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} />
                </div>
                {confirmacao && <p className={senha === confirmacao ? "match-hint ok-match" : "match-hint bad-match"}>{senha === confirmacao ? "As senhas conferem." : "As senhas não conferem."}</p>}

                {error && <p className="form-error" role="alert">{error}</p>}

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="spin" /> : <Check size={18} />}
                  {isSubmitting ? "Salvando..." : "Redefinir senha"}
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