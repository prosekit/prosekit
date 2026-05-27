'use client'

import type { CalloutAttrs, CalloutVariant } from 'prosekit/extensions/callout'
import type { ReactNodeViewProps } from 'prosekit/react'

const VARIANT_ICONS: Record<CalloutVariant, string> = {
  note: 'CSS_ICON_CALLOUT_NOTE',
  tip: 'CSS_ICON_CALLOUT_TIP',
  important: 'CSS_ICON_CALLOUT_IMPORTANT',
  warning: 'CSS_ICON_CALLOUT_WARNING',
  caution: 'CSS_ICON_CALLOUT_CAUTION',
}

const VARIANT_CLASSES: Record<CalloutVariant, string> = {
  note: 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30',
  tip: 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
  important: 'border-l-violet-500 bg-violet-50 dark:bg-violet-950/30',
  warning: 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30',
  caution: 'border-l-red-500 bg-red-50 dark:bg-red-950/30',
}

const VARIANT_TEXT_CLASSES: Record<CalloutVariant, string> = {
  note: 'text-blue-700 dark:text-blue-300',
  tip: 'text-emerald-700 dark:text-emerald-300',
  important: 'text-violet-700 dark:text-violet-300',
  warning: 'text-amber-700 dark:text-amber-300',
  caution: 'text-red-700 dark:text-red-300',
}

const VARIANT_OPTIONS: CalloutVariant[] = ['note', 'tip', 'important', 'warning', 'caution']

export default function CalloutView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CalloutAttrs
  const variant: CalloutVariant = attrs.variant || 'note'

  const handleVariantChange = (value: CalloutVariant) => {
    props.setAttrs({ variant: value })
  }

  return (
    <div className={`CSS_CALLOUT ${VARIANT_CLASSES[variant]}`} data-callout-variant={variant}>
      <div className="CSS_CALLOUT_HEADER" contentEditable={false}>
        <div className={`${VARIANT_ICONS[variant]} ${VARIANT_TEXT_CLASSES[variant]}`} />
        <div className="flex items-center gap-0.5">
          {VARIANT_OPTIONS.map((v) => (
            <button
              key={v}
              type="button"
              className={`CSS_CALLOUT_VARIANT_BUTTON capitalize ${
                v === variant
                  ? `border-current bg-current/10 ${VARIANT_TEXT_CLASSES[v]} font-semibold`
                  : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleVariantChange(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div ref={props.contentRef} className="CSS_CALLOUT_CONTENT" />
    </div>
  )
}
