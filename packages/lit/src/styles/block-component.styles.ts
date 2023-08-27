import { css } from 'lit'

import { componentStyles } from './component.styles'

export const blockComponentStyles = css`
  ${componentStyles}

  :host {
    display: block;
    border-style: solid;
    border-width: 0px;
  }

  :host([hidden]) {
    display: none;
  }
`
