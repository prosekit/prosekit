import type { DirectEditorProps } from '@prosekit/pm/view'

import { defineFacet } from './facet'
import { rootFacet, type RootPayload } from './root'

export type ViewPayload = Omit<DirectEditorProps, 'state'>

export const viewFacet = defineFacet<ViewPayload, RootPayload>({
  reducer: (props) => {
    const view = Object.assign({}, ...props) as ViewPayload
    return { view }
  },
  singleton: true,
  parent: rootFacet,
})
