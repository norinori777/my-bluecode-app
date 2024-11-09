import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TextMessage } from '../TextMessage'

export interface RouterLinkItemProps {
  text: string
  link: string
  select: (text: string) => void
  underline: boolean
  theme: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'normal' | 'white' | 'black'
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export const RouterLinkItem = (props: RouterLinkItemProps) => {
  const handleClick = () => props.select(props.text)
  const location = useLocation()

  return (
    <>
      <Link data-testid="linkItem" onClick={handleClick} className="font-medium" to={props.link} 
        state={{previousLocationPath: location.pathname, nextLocationPath: props.link}}>
        <TextMessage
          theme={props.theme}
          text={props.text}
          size={props.size}
          underline={props.underline}
        />
      </Link>
    </>
  )
}
