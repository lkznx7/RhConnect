import type { Metadata } from "next"
import RecoverySentCard from "../../components/reset-password/recovery-sent-card"

export const metadata: Metadata = {
  title: "Recuperação Enviada | RH Connect",
}

export default function RecuperacaoEnviadaPage() {
  return <RecoverySentCard />
}