import { Tailwind } from '@react-email/components'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const TailwindWrapper = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              accent: '#694DAB',
              secondary: '#FD6D83',
              tertiary: '#DF4344'
            },
            fontFamily: {
              sans: ['var(--josefin-sans)', ...fontFamily.sans]
            }
          }
        }
      }}
    >
      {children}
    </Tailwind>
  )
}
