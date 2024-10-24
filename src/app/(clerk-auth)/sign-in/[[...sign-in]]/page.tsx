import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn forceRedirectUrl='/api/create-sanity-user-from-clerk' signUpForceRedirectUrl='/api/create-sanity-user-from-clerk' />
}
