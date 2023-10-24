import { Popover } from 'prosekit/vue/popover'
import { computed, defineComponent, ref } from 'vue'

import { useExampleEditor } from './use-example-editor'

export const ImageUploadPopover = defineComponent({
  name: 'ImageUploadPopover',
  props: {
    open: Boolean,
    onClose: Function,
  },
  setup(props, { slots }) {
    const anchorElement = ref(null)
    const webUrl = ref('')
    const objectUrl = ref('')
    const url = computed(() => webUrl.value || objectUrl.value)
    const editor = useExampleEditor()

    const handleFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0]

      if (file) {
        objectUrl.value = URL.createObjectURL(file)
        webUrl.value = ''
      } else {
        objectUrl.value = ''
      }
    }

    const handleWebUrlChange = (event: Event) => {
      const url = (event.target as HTMLInputElement)?.value

      if (url) {
        webUrl.value = url
        objectUrl.value = ''
      } else {
        webUrl.value = ''
      }
    }

    const handleClose = () => {
      webUrl.value = ''
      objectUrl.value = ''
      props.onClose?.()
    }

    const handleSubmit = () => {
      editor.commands.insertImage({ src: url.value })
      setTimeout(handleClose, 100)
    }

    return () => (
      <>
        <div ref={anchorElement}>{slots.default?.()}</div>
        <Popover
          reference={anchorElement.value ?? undefined}
          active={props.open}
        >
          <div class="IMAGE_UPLOAD_CARD">
            <div>Select a local image file or enter a web image URL.</div>
            {!objectUrl.value && (
              <div>
                <label>Web Image URL</label>
                <input
                  class="IMAGE_UPLOAD_INPUT"
                  placeholder="https://placehold.co/128"
                  type="url"
                  onInput={handleWebUrlChange}
                />
              </div>
            )}
            {!webUrl.value && (
              <div>
                <label>Local Image</label>
                <input
                  class="IMAGE_UPLOAD_INPUT"
                  accept="image/*"
                  type="file"
                  onInput={handleFileChange}
                />
              </div>
            )}
            <button
              class="IMAGE_UPLOAD_BUTTON"
              disabled={!url.value}
              onClick={handleSubmit}
            >
              Upload Image
            </button>
          </div>
        </Popover>
      </>
    )
  },
})
