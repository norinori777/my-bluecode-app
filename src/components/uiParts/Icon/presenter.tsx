import React from 'react'

interface IconProps<T> {
    target: T
    action: (target: T) => void
    icon: React.ElementType
    ariaLabel?: string
    theme: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'normal' | 'white' | 'black'
}

export const Icon = <T,>(props: IconProps<T>) => {
  const handleClick = () => {
    props.action(props.target)
  }
  return (
    <div onClick={handleClick} className="cursor-pointer" role="button" aria-label={props.ariaLabel}>
      <props.icon theme={props.theme} />
    </div>
  )
}
