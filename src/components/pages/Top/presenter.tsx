import React from 'react'
import { XCircle } from '../../icons/XCircle'

export const Top = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => {
    setShow(!show)
  }

  const hoge = 'hoge<br>hoge<br>hoge<br>hogehogehoge'
  return(
    <div className="p-5">
      <p>TOP</p>
    </div>
  ) 

}
