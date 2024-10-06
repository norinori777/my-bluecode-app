import React from 'react'
import { todo } from '../../../Reducks/todo/types'
import { MenuLinkItem } from '../MenuLinkItem'
import { ActionTableRow } from './presenter'
import { ActionElements } from './types'


interface TodoActionTableRowContainerProps {
  titleHeader: string[]
  item: todo
  actionElements: ActionElements
}

export const TodoActionTableRowContainer = (props: TodoActionTableRowContainerProps) => {
  return (
    <ActionTableRow
      titleHeader={props.titleHeader}
      targetLinks={[]}
      item={props.item}
      actionElements={props.actionElements}
      InCludeComponent={MenuLinkItem}
      linkPath="todo"
    />
  )
}
