import { css } from 'lit'

import { componentStyles } from './component.styles'

export const blockComponentStyles = css`
  ${componentStyles}

  :host {
    display: block;
  }
`
