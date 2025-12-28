import formatHTML from 'diffable-html'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

describe('defineBackgroundColorSpec', () => {
  it('should render background color as inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Default',
        m.backgroundColor({ color: '#0000ff' }, 'hex'),
        m.backgroundColor({ color: 'blue' }, 'named'),
        m.backgroundColor({ color: 'rgb(0, 0, 255)' }, 'rgb'),
        m.backgroundColor({ color: 'rgba(0 0 255 / 0.5)' }, 'rgba'),
        m.backgroundColor({ color: 'hsl(240 100% 50% / 0.5)' }, 'hsl'),
        m.backgroundColor({ color: 'var(--color-variable)' }, 'variable'),
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        Default
        <span
          data-background-color="#0000ff"
          style="background-color: rgb(0, 0, 255);"
        >
          hex
        </span>
        <span
          data-background-color="blue"
          style="background-color: blue;"
        >
          named
        </span>
        <span
          data-background-color="rgb(0, 0, 255)"
          style="background-color: rgb(0, 0, 255);"
        >
          rgb
        </span>
        <span
          data-background-color="rgba(0 0 255 / 0.5)"
          style="background-color: rgba(0, 0, 255, 0.5);"
        >
          rgba
        </span>
        <span
          data-background-color="hsl(240 100% 50% / 0.5)"
          style="background-color: hsla(240, 100%, 50%, 0.5);"
        >
          hsl
        </span>
        <span
          data-background-color="var(--color-variable)"
          style="background-color: var(--color-variable);"
        >
          variable
        </span>
      </p>
      "
      `,
    )
  })

  it('should parse background color from inline span with data-background-color', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        m.backgroundColor({ color: '#ff0000' }, 'red'),
        m.backgroundColor({ color: '#00ff00' }, 'green'),
        m.backgroundColor({ color: '#0000ff' }, 'blue'),
      ),
    )
    editor.set(doc)
    expect(editor.getDocJSON()).toEqual(doc.toJSON())

    const expectedHTML =
      '<p>' +
      '<span style="background-color: #ff0000;" data-background-color="#ff0000">red</span>' +
      '<span style="background-color: #00ff00;" data-background-color="#00ff00">green</span>' +
      '<span style="background-color: #0000ff;" data-background-color="#0000ff">blue</span>' +
      '</p>'

    editor.view.dom.innerHTML = expectedHTML
    editor.view.updateState(editor.view.state)
    expect(editor.getDocJSON()).toEqual(doc.toJSON())
  })

  it('should parse background color from inline span with style attribute', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        m.backgroundColor({ color: 'red' }, 'red'),
        m.backgroundColor({ color: 'green' }, 'green'),
        m.backgroundColor({ color: 'blue' }, 'blue'),
      ),
    )

    const expectedHTML =
      '<p>' +
      '<span style="background-color: red">red</span>' +
      '<span style="background-color: green">green</span>' +
      '<span style="background-color: blue">blue</span>' +
      '</p>'

    editor.view.dom.innerHTML = expectedHTML
    editor.view.updateState(editor.view.state)
    expect(editor.getDocJSON()).toEqual(doc.toJSON())
  })

  it('should prioritize data-background-color over style attribute during parsing', () => {
    const { editor, n, m } = setupTest()

    const expectedDoc = n.doc(
      n.p(
        m.backgroundColor({ color: 'rgb(255, 0, 0)' }, 'red'),
        m.backgroundColor({ color: 'rgb(0, 255, 0)' }, 'green'),
        m.backgroundColor({ color: 'rgb(0, 0, 255)' }, 'blue'),
      ),
    )

    const expectedHTML =
      '<p>' +
      '<span style="background-color: red" data-background-color="rgb(255, 0, 0)">red</span>' +
      '<span style="background-color: green" data-background-color="rgb(0, 255, 0)">green</span>' +
      '<span style="background-color: blue" data-background-color="rgb(0, 0, 255)">blue</span>' +
      '</p>'

    editor.view.dom.innerHTML = expectedHTML
    editor.view.updateState(editor.view.state)
    expect(editor.getDocJSON()).toEqual(expectedDoc.toJSON())
  })

  it('should not parse span with background-color: inherit', () => {
    const { editor, n } = setupTest()

    const expectedDoc = n.doc(n.p('text'))

    editor.view.dom.innerHTML = '<p><span style="background-color: inherit">text</span></p>'
    editor.view.updateState(editor.view.state)
    expect(editor.getDocJSON()).toEqual(expectedDoc.toJSON())

    editor.view.dom.innerHTML = '<p><span data-background-color="inherit">text</span></p>'
    editor.view.updateState(editor.view.state)
    expect(editor.getDocJSON()).toEqual(expectedDoc.toJSON())
  })

  it('should preserve both background-color and text-color marks', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        m.backgroundColor(
          { color: 'yellow' },
          m.textColor({ color: 'red' }, 'colored text'),
        ),
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        <span
          data-background-color="yellow"
          style="background-color: yellow;"
        >
          <span
            data-text-color="red"
            style="color: red;"
          >
            colored text
          </span>
        </span>
      </p>
      "
      `,
    )
  })

  it('should preserve background-color mark when parsing HTML with both marks', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        m.backgroundColor(
          { color: 'yellow' },
          m.textColor({ color: 'red' }, 'colored text'),
        ),
      ),
    )

    const html =
      '<p>' +
      '<span style="background-color: yellow;">' +
      '<span style="color: red;">colored text</span>' +
      '</span>' +
      '</p>'

    editor.view.dom.innerHTML = html
    editor.view.updateState(editor.view.state)
    expect(editor.getDocJSON()).toEqual(doc.toJSON())
  })

  it('should handle background color on partial text selection', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        'Start ',
        m.backgroundColor({ color: 'yellow' }, 'highlighted'),
        ' end',
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        Start
        <span
          data-background-color="yellow"
          style="background-color: yellow;"
        >
          highlighted
        </span>
         end
      </p>
      "
      `,
    )
  })

  it('should handle multiple adjacent background colors', () => {
    const { editor, n, m } = setupTest()

    const doc = n.doc(
      n.p(
        m.backgroundColor({ color: 'yellow' }, 'yellow'),
        m.backgroundColor({ color: 'green' }, 'green'),
        m.backgroundColor({ color: 'blue' }, 'blue'),
      ),
    )
    editor.set(doc)
    expect(formatHTML(editor.view.dom.innerHTML)).toMatchInlineSnapshot(
      `
      "
      <p>
        <span
          data-background-color="yellow"
          style="background-color: yellow;"
        >
          yellow
        </span>
        <span
          data-background-color="green"
          style="background-color: green;"
        >
          green
        </span>
        <span
          data-background-color="blue"
          style="background-color: blue;"
        >
          blue
        </span>
      </p>
      "
      `,
    )
  })
})
