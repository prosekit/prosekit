export const CALLOUT_VARIANTS = ['note', 'tip', 'important', 'warning', 'caution'] as const

export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number]

export interface CalloutAttrs {
  variant: CalloutVariant
  icon: string | null
}
