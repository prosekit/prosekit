/* eslint-disable */

;`

// All used icons 

ICON_ITALIC: 'i-ci-italic',
ICON_BOLD: 'i-ci-bold',
ICON_H1: 'i-ci-heading-h1',
ICON_H2: 'i-ci-heading-h2',
ICON_H3: 'i-ci-heading-h3',
ICON_H4: 'i-ci-heading-h4',
ICON_H5: 'i-ci-heading-h5',
ICON_H6: 'i-ci-heading-h6',
`

const modules = import.meta.glob('./icons-css.css', { eager: true, as: 'raw' })

const file = modules['./icons-css.css']

if (!file || typeof file !== 'string') {
  throw new Error('Expected file to be a string')
}

export const iconsCssCode: string = file
