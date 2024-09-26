import { createRedsysAPI, SANDBOX_URLS } from "redsys-easy";

export const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: process.env.REDSYS_SECRET_KEY!,
  urls: SANDBOX_URLS, // URL de pruebas
});