import { useId } from 'react'

export function MethodSelect(props: {
  value: 'basic' | 'advanced'
  onChange: (value: 'basic' | 'advanced') => void
}) {
  const id = useId()
  const basicId = `${id}-basic`
  const advancedId = `${id}-advanced`

  return (
    <fieldset className="not-content">
      <legend>Select a render method:</legend>

      <div>
        <input
          type="radio"
          id={basicId}
          name={id}
          value="basic"
          checked={props.value === 'basic'}
          onChange={() => props.onChange('basic')}
        />
        <label htmlFor={basicId}>basic</label>
      </div>

      <div>
        <input
          type="radio"
          id={advancedId}
          name={id}
          value="advanced"
          checked={props.value === 'advanced'}
          onChange={() => props.onChange('advanced')}
        />
        <label htmlFor={advancedId}>advanced</label>
      </div>
    </fieldset>
  )
}
