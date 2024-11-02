import React from 'react'
import { MenuLinkItem } from '../MenuLinkItem'
import { ActionTableRow } from './presenter'
import { ActionElements } from './types'
import { user } from '../../../Reducks/member/types'


interface TestActionTableRowContainerProps {
  titleHeader: string[]
  item: user
  actionElements: ActionElements
}

export const TestActionTableRowContainer = (props: TestActionTableRowContainerProps) => {
  return (
    <ActionTableRow
      titleHeader={props.titleHeader}
      targetLinks={[]}
      item={props.item}
      actionElements={props.actionElements}
      InCludeComponent={MenuLinkItem}
      linkPath="member"
    />
  )
}
