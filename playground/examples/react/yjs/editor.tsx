import 'prosekit/basic/style.css'
import 'prosekit/extensions/yjs/style.css'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { Fragment, useCallback, useMemo, useState } from 'react'
import * as Y from 'yjs'

import { defineExtension } from './extension'
import { InputWithLabel } from './input'
import Toolbar from './toolbar'

export default function Page() {
  const [key, setKey] = useState(Date.now())
  const [appId, setAppId] = useState('')
  const [token, setToken] = useState('')

  const handleSubmit = useCallback(() => {
    setKey(Date.now())
  }, [])

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex items-end gap-8">
        <InputWithLabel
          id="appId"
          value={appId}
          onChange={(ev) => setAppId(ev.target.value)}
        />
        <InputWithLabel
          id="token"
          value={token}
          onChange={(ev) => setToken(ev.target.value)}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring ring-offset-background"
        >
          connect
        </button>
      </div>
      <Fragment key={key}>
        <div className="flex-1">
          <Editor appId={appId} token={token} />
        </div>
        <div className="flex-1">
          <Editor appId={appId} token={token} />
        </div>
      </Fragment>
    </div>
  )
}

export function Editor({ appId, token }: { appId: string; token: string }) {
  const editor = useMemo(() => {
    if (appId && token) {
      const doc = new Y.Doc()
      const provider = new TiptapCollabProvider({
        name: 'prosekit', // Unique document identifier for syncing. This is your document name.
        appId, // Your Cloud Dashboard AppID or `baseURL` for on-premises
        token,
        document: doc,
      })
      const extension = defineExtension(doc, provider.awareness!)
      return createEditor({ extension })
    } else {
      const extension = defineExtension()
      return createEditor({ extension })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <Toolbar />
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
