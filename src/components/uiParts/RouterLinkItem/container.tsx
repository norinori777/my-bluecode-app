import React from 'react'
import { RouterLinkItem } from './presenter'
import { useDispatch } from 'react-redux'
import { selectMenuItem } from '../../../Reducks/menu/slices'

interface RouterLinkItemProps {
  text: string
  link: string
}

export const RouterLinkItemContainer = (props: RouterLinkItemProps) => {
    const dispatch = useDispatch()
  const setSelectOne = (selected: string) => dispatch(selectMenuItem(selected))
  return (
    <>
      <RouterLinkItem
        text={props.text}
        link={props.link}
        select={setSelectOne}
        underline={false}
        theme={'black'}
        size={'base'}
      />
    </>
  )
}
