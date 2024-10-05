import React from 'react'
import { todo } from '../../../Reducks/todo/types'
import { ActionTable } from './presernter'
import { TodoActionTableRowContainer } from '../ActionTableRow/TodoActionTableRowContainer'
import { TodoEditableTableActionContainer } from '../../uniqueParts/EditableTableAction'
import { TodoCheckBoxTableActionContainer } from '../../uniqueParts/CheckTableAction'

interface UsersActionTableContainerProps {
  titleHeader: string[]
  items: todo[] | null
}

const actionElenments = [{position: 2, element: TodoEditableTableActionContainer, headerTitle: "Mod/Del"}, {position: 2, element: TodoCheckBoxTableActionContainer, headerTitle: "State"}]

export const TodoActionTableContainer = (props: UsersActionTableContainerProps) => {
  return (
    <ActionTable<todo>
      titleHeader={props.titleHeader}
      items={props.items}
      actionRow={TodoActionTableRowContainer}
      actionElements={actionElenments}
    />
  )
}
