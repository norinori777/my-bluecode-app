import {Pagination} from "./Presenter"

interface PaginationContainerProps {
    pageCount: number
    handlePageChange: (selectedItem: { selected: number }) => void
}

export const PaginationContainer = (props: PaginationContainerProps) => {
    const containerClass = 'flex list-none p-0 justify-center mt-5'
    const pageClass = 'mx-1'
    const pageLinkClass = 'px-4 py-2 border border-gray-300 text-blue-500 cursor-pointer no-underline'
    const previousClass = 'mx-1'
    const previousLinkClass = 'px-4 py-2 border border-gray-300 text-blue-500 cursor-pointer no-underline'
    const nextClass = 'mx-1'
    const nextLinkClass = 'px-4 py-2 border border-gray-300 text-blue-500 cursor-pointer no-underline'
    const breakClass = 'mx-1'
    const breakLinkClass = 'px-4 py-2 border border-gray-300 text-blue-500 cursor-pointer no-underline'
    const activeClass = 'bg-blue-500 text-white border-blue-500'
    const activeLinkClass = 'bg-blue-500 text-white border-blue-500'

    return (
        <Pagination
            pageCount={props.pageCount}
            previousLabel={'前'}
            nextLabel={'次'}
            breakLabel={'...'}
            previousClassName={previousClass}
            previousLinkClassName={previousLinkClass}
            nextClassName={nextClass}
            nextLinkClassName={nextLinkClass}
            pageClassName={pageClass}
            pageLinkClassName={pageLinkClass}
            breakClassName={breakClass}
            breakLinkClassName={breakLinkClass}
            activeClassName={activeClass}
            activeLinkClassName={activeLinkClass}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={containerClass}
            onPageChange={props.handlePageChange}
        />
    )
}