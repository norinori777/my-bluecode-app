import { PaginationContainer } from "../../uiParts/Pagination"
import { BasicTable } from "../../uiParts/BasicTable"
import React, { useState } from "react"

interface TableWithPaginationProps<T extends { [key in string]: string | boolean | number }> {
    titleHeader: string[]
    items: T[] | null
    itemPerPage: number
}

export const TableWithPagination = <T extends { [key in string]: string | boolean | number }>(props: TableWithPaginationProps<T>) => {
    //　URLのQueryから参照ページを取得する場合は、外部から取得する必要あり。
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = props.itemPerPage || 5

    const offsert = currentPage * itemPerPage
    const currentPageData = props.items?.slice(offsert, offsert + itemPerPage) || null

    const handlePageClick = (data: {selected: number}) => {
        setCurrentPage(data.selected)
    }

    return(
        <section className='flex flex-col gap-2'>
            <BasicTable 
                titleHeader={props.titleHeader} 
                items={currentPageData}
            />
            <PaginationContainer 
                pageCount={props.items ? Math.ceil(props.items.length / itemPerPage) : 0}
                handlePageChange={handlePageClick}
            />
        </ section>
    )
}
