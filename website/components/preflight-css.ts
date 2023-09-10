/* eslint-disable */

const modules = import.meta.glob(
  '../../packages/basic/src/internal/preflight.css',
  { eager: true, as: 'raw' },
)

const file = modules['../../packages/basic/src/internal/preflight.css']

if (!file || typeof file !== 'string') {
  throw new Error('Expected file to be a string')
}

export const preflightCssCode: string = file
