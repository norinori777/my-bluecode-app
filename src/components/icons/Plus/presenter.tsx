import React from 'react'
import { getTextTheme } from '../../../utils/theme/theme'
import { theme } from '../../../utils/theme/types'


interface PlusProps {
  theme: theme
}

export const Plus = (props: PlusProps) => {
  const theme = getTextTheme(props.theme)
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className={`w-6 h-6 fill-current ${theme}`}
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </>
  )
}
