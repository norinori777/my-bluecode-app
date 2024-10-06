import React, { ChangeEvent, CompositionEvent, useState } from 'react'
import { theme } from '../../../utils/theme/types'
import { getFocusPlaceholderTheme, getFocusRingTheme, getFocusTextTheme, getTextTheme } from '../../../utils/theme/theme'

interface TextFieldProps<T> {
  label: string
  placeholder: string
  description: string
  theme: theme
  value: string
  register: T
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDoubleByteChange?: (e: CompositionEvent<HTMLInputElement>) => void
}

export const TextField = <T,>(props: TextFieldProps<T>) => {
  const [inputFocus, setInputFocus] = useState(false)

  const textTheme = inputFocus == true ? getTextTheme(props.theme) : 'text-gray-500'
  const focusTextTheme = getFocusTextTheme(props.theme)
  const focusRingTheme = getFocusRingTheme(props.theme)
  const focusPlaceholderTheme = getFocusPlaceholderTheme(props.theme)

  const onFocusHandle = () => {
    setInputFocus(true)
  }

  const onBlurHandle = () => {
    setInputFocus(false)
  }

  return (
    <div className="mb-6">
      <label htmlFor="success" className={`block mb-2 text-sm font-medium  ${textTheme}`}>
        {props.label}
      </label>
      <input
        // type="text"
        // id="success"
        // value={props.value}
        className={`${focusRingTheme} ring-gray-300 ring-2 focus:ring-2 focus:outline-none ${focusTextTheme} placeholder-gray-300 ${focusPlaceholderTheme} text-sm rounded-lg block w-full p-2.5`}
        placeholder={props.placeholder}
        onFocus={onFocusHandle}
        onBlur={onBlurHandle}
        // onChange={props.handleChange}
        // onCompositionEnd={props.handleDoubleByteChange}
        {...props.register}
      />
      <p className={`mt-2 text-sm ${textTheme}`}>{props.description}</p>
    </div>
  )
}
