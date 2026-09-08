"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { postLogin } from "../lib/api"
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { Button } from "@base-ui/react"

const googleLogo = (
  <svg aria-hidden="true" className="social-logo" viewBox="0 0 24 24">
    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" fill="#4285F4" />
    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.29 21.43 7.37 24 12 24z" fill="#34A853" />
    <path d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z" fill="#FBBC05" />
    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.57 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z" fill="#EA4335" />
  </svg>
)

type Profile = "candidate" | "rh"

export default function LoginForm() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>("candidate")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fazerLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await postLogin({
        email: identifier,
        password: password,
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || "Credenciais inválidas. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleProfileChange(next: Profile) {
    setProfile(next)
    setError(null)
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="auth-panel">
          <div className="auth-content">
            <div className="auth-header">
              <div>
                <h2>Bem-vindo de volta</h2>
                <p>Insira suas credenciais para acessar sua conta corporativa ou portal de vagas.</p>
              </div>
              <span className="secure-pill"><span /> Acesso<br />Seguro</span>
            </div>

            <div className="profile-tabs" role="tablist" aria-label="Tipo de acesso">
              <button
                className={profile === "candidate" ? "active" : ""}
                onClick={() => handleProfileChange("candidate")}
                role="tab"
                aria-selected={profile === "candidate"}
                type="button"
              >
                <UserRound size={16} /> Candidato / Aluno
              </button>
              <button
                className={profile === "rh" ? "active" : ""}
                onClick={() => handleProfileChange("rh")}
                role="tab"
                aria-selected={profile === "rh"}
                type="button"
              >
                <BriefcaseBusiness size={16} /> Colaborador / RH
              </button>
            </div>

            <div className="social-buttons">
              <button type="button">{googleLogo} Entrar com Google</button>
              <button type="button"><span className="linkedin-logo">in</span> Entrar com LinkedIn</button>
            </div>
            
            <div className="divider">
              <span>Ou Acesse Com E-Mail Corporativo / Pessoal</span>
            </div>

            <form className="login-form" onSubmit={fazerLogin} noValidate>
              <label htmlFor="identifier">E-mail corporativo</label>
              <div className="input-wrap">
                <Mail size={17} />
                <input
                  id="identifier"
                  name="identifier"
                  placeholder={profile === "candidate" ? "nome@empresa.com.br" : "matricula@empresa.com.br ou CPF"}
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <label htmlFor="password">Sua senha</label>
              <div className="input-wrap">
                <LockKeyhole size={17} />
                <input
                  id="password"
                  name="password"
                  placeholder="Insira seus caracteres"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {error && <p className="form-error" role="alert">{error}</p>}

              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span>Lembrar de mim por 30 dias</span>
                </label>
                <a href="/forgot-password">Esqueci minha senha</a>
              </div>

              <Button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Entrando
                  </>
                ) : (
                  <>
                    <span>Fazer login</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          </div>

          <footer className="auth-footer">
            <p>Ainda não tem conta? <a href="/register">Crie sua conta gratuitamente</a></p>
            <div>
              <span><ShieldCheck size={14} /> Ambiente Seguro com Criptografia SSL 256-bit</span>
              <span>Conformidade LGPD&nbsp;&nbsp; • &nbsp;&nbsp;Termos de Uso</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}