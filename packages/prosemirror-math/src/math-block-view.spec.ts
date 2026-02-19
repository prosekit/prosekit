import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { katexRenderer, mathjaxRenderer, renderers, setupTest, temmlRenderer } from './testing.ts'

describe.each(Object.keys(renderers))('createMathBlockView (%s)', (name) => {
  const renderer = renderers[name as keyof typeof renderers]

  it('renders the math block DOM structure', () => {
    const { editor, n } = setupTest(renderer)
    editor.set(n.doc(n.mathBlock('x^2')))

    const dom = editor.view.dom
    const mathBlock = dom.querySelector('.prosemirror-math-block')
    expect(mathBlock).toBeTruthy()
    expect(mathBlock?.querySelector('.prosemirror-math-source')).toBeTruthy()
    expect(mathBlock?.querySelector('.prosemirror-math-display')).toBeTruthy()
  })

  it('updates display when content changes', () => {
    const { editor, n } = setupTest(renderer)
    editor.set(n.doc(n.mathBlock('x^2')))

    const display = editor.view.dom.querySelector('.prosemirror-math-display')
    const initialHTML = display?.innerHTML

    // Dispatch a transaction to change content
    const { state } = editor.view
    const tr = state.tr.insertText(' + y^2', 3)
    editor.view.dispatch(tr)

    const updatedHTML = display?.innerHTML
    expect(updatedHTML).not.toBe(initialHTML)
  })
})

describe('createMathBlockView (temml snapshot)', () => {
  it('renders Temml output in the display element', () => {
    const { editor, n } = setupTest(temmlRenderer)
    editor.set(n.doc(n.mathBlock('x^2')))

    const display = editor.view.dom.querySelector('.prosemirror-math-display')
    const html = formatHTML(display?.innerHTML || '')
    expect(html).toMatchInlineSnapshot(`
      "
      <math
        class="tml-display"
        display="block"
        style="display: block math;"
      >
        <semantics>
          <msup>
            <mi>
              x
            </mi>
            <mn class="tml-sml-pad">
              2
            </mn>
          </msup>
          <annotation encoding="application/x-tex">
            x^2
          </annotation>
        </semantics>
      </math>
      "
    `)
  })
})

describe('createMathBlockView (katex snapshot)', () => {
  it('renders KaTeX output in the display element', () => {
    const { editor, n } = setupTest(katexRenderer)
    editor.set(n.doc(n.mathBlock('x^2')))

    const display = editor.view.dom.querySelector('.prosemirror-math-display')
    const html = formatHTML(display?.innerHTML || '')
    expect(html).toMatchInlineSnapshot(`
      "
      <span class="katex-display">
        <span class="katex">
          <span class="katex-mathml">
            <math
              display="block"
              xmlns="http://www.w3.org/1998/Math/MathML"
            >
              <semantics>
                <mrow>
                  <msup>
                    <mi>
                      x
                    </mi>
                    <mn>
                      2
                    </mn>
                  </msup>
                </mrow>
                <annotation encoding="application/x-tex">
                  x^2
                </annotation>
              </semantics>
            </math>
          </span>
          <span
            aria-hidden="true"
            class="katex-html"
          >
            <span class="base">
              <span
                class="strut"
                style="height: 0.8641em;"
              >
              </span>
              <span class="mord">
                <span class="mord mathnormal">
                  x
                </span>
                <span class="msupsub">
                  <span class="vlist-t">
                    <span class="vlist-r">
                      <span
                        class="vlist"
                        style="height: 0.8641em;"
                      >
                        <span
                          class
                          style="top: -3.113em; margin-right: 0.05em;"
                        >
                          <span
                            class="pstrut"
                            style="height: 2.7em;"
                          >
                          </span>
                          <span class="sizing reset-size6 size3 mtight">
                            <span class="mord mtight">
                              2
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>
      "
    `)
  })
})

describe('createMathBlockView (mathjax snapshot)', () => {
  it('renders MathJax output in the display element', () => {
    const { editor, n } = setupTest(mathjaxRenderer)
    editor.set(n.doc(n.mathBlock('x^2')))

    const display = editor.view.dom.querySelector('.prosemirror-math-display')
    const html = formatHTML(display?.innerHTML || '')
    expect(html).toMatchInlineSnapshot(`
      "
      <math
        data-latex="x^2"
        display="block"
        xmlns="http://www.w3.org/1998/Math/MathML"
      >
        <msup data-latex="x^2">
          <mi data-latex="x">
            x
          </mi>
          <mn data-latex="2">
            2
          </mn>
        </msup>
      </math>
      "
    `)
  })
})
