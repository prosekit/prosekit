<script lang="ts">
import type {
  SelectListEvents,
  SelectListProps,
} from '@aria-ui/select'

type Events = {
  [K in keyof SelectListEvents as `on${K}`]: (event: SelectListEvents[K]) => void
}

interface Props extends Partial<SelectListProps>, Partial<Events> {}

const props: Props = $props()
</script>

<aria-ui-select-list class="outline-none flex flex-col gap-.5" {...props}>
  <slot />
</aria-ui-select-list>
