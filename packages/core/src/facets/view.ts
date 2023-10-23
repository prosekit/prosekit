import type { DirectEditorProps } from '@prosekit/pm/view'

import { Facet } from './facet'

export type ViewPayload = Omit<DirectEditorProps, 'state'>

export const viewFacet = Facet.defineRootFacet<ViewPayload>({
  convert: (props) => {
    return Object.assign({}, ...props) as ViewPayload
  },
})
