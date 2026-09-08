import { Suspense } from "react"
import ResetPasswordForm from "../../components/reset-password/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}