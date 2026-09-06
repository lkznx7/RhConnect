import Link from "next/link"
import { ArrowRight } from "lucide-react"

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  linkHref?: string
  linkLabel?: string
  dark?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={dark ? "lp-section-header lp-section-header-dark" : "lp-section-header"}>
      <span className="lp-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {linkHref && linkLabel && (
        <Link className="lp-section-link" href={linkHref}>
          {linkLabel} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}