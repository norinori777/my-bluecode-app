import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DragAndDrop } from "./presenter"
import { AppDispatch } from "../../../Reducks/store"
import { errorState, loadingState, memberItems } from "../../../Reducks/member"
import { fetchMemberItemsAsync, updateMember } from "../../../Reducks/member/slices"
import { user } from "../../../Reducks/member/types"

export const DragAndDropContainer = () => {
    const nowMember = useSelector(memberItems)
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchMemberItemsAsync())
    },[dispatch])

    const handleUpdateItems = (items: user[]) => {
        dispatch(updateMember(items))
    }


    return (
        <>
            <DragAndDrop users={nowMember} loading={loading} error={error} updateUsers={handleUpdateItems}  />
        </>
    )
} 