import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ActionElements, DragAndDropColumn } from './types'


interface ActionDandDRowProps<T extends { [key in string]: string | boolean | number }> {
  titleHeader: string[]
  targetLinks: string[]
  item: T
  actionElements: ActionElements
  InCludeComponent: React.ElementType
  linkPath: string
  hoverIndex: number
  moveRow: (dragIndex: number, hoverIndex: number) => void
  dropRow: (dragIndex: number, hoverIndex: number) => void
  dragAndDropColumn: DragAndDropColumn
}

export const ActionTableDandDRow = <T extends { [key in string]: string | boolean | number }>(
  props: ActionDandDRowProps<T>
) => {
  const ref = useRef<HTMLTableRowElement>(null);
  
    // ドロップ可能なターゲットを定義。テーブルの行が他の行の上にドロップされたときに呼び出される
    const [, drop] = useDrop({
      accept: 'row',
      hover(item: { index: number }, monitor: DropTargetMonitor<{ index: number }>) {
          if (!ref.current) {
              return;
          }
          const dragIndex = item.index;
          const hoverIndex = props.hoverIndex;

          if (dragIndex === hoverIndex) {
              return;
          }

          // ドロップ先の要素の矩形を取得
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          // ドロップ先の要素の中央のY座標を取得
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // ドラッグされた要素のY座標を取得(monitorは、ドラッグ中の要素に関する情報を提供)
          const clientOffset = monitor.getClientOffset();
          // ドラッグされた要素のY座標からドロップ先の要素の上端までの距離を引いて、ドロップ先の要素の中央のY座標を取得
          const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

          // ドラッグされた要素がドロップ先の上半分にある場合は何もしない
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
          }
          // ドラッグされた要素がドロップ先の下半分にある場合は何もしない
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
          }

          // ドロップ先の要素の上半分にある場合は、ドロップ先の上に移動
          props.moveRow(dragIndex, hoverIndex);
          item.index = hoverIndex;
      },
      // ドロップされたときに呼び出される
      drop(item: { index: number }, monitor: DropTargetMonitor<{ index: number }>) {
          const dragIndex = item.index
          const hoverIndex = props.hoverIndex
          // ドロップされたときにドラッグされた要素の位置とドロップ先の位置を渡して、行を移動
          // 移動後のイベントを発火（ここ）
          props.dropRow(dragIndex, hoverIndex)
      }
  })

  // ドラッグ可能な要素を定義。ドラッグされたときに呼び出され
    const [{ isDragging }, drag] = useDrag({
      type: 'row',
      // ドラッグされた要素に関する情報を提供
      item: { index: props.hoverIndex },
      // ドラッグ中の要素に関する情報を提供
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
  });

  drag(drop(ref));

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

  const getDragAndDropColumn = (nowPosition: number, dragAndDropColumn: DragAndDropColumn) => {
    return(
      dragAndDropColumn.position === nowPosition && (
        <td
          className="whitespace-nowrap px-6 py-4 font-medium"
          ref={drag}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <dragAndDropColumn.element theme="primary" />
        </td>
      )
    )
  }
  

  let count = 0
  return (
    <tr className="border-b dark:border-neutral-500" ref={ref}>
      {props.titleHeader.map((element) => {
        count++
        return (
          <>
            {getDragAndDropColumn(count, props.dragAndDropColumn)}
            <td className="whitespace-nowrap px-6 py-4 font-medium">{targetLinks(element)}</td>
            {getActionElement(count, props.actionElements, props.item)}
          </>
        )
      })}
    </tr>
  )
}
