import { createRedsysAPI, PRODUCTION_URLS } from 'redsys-easy'

export const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: process.env.REDSYS_SECRET_KEY!,
  urls: PRODUCTION_URLS
})
