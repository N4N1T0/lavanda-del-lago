// Orama Cloud Imports
import { CloudManager } from '@oramacloud/client'
import { OramaClient } from '@oramacloud/client'

const endpoint = process.env.ORAMA_API_URL!
const api_key = process.env.ORAMA_PUBLIC_KEY!

export const oramaClient = new OramaClient({
  endpoint,
  api_key
})

// Get the Secret Sanity Webhook and Orama Private API fron the Enviroment Variables
const oramaSecret = process.env.ORAMA_PRIVATE_API_KEY

// initialize the Orama Cloud Manager
const manager = new CloudManager({ api_key: oramaSecret! })
export const indexManager = manager.index('l3om167fdgwjrviwbtem9vmc')
