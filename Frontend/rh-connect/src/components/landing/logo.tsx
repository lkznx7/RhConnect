import { HeartHandshake } from "lucide-react"

export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={inverse ? "lp-logo lp-logo-inverse" : "lp-logo"} href="#top">
      <span className="lp-logo-mark">
        <HeartHandshake size={18} />
      </span>
      <span className="lp-logo-text">
        <strong>RH Connect</strong>
        <span>Gestão de Pessoas</span>
      </span>
    </a>
  )
}