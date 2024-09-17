import type { DirectEditorProps } from '@prosekit/pm/view'

import { defineFacet, type Facet } from './facet'
import { rootFacet, type RootPayload } from './root'

export type ViewPayload = Omit<DirectEditorProps, 'state'>

export const viewFacet: Facet<ViewPayload, RootPayload> = defineFacet({
  reducer: (props) => {
    const view = Object.assign({}, ...props) as ViewPayload
    return { view }
  },
  singleton: true,
  parent: rootFacet,
})
