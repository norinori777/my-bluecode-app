import React from 'react'

interface testProps {
  test: string
}

export const Test = (props: testProps) => {
  return(
    <>
      <p>{props.test}</p>
    </>
  )
}
