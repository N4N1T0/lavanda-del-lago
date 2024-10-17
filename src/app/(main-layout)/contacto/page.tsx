import ContactForm from '@/components/shared/contact-form'

const ContactPage = () => {
  return (
    <section
      id='contact-form'
      className='mx-auto flex h-auto max-w-screen-2xl flex-col items-center gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-20'
    >
      <h1 className='text-center text-2xl uppercase text-accent md:text-4xl'>
        Contáctenos
      </h1>
      <ContactForm />
    </section>
  )
}

export default ContactPage
