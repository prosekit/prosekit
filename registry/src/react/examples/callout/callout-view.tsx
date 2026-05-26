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

function variantClasses(v: CalloutVariant): string {
  switch (v) {
    case 'note':
      return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30'
    case 'tip':
      return 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
    case 'important':
      return 'border-l-violet-500 bg-violet-50 dark:bg-violet-950/30'
    case 'warning':
      return 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30'
    case 'caution':
      return 'border-l-red-500 bg-red-50 dark:bg-red-950/30'
  }
}

function variantTextClass(v: CalloutVariant): string {
  switch (v) {
    case 'note': return 'text-blue-700 dark:text-blue-300'
    case 'tip': return 'text-emerald-700 dark:text-emerald-300'
    case 'important': return 'text-violet-700 dark:text-violet-300'
    case 'warning': return 'text-amber-700 dark:text-amber-300'
    case 'caution': return 'text-red-700 dark:text-red-300'
  }
}

const VARIANT_OPTIONS: CalloutVariant[] = ['note', 'tip', 'important', 'warning', 'caution']

export default function CalloutView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CalloutAttrs
  const variant: CalloutVariant = attrs.variant || 'note'

  const handleVariantChange = (value: CalloutVariant) => {
    props.setAttrs({ variant: value })
  }

  return (
    <div className={`CSS_CALLOUT ${variantClasses(variant)}`} data-callout-variant={variant}>
      <div className="CSS_CALLOUT_HEADER" contentEditable={false}>
        <div className={`${VARIANT_ICONS[variant]} ${variantTextClass(variant)}`} />
        <div className="flex items-center gap-0.5">
          {VARIANT_OPTIONS.map((v) => (
            <button
              key={v}
              type="button"
              className={`CSS_CALLOUT_VARIANT_BUTTON capitalize ${
                v === variant
                  ? `border-current bg-current/10 ${variantTextClass(v)} font-semibold`
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
