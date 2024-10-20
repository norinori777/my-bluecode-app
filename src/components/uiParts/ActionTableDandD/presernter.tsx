import React, { useCallback } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ActionElements,DragAndDropColumn } from '../ActionTableDandDRow/types'
import { MenuLinkItem } from '../MenuLinkItem'

interface ActionTableDandDProps<T extends { [key in string]: string | boolean | number }> {
  titleHeader: string[]
  items: T[] | null
  actionRow: React.ElementType
  actionElements: ActionElements
  dragAndDropColumn: DragAndDropColumn
  updateItems: (items: T[]) => void
}

export const ActionTableDandD = <T extends { [key in string]: string | boolean | number }>(
  props: ActionTableDandDProps<T>
) => {
  // ドラッグアンドドロップで行を移動する関数
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    if(props.items === null) return
    const dragUser = props.items[dragIndex];
    const updatedUsers = [...props.items];
    updatedUsers.splice(dragIndex, 1);
    updatedUsers.splice(hoverIndex, 0, dragUser);
    props.updateItems(updatedUsers);
  }, [props.items]);

  const dropRow = useCallback((dragIndex: number, hoverIndex: number) => {
    if(props.items === null) return
    const dragUser = props.items[dragIndex];
    const updatedUsers = [...props.items];
    updatedUsers.splice(dragIndex, 1);
    updatedUsers.splice(hoverIndex, 0, dragUser);
    props.updateItems(updatedUsers);
  }, [props.items]);

  const getActionTtitleHeader = (nowCount: number, headerTitle: string, actionElements: ActionElements) => {
    return actionElements
      .filter(actionElement => nowCount === actionElement.position)
      .map((actionElement) => (
        <th scope="col" className="px-6 py-4">
          {actionElement.headerTitle}
        </th>
      ))
  }

  const getDragAndDropColumn = (nowCount: number, headerTitle: string, dragAndDropColumn: DragAndDropColumn) => { 
    if(nowCount === dragAndDropColumn.position) {
      return (
        <th scope="col" className="px-6 py-4">
          {dragAndDropColumn.headerTitle}
        </th>
      )
    }
  }

  let count = 0
  return props.items === null ? (
    <p>{'データがありません。'}</p>
  ) : (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <DndProvider backend={HTML5Backend}>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {props.titleHeader.map((title) => {
                    count++
                    return (
                      <>
                        {getDragAndDropColumn(count, title, props.dragAndDropColumn)}
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
                {props.items?.map((item, index) => {
                  return (
                    <props.actionRow
                      titleHeader={props.titleHeader}
                      targetLinks={['name']}
                      item={item}
                      linkPath='members'
                      actionElements={props.actionElements}
                      InCludeComponent={MenuLinkItem}
                      dragAndDropColumn={props.dragAndDropColumn}
                      hoverIndex={index}
                      moveRow={moveRow}
                      dropRow={dropRow}
                    />
                  )
                })}
              </tbody>
            </table>
            </DndProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
