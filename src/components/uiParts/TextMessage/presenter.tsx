import React from 'react'
import { getTextDarkTheme } from '../../../utils/theme/theme'

interface TextMessageProps {
  text: string
  theme: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'normal' | 'white' | 'black'
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  underline?: boolean
}

export const TextMessage = (props: TextMessageProps) => {
  const underline = props.underline ? 'underline' : ''
  const textSize = 'text-' + props.size
  const textTheme = getTextDarkTheme(props.theme)

  return (
    <>
      <p className={`${textSize} ${textTheme} ${underline}`}>{props.text}</p>
    </>
  )
}
