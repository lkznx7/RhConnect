import Link from "next/link"
import Image from "next/image"
import icon from "../../../public/icons/favicon_io/apple-touch-icon.png"

export default function Logo() {
  return (
    <Link href="/" className="lp-logo" aria-label="RH Connect — ir para a página inicial">
     <Image src={icon} alt="Logo RH Connect" width={32} height={32} />
      <span className="lp-logo-text">
        <strong>RH Connect</strong>
        <span>Portal de Pessoas & Carreira</span>
      </span>
    </Link>
  )
}