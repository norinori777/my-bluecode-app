import React from 'react'
import { getTextTheme } from '../../../utils/theme/theme'
import { theme } from '../../../utils/theme/types'

export interface HeaderTitleProps {
  icon: React.ElementType
  title: string
  theme: theme
}

export const HeaderTitle = (props: HeaderTitleProps) => {
  const Icon = props.icon
  const themeStyle = getTextTheme(props.theme)
  return (
    <div className={`flex flex-row items-center gap-2 pt-3 pl-3 pb-3 border-r-2 border-slat-50`}>
      <Icon theme={props.theme} />
      <p data-testid="headerTitle" className={`text-3xl ${themeStyle}`}>
        {props.title}
      </p>
    </div>
  )
}
