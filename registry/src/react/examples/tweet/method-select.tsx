import { useId } from 'react'

export function MethodSelect(props: {
  value: 'iframe' | 'react'
  onChange: (value: 'iframe' | 'react') => void
}) {
  const id = useId()
  const iframeId = `${id}-iframe`
  const reactId = `${id}-react`

  return (
    <fieldset className="not-content">
      <legend>Select a render method:</legend>

      <div>
        <input
          type="radio"
          id={iframeId}
          name={id}
          value="iframe"
          checked={props.value === 'iframe'}
          onChange={() => props.onChange('iframe')}
        />
        <label htmlFor={iframeId}>iframe</label>
      </div>

      <div>
        <input
          type="radio"
          id={reactId}
          name={id}
          value="react"
          checked={props.value === 'react'}
          onChange={() => props.onChange('react')}
        />
        <label htmlFor={reactId}>react-tweet</label>
      </div>
    </fieldset>
  )
}
