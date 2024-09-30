import React from 'react'
import { Link } from 'react-router-dom'

interface MenuLinkItemProps {
  text: string
  link: string
}

export const MenuLinkItem = (props: MenuLinkItemProps) => {
  return (
    <>
      <Link data-testid="linkItem" className="font-medium" to={props.link}>
        {props.text}
      </Link>
    </>
  )
}
