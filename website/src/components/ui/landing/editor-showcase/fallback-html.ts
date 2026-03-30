import { JSDOM } from 'jsdom'

import { dynamicImportEditorModule } from './dynamic-import'

export async function getFallbackHTML(): Promise<string> {
  const dom = new JSDOM('')
  const document: Document = dom.window.document
  const { renderHTML } = await dynamicImportEditorModule()
  return renderHTML(document)
}
