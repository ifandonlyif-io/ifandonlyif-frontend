import { z, type ZodFormattedError } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
})

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_ALCHEMY_API_KEY: z.string(),
  NEXT_PUBLIC_INFURA_API_KEY: z.string().optional(),
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
  NEXT_PUBLIC_CHAIN_ID: z.string(),
  NEXT_PUBLIC_IFFNFT_CONTRACT_ADDRESS: z.string(),
})

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`
      }
      return
    })
    .filter(Boolean)
