import type { Debugger } from 'obug'
import { createDebug } from 'obug'

export const debug: Debugger = createDebug('prosekit:dev')
