export const CALLOUT_VARIANTS = ['note', 'tip', 'important', 'warning', 'caution'] as const

export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number]

export interface CalloutAttrs {
  variant?: CalloutVariant
  icon?: string | null
}

export function isCalloutVariant(value: string | null | undefined): value is CalloutVariant {
  return !!value && (CALLOUT_VARIANTS as readonly string[]).includes(value)
}
