import React from 'react'
import { ActionTableDandD } from './presernter'


import { user } from '../../../Reducks/member/types'
import { Bars } from '../../../components/icons/bars'
import { ActionTableDandDRow } from '../ActionTableDandDRow'
import { UserCheckBoxTableActionContainer } from '../../../components/uniqueParts/CheckTableAction/UserCheckBoxTableActionContainer'

interface MemberActionTableContainerProps {
  titleHeader: string[]
  items: user[] | null
  updateItems: (items: user[]) => void
}

const actionElenments = [{position: 4, element: UserCheckBoxTableActionContainer, headerTitle: "Check"}]
const dragAndDropColumn = {position: 1, element: Bars, headerTitle: "D and D"}  

export const MemberActionTableContainer = (props: MemberActionTableContainerProps) => {
  return (
    <ActionTableDandD<user>
      titleHeader={props.titleHeader}
      items={props.items}
      actionRow={ActionTableDandDRow}
      actionElements={actionElenments}
      dragAndDropColumn={dragAndDropColumn}
      updateItems={props.updateItems}
    />
  )
}
