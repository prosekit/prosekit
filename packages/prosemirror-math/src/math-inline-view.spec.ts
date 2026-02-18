import { formatHTML } from 'diffable-html-snapshot'
import { describe, expect, it } from 'vitest'

import { katexRenderer, mathjaxRenderer, renderers, setupTest, temmlRenderer } from './testing'

describe.each(Object.keys(renderers))('createMathInlineView (%s)', (name) => {
  const renderer = renderers[name as keyof typeof renderers]

  it('renders the math inline DOM structure', () => {
    const { editor, n } = setupTest(renderer)
    editor.set(n.doc(n.paragraph(n.mathInline('x^2'))))

    const dom = editor.view.dom
    const mathInline = dom.querySelector('.prosekit-math-inline')
    expect(mathInline).toBeTruthy()
    expect(mathInline?.querySelector('.prosekit-math-source')).toBeTruthy()
    expect(mathInline?.querySelector('.prosekit-math-display')).toBeTruthy()
  })

  it('uses span elements for inline math', () => {
    const { editor, n } = setupTest(renderer)
    editor.set(n.doc(n.paragraph(n.mathInline('x'))))

    const mathInline = editor.view.dom.querySelector('.prosekit-math-inline')
    expect(mathInline?.tagName).toBe('SPAN')
  })
})

describe('createMathInlineView (temml snapshot)', () => {
  it('renders Temml output in the display element', () => {
    const { editor, n } = setupTest(temmlRenderer)
    editor.set(n.doc(n.paragraph(n.mathInline('x^2'))))

    const display = editor.view.dom.querySelector('.prosekit-math-display')
    const html = formatHTML(display?.innerHTML || '')
    expect(html).toMatchInlineSnapshot(`
      "
      <math>
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

describe('createMathInlineView (katex snapshot)', () => {
  it('renders KaTeX output in the display element', () => {
    const { editor, n } = setupTest(katexRenderer)
    editor.set(n.doc(n.paragraph(n.mathInline('x^2'))))

    const display = editor.view.dom.querySelector('.prosekit-math-display')
    const html = formatHTML(display?.innerHTML || '')
    expect(html).toMatchInlineSnapshot(`
      "
      <span class="katex">
        <span class="katex-mathml">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
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
              style="height: 0.8141em;"
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
                      style="height: 0.8141em;"
                    >
                      <span
                        class
                        style="top: -3.063em; margin-right: 0.05em;"
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
      "
    `)
  })
})

describe('createMathInlineView (mathjax snapshot)', () => {
  it('renders MathJax output in the display element', () => {
    const { editor, n } = setupTest(mathjaxRenderer)
    editor.set(n.doc(n.paragraph(n.mathInline('x^2'))))

    const display = editor.view.dom.querySelector('.prosekit-math-display')
    const html = formatHTML(display?.innerHTML || '')
    expect(html).toMatchInlineSnapshot(`
      "
      <math
        data-latex="x^2"
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
