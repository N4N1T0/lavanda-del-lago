import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn signUpFallbackRedirectUrl='/api/create-sanity-user-from-clerk' />
  )
}
