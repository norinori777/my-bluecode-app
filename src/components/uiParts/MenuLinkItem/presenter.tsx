import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MenuLinkItemProps {
  text: string
  link: string
}

export const MenuLinkItem = (props: MenuLinkItemProps) => {
  const location = useLocation()
  return (
    <>
      <Link data-testid="linkItem" className="font-medium" to={props.link}
        state={{previousLocationPath: location.pathname, nextLocationPath: props.link}}>
        {props.text}
      </Link>
    </>
  )
}
