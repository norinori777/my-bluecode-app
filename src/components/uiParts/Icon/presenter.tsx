import React from 'react'

interface IconProps<T> {
    target: T
    action: (target: T) => void
    icon: React.ElementType
    theme: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'normal' | 'white' | 'black'
}

export const Icon = <T,>(props: IconProps<T>) => {
  const handleClick = () => {
    props.action(props.target)
  }
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <props.icon theme={props.theme} />
    </div>
  )
}
