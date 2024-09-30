import React from 'react'
import { TextMessage } from '../TextMessage'

interface LinkItemProps {
  text: string
  onClick: () => void
  underline: boolean
  theme: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'normal' | 'white' | 'black'
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export const LinkItem = (props: LinkItemProps) => {
  const handleClick = () => {
    props.onClick()
  }

  return (
    <>
      <div className="cursor-pointer" onClick={handleClick}>
        <TextMessage
          theme={props.theme}
          text={props.text}
          size={props.size}
          underline={props.underline}
        />
      </div>
    </>
  )
}
