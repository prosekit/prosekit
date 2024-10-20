import type { Uploader } from 'prosekit/extensions/file'

/**
 * Uploads the given file to https://tmpfiles.org/ and returns the URL of the
 * uploaded file.
 *
 * This function is only for demonstration purposes. All uploaded files will be
 * deleted after 1 hour.
 */
export const tmpfilesUploader: Uploader<string> = ({
  file,
  onProgress,
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('file', file)

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress({
          loaded: Math.round(event.loaded * 0.99),
          total: event.total,
        })
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const json = JSON.parse(xhr.responseText)
          const url: string = json.data.url

          // Simulate a larger delay
          setTimeout(() => {
            resolve(url.replace('tmpfiles.org/', 'tmpfiles.org/dl/'))
          }, 1500)
        } catch (error) {
          reject(new Error('Failed to parse response', { cause: error }))
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`))
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'))
    })

    xhr.open('POST', 'https://tmpfiles.org/api/v1/upload', true)
    xhr.send(formData)
  })
}
