import { resend } from '@/lib/resend'

export async function GET() {
	try {
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['jblas@lavandadellago.es'],
			subject: 'Hello world',
			html: `<div>
            <h1>Welcome, Adrian</h1>
          </div>`,
		})

		if (error) {
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(data)
	} catch (error) {
		return Response.json({ error }, { status: 500 })
	}
}
