import React from 'react'

interface ActionRowProps<T extends { [key in string]: string | boolean | number }> {
  titleHeader: string[]
  targetLinks: string[]
  item: T
  actionColumn: number
  actionElement: React.ElementType
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

  let count = 0
  return (
    <tr className="border-b dark:border-neutral-500">
      {props.titleHeader.map((element) => {
        count++
        return count === props.actionColumn ? (
          <>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{targetLinks(element)}</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">
              <props.actionElement item={props.item} />
            </td>
          </>
        ) : (
          <td className="whitespace-nowrap px-6 py-4 font-medium">{targetLinks(element)}</td>
        )
      })}
    </tr>
  )
}
