import React from 'react'
import { ActionElements } from '../ActionTableDandDRow/types'

interface ActionTableProps<T extends { [key in string]: string | boolean | number }> {
  titleHeader: string[]
  items: T[] | null
  actionRow: React.ElementType
  actionElements: ActionElements
}

export const ActionTable = <T extends { [key in string]: string | boolean | number }>(
  props: ActionTableProps<T>
) => {
  const getActionTtitleHeader = (nowCount: number, headerTitle: string, actionElements: ActionElements) => {
    return actionElements
      .filter(actionElement => nowCount === actionElement.position)
      .map((actionElement) => (
        <th scope="col" className="px-6 py-4">
          {actionElement.headerTitle}
        </th>
      ))
  }

  let count = 0
  return props.items === null ? (
    <p>{'データがありません。'}</p>
  ) : (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {props.titleHeader.map((title) => {
                    count++
                    return (
                      <>
                        <th scope="col" className="px-6 py-4">
                          {title}
                        </th>
                        {getActionTtitleHeader(count, title, props.actionElements)}
                      </>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {props.items?.map((item) => {
                  return (
                    <props.actionRow
                      titleHeader={props.titleHeader}
                      item={item}
                      actionElements={props.actionElements}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
