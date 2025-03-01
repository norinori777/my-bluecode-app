import React from 'react'
import { getTextTheme } from '../../../utils/theme/theme'
import { theme } from '../../../utils/theme/types'
interface BarsProps {
  theme: theme
}
export const Bars = (props: BarsProps) => {
  const theme = getTextTheme(props.theme)
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6 ${theme}`}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    </>
  )
}
