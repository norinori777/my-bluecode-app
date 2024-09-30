import React from 'react'
import { todo } from '../../../Reducks/todo/types'
import { TodoTableAction } from '../../uniqueParts/TodoTableAction'
import { MenuLinkItem } from '../MenuLinkItem'
import { ActionTableRow } from './presenter'


interface TodoActionTableRowContainerProps {
  titleHeader: string[]
  item: todo
  actionColumn: number
}

export const TodoActionTableRowContainer = (props: TodoActionTableRowContainerProps) => {
  return (
    <ActionTableRow
      titleHeader={props.titleHeader}
      targetLinks={[]}
      item={props.item}
      actionColumn={props.actionColumn}
      actionElement={TodoTableAction}
      InCludeComponent={MenuLinkItem}
      linkPath="todo"
    />
  )
}
