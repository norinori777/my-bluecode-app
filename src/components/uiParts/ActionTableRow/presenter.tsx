import React from 'react'
import { ActionElements } from './types'

interface ActionRowProps<T extends { [key in string]: string | boolean | number }> {
  titleHeader: string[]
  targetLinks: string[]
  item: T
  actionElements: ActionElements
  InCludeComponent: React.ElementType
  linkPath: string
}

export const ActionTableRow = <T extends { [key in string]: string | boolean | number }>(
  props: ActionRowProps<T>
) => {
  const targetLinks = (targetLink: string) => {
    return props.targetLinks.includes(targetLink) ? (
      <props.InCludeComponent
        text={props.item[targetLink]}
        link={'/' + props.linkPath + '/' + props.item['id']}
      />
    ) : (
      props.item[targetLink]
    )
  }

  const getActionElement = (nowPostion: number, actionElements: ActionElements, item:T) => {
    return actionElements
      .filter(actionElement => actionElement.position === nowPostion)
      .map((actionElement) => (
        <td className="whitespace-nowrap px-6 py-4 font-medium">
          <actionElement.element target={item} />
        </td>
      ))
  }
  

  let count = 0
  return (
    <tr className="border-b dark:border-neutral-500">
      {props.titleHeader.map((element) => {
        count++
        return (
          <>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{targetLinks(element)}</td>
            {getActionElement(count, props.actionElements, props.item)}
          </>
        )
      })}
    </tr>
  )
}
