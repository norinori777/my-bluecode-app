import { useEffect } from "react"
import { PaginationTable } from "./presenter"
import { useDispatch, useSelector } from "react-redux"
import { fetchMemberItemsAsync } from "../../../Reducks/member/slices"
import { AppDispatch } from "../../../Reducks/store"
import { errorState, loadingState, memberItems } from "../../../Reducks/member"

export const PaginationTableContainer = () => {
    const nowMember = useSelector(memberItems)
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMemberItemsAsync())
    },[dispatch])
        
    return (
        <>
            <PaginationTable memberList={nowMember} loading={loading} error={error}  />
        </>
    )
}