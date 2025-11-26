import { vfs } from '@prosekit/dev'

import * as classes from '../classes'

import { validateClasses } from './validate-classes'

export function updateClasses() {
  vfs.updateJSON('registry/src/classes.gen.json', validateClasses(classes))
}
