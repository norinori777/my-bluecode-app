import React from 'react'

interface ActionTableProps<T extends { [key in string]: string | boolean | number }> {
  titleHeader: string[]
  items: T[] | null
  actionRow: React.ElementType
  actionColumn: number
}

export const ActionTable = <T extends { [key in string]: string | boolean | number }>(
  props: ActionTableProps<T>
) => {
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
                    return count === props.actionColumn ? (
                      <>
                        <th scope="col" className="px-6 py-4">
                          {title}
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {'Action'}
                        </th>
                      </>
                    ) : (
                      <th scope="col" className="px-6 py-4">
                        {title}
                      </th>
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
                      actionColumn={props.actionColumn}
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
