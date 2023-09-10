/* eslint-disable */

const modules = import.meta.glob('./icons-css.css', { eager: true, as: 'raw' })

const file = modules['./icons-css.css']

if (!file || typeof file !== 'string') {
  throw new Error('Expected file to be a string')
}

export const iconsCssCode: string = file
