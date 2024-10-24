import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import Link from 'next/link'

const SignInModalAlert = ({ open, url }: { open: boolean; url: string }) => {
  console.log(encodeURIComponent(url))
  return (
    <Dialog open={open}>
      <DialogContent className='flex flex-col items-center justify-center bg-accent text-white'>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl uppercase'>
            Cuenta Creada
          </DialogTitle>
          <DialogDescription className='text-center text-lg text-white'>
            Por motivos de seguridad debe autentificarse en nuestro Comercio
            Electrónico antes de continuar con la compra para proteger su datos!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='cart'>
            <Link href='/'>Cancelar</Link>
          </Button>
          <Button variant='default' asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL!}/sign-in?redirect_url=${encodeURIComponent(url)}`}
            >
              Continuar
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SignInModalAlert
