import React from 'react'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
    previousLabel?: string
    nextLabel?: string
    breakLabel?: string
    previousClassName?: string
    previousLinkClassName?: string
    nextClassName?: string
    nextLinkClassName?: string
    pageClassName?: string
    pageLinkClassName?: string
    breakClassName?: string
    breakLinkClassName?: string
    activeClassName?: string
    activeLinkClassName?: string
    pageCount: number   
    marginPagesDisplayed?: number
    pageRangeDisplayed?: number
    onPageChange: (selectedItem: { selected: number }) => void
    containerClassName?: string
}

export const Pagination = (props: PaginationProps) => {
    return (
        <ReactPaginate
            previousLabel={props.previousLabel}
            nextLabel={props.nextLabel}
            breakLabel={props.breakLabel}
            pageCount={props.pageCount}
            previousClassName={props.previousClassName}
            previousLinkClassName={props.previousLinkClassName}
            nextClassName={props.nextClassName}
            nextLinkClassName={props.nextLinkClassName}
            pageClassName={props.pageClassName}
            pageLinkClassName={props.pageLinkClassName}
            breakLinkClassName={props.breakClassName}
            activeClassName={props.activeClassName}
            activeLinkClassName={props.activeLinkClassName}
            marginPagesDisplayed={props.marginPagesDisplayed}
            pageRangeDisplayed={props.pageRangeDisplayed}
            onPageChange={props.onPageChange}
            containerClassName={props.containerClassName}
        />
    )
}