import React from 'react'
import { ActionTable } from './presernter'
import { TestActionTableRowContainer } from '../ActionTableRow/TestActionTableRowContainer'
import { TestEditableTableActionContainer } from '../../uniqueParts/EditableTableAction/TestEditableTableActionContainer'
import { user } from '../../../Reducks/member/types'


interface UsersActionTableContainerProps {
  titleHeader: string[]
  items: user[] | null
}

const actionElenments = [{position: 4, element: TestEditableTableActionContainer, headerTitle: "Mod/Del"}]

export const TestActionTableContainer = (props: UsersActionTableContainerProps) => {
  return (
    <ActionTable<user>
      titleHeader={props.titleHeader}
      items={props.items}
      actionRow={TestActionTableRowContainer}
      actionElements={actionElenments}
    />
  )
}
