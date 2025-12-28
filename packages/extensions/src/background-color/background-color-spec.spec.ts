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
          style="background-color: rgba(0, 0, 255, 0.5);"
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

  it('should parse background color from style attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span style="background-color: #0000ff;">text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "rgb(0, 0, 255)",
            },
            "type": "backgroundColor",
          },
        ],
        "text": "text",
        "type": "text",
      }
    `)
  })

  it('should parse background color from data-background-color attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span data-background-color="rgb(0 0 255 / 0.5)">text</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "rgb(0 0 255 / 0.5)",
            },
            "type": "backgroundColor",
          },
        ],
        "text": "text",
        "type": "text",
      }
    `)
  })

  it('should prioritize data-background-color attribute over style attribute', () => {
    const { editor } = setupTest()

    const html = `<p><span style="background-color: blue;" data-background-color="red">This should be red</span></p>`
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "red",
            },
            "type": "backgroundColor",
          },
        ],
        "text": "This should be red",
        "type": "text",
      }
    `)
  })

  it('should not parse span with background-color: inherit', () => {
    const { editor } = setupTest()

    const html = '<p><span style="background-color: inherit">text</span></p>'
    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "text": "text",
        "type": "text",
      }
    `)

    const html2 = '<p><span data-background-color="inherit">text</span></p>'
    editor.setContent(html2)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "text": "text",
        "type": "text",
      }
    `)
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
    const { editor } = setupTest()

    const html = '<p>'
      + '<span style="background-color: yellow;">'
      + '<span style="color: red;">colored text</span>'
      + '</span>'
      + '</p>'

    editor.setContent(html)
    expect(editor.state.doc.firstChild?.firstChild?.toJSON()).toMatchInlineSnapshot(`
      {
        "marks": [
          {
            "attrs": {
              "color": "yellow",
            },
            "type": "backgroundColor",
          },
          {
            "attrs": {
              "color": "red",
            },
            "type": "textColor",
          },
        ],
        "text": "colored text",
        "type": "text",
      }
    `)
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
