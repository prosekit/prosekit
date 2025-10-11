import type { SolidMarkViewProps } from 'prosekit/solid'
import {
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'

const colors = [
  '#f06292',
  '#ba68c8',
  '#9575cd',
  '#7986cb',
  '#64b5f6',
  '#4fc3f7',
  '#4dd0e1',
  '#4db6ac',
  '#81c784',
  '#aed581',
  '#ffb74d',
  '#ffa726',
  '#ff8a65',
  '#d4e157',
  '#ffd54f',
  '#ffecb3',
]

function pickRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function Link(props: SolidMarkViewProps) {
  const [color, setColor] = createSignal(colors[0])
  const href = () => props.mark.attrs.href as string

  onMount(() => {
    const interval = setInterval(() => {
      setColor(pickRandomColor())
    }, 1000)
    onCleanup(() => clearInterval(interval))
  })

  return (
    <a
      href={href()}
      ref={props.contentRef}
      style={{ color: color(), transition: 'color 1s ease-in-out' }}
    >
    </a>
  )
}
