import type { ComponentInfo } from '@prosekit/dev/gen-api-docs'
import { pascalCase } from 'change-case'
import markdownit from 'markdown-it'

import { componentInfos } from '../../api/api'

const md = markdownit()

function PropType({ text }: { text: string }) {
  text = text.replaceAll('<any>', '')

  return <code>{text}</code>
}

function PropDescription({ markdown }: { markdown: string }) {
  const html = md.render(markdown)
  return <div v-html={html}></div>
}

function PropsTable({ componentInfo }: { componentInfo: ComponentInfo }) {
  const propInfos = componentInfo.props
  if (propInfos.length === 0) {
    return null
  }

  return (
    <table class="[&_tr_td_p]:my-2 [&_tr_td]:px-2 [&_tr_td]:py-2">
      <thead>
        <tr>
          <th>Property</th>
          <th>Default</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody class="text-xs">
        {propInfos.map((prop) => (
          <tr>
            <td class="p-1">
              <code>{prop.name}</code>
            </td>
            <td class="p-1">
              <code>{prop.default}</code>
            </td>
            <td>
              <p>
                <PropType text={prop.type} />
              </p>
              <PropDescription markdown={prop.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function EventsTable({ componentInfo }: { componentInfo: ComponentInfo }) {
  const eventInfos = componentInfo.events
  if (eventInfos.length === 0) {
    return null
  }

  return (
    <table class="[&_tr_td_p]:my-2 [&_tr_td]:px-2 [&_tr_td]:py-2">
      <thead>
        <tr>
          <th>Event Handler</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody class="text-xs">
        {eventInfos.map((event) => (
          <tr>
            <td class="p-1">
              <code>on{pascalCase(event.name)}</code>
            </td>
            <td>
              <code>{`(event: ${event.type}) => void`}</code>
            </td>
            <td>
              <PropDescription markdown={event.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function ComponentReference({
  componentName,
}: {
  componentName: string
}) {
  const componentInfo = componentInfos[componentName]
  if (!componentInfo) {
    throw new Error(`[ComponentReference] Component ${componentName} not found`)
  }
  return (
    <>
      <PropsTable componentInfo={componentInfo} />
      <EventsTable componentInfo={componentInfo} />
    </>
  )
}
