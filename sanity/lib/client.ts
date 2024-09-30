import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

const token = process.env.SANITY_TOKEN

export const sanityClientRead = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published'
})

export const sanityClientWrite = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn
})
