import React from 'react'
import { todo } from '../../../Reducks/todo/types'
import { ActionTable } from './presernter'
import { TodoActionTableRowContainer } from '../ActionTableRow/container'

interface UsersActionTableContainerProps {
  titleHeader: string[]
  items: todo[] | null
  actionColumn: number
}

export const TodoActionTableContainer = (props: UsersActionTableContainerProps) => {
  return (
    <ActionTable<todo>
      titleHeader={props.titleHeader}
      items={props.items}
      actionRow={TodoActionTableRowContainer}
      actionColumn={props.actionColumn}
    />
  )
}
