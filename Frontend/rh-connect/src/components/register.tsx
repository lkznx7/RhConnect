"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import {
  checkPasswordRequirements,
  getPasswordStrength,
  isValidCpf,
  isValidEmail,
  maskCpf,
  maskPhone,
} from "@/lib/validators"
import { RegisterRequest } from "@/types/dtoApi"
import { postRegister } from "@/lib/api"

const OBJETIVOS = [
  { value: "EMPREGO", label: "Encontrar oportunidades de emprego" },
  { value: "CURSOS", label: "Fazer cursos e trilhas de desenvolvimento" },
  { value: "COMPANHIA", label: "Conhecer a companhia" },
  { value: "RH", label: "Acesso corporativo (colaborador / RH)" },
] as const

const REQUISITOS = [
  { key: "length" as const, label: "Mínimo de 8 caracteres" },
  { key: "uppercase" as const, label: "Uma letra maiúscula" },
  { key: "lowercase" as const, label: "Uma letra minúscula" },
  { key: "number" as const, label: "Um número" },
  { key: "special" as const, label: "Um caractere especial" },
]

export default function RegisterForm() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmacao, setConfirmacao] = useState("")
  const [objetivo, setObjetivo] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const cpfTouched = cpf.length > 0
  const cpfValid = isValidCpf(cpf)
  const requirements = checkPasswordRequirements(senha)
  const strength = getPasswordStrength(senha)

  function validate(): string | null {
    if (!nome.trim()) return "Informe seu nome completo."
    if (!isValidEmail(email)) return "Informe um e-mail válido."
    if (!cpfTouched || !cpfValid) return "Informe um CPF válido."
    if (telefone.replace(/\D/g, "").length < 10) return "Informe um celular/WhatsApp válido."
    if (Object.values(requirements).some((r) => !r)) return "Sua senha não atende aos requisitos mínimos."
    if (senha !== confirmacao) return "As senhas não conferem."
    if (!objetivo) return "Selecione seu objetivo no RH Connect."
    return null
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await postRegister({
        nomeCompleto: nome,
        email: email,
        cpf: cpf,
        telefone: telefone, 
        senha: senha,
      })

      setSuccess("Conta criada com sucesso!")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao criar conta. Verifique os dados.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validate()
    if (validation) {
      setError(validation)
      return
    }
    setIsSubmitting(true)
    setError(null)
}

  return (
    <main className="login-page">
      <section className="login-shell">

        <div className="auth-panel">
          <div className="auth-content">
            <div className="auth-header">
              <div>
                <h2 className="auth-title">Crie sua conta gratuita</h2>
                <p>Acesse vagas, cursos e trilhas de desenvolvimento no ecossistema RH Connect.</p>
              </div>
              <span className="secure-pill"><span /> Dados<br />Protegidos</span>
            </div>

            {success ? (
              <div className="success-box">
                <div className="success-icon"><Check size={26} /></div>
                <h3>Conta criada com sucesso!</h3>
                <p>Enviamos um e-mail de confirmação para <strong>{email.trim()}</strong>. Verifique sua caixa de entrada para ativar sua conta e fazer login.</p>
                <Link className="submit-button" href="/login">Ir para o Login <ArrowRight size={18} /></Link>
              </div>
            ) : (
              <form className="auth-form login-form" onSubmit={handleRegister} noValidate>
                <label htmlFor="register-nome">Nome completo</label>
                <div className="input-wrap"><CircleUserRound size={17} /><input id="register-nome" placeholder="Ex.: Maria Silva Souza" type="text" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} /></div>

                <label htmlFor="register-email">E-mail institucional ou pessoal</label>
                <div className="input-wrap"><Mail size={17} /><input id="register-email" placeholder="nome@email.com.br" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>

                <label htmlFor="register-cpf">CPF</label>
                <div className="input-wrap">
                  <Mail size={17} />
                  <input id="register-cpf" placeholder="000.000.000-00" type="text" inputMode="numeric" autoComplete="off" value={cpf} onChange={(e) => setCpf(maskCpf(e.target.value))} />
                  {cpfTouched && (
                    <span className={cpfValid ? "cpf-status valid" : "cpf-status invalid"}>
                      {cpfValid ? <Check size={13} /> : "CPF inválido"}
                    </span>
                  )}
                </div>

                <label htmlFor="register-phone">Celular / WhatsApp</label>
                <div className="input-wrap"><Phone size={17} /><input id="register-phone" placeholder="(00) 00000-0000" type="tel" inputMode="numeric" autoComplete="tel" value={telefone} onChange={(e) => setTelefone(maskPhone(e.target.value))} /></div>

                <label htmlFor="register-password">Sua senha</label>
                <div className="input-wrap"><LockKeyhole size={17} /><input id="register-password" placeholder="Crie uma senha forte" type={showPassword ? "text" : "password"} autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} /><button aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>

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

                <label htmlFor="register-confirm">Confirmar senha</label>
                <div className="input-wrap"><LockKeyhole size={17} /><input id="register-confirm" placeholder="Repita sua senha" type={showConfirm ? "text" : "password"} autoComplete="new-password" value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} /><button aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowConfirm(!showConfirm)} type="button">{showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
                {confirmacao && <p className={senha === confirmacao ? "match-hint ok-match" : "match-hint bad-match"}>{senha === confirmacao ? "As senhas conferem." : "As senhas não conferem."}</p>}

                <fieldset className="objective-fieldset">
                  <legend>Seu objetivo no RH Connect</legend>
                  <div className="objective-options">
                    {OBJETIVOS.map(({ value, label }) => (
                      <label key={value} className={objetivo === value ? "objective-option selected" : "objective-option"}>
                        <input type="radio" name="objetivo" value={value} checked={objetivo === value} onChange={() => setObjetivo(value)} />
                        {value === "EMPREGO" ? <BriefcaseBusiness size={15} /> : value === "CURSOS" ? <GraduationCap size={15} /> : value === "COMPANHIA" ? <UserRound size={15} /> : <BriefcaseBusiness size={15} />}
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {error && <p className="form-error" role="alert">{error}</p>}

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="spin" /> : <ArrowRight size={18} />}
                  {isSubmitting ? "Criando conta..." : "Criar minha conta gratuita"}
                </button>
              </form>
            )}
          </div>

          <footer className="auth-footer">
            <p>Já possui uma conta? <Link href="/login">Entrar no RH Connect</Link></p>
            <div><span><ShieldCheck size={14} /> Ambiente Seguro com Criptografia SSL 256-bit</span><span>Conformidade LGPD&nbsp;&nbsp; • &nbsp;&nbsp;Termos de Uso</span></div>
          </footer>
        </div>
      </section>
    </main>
  )
}