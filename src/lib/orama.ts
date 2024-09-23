import { OramaClient } from '@oramacloud/client'

const endpoint = process.env.ORAMA_API_URL!
const api_key = process.env.ORAMA_PUBLIC_KEY!

export const oramaClient = new OramaClient({
	endpoint,
	api_key,
})
