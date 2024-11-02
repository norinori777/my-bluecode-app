import { useEffect } from "react"
import { user } from "../../../Reducks/member/types"
import { MultiTables } from "./presenter"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../Reducks/store"
import { fetchMemberItemsAsync } from "../../../Reducks/member/slices"
import { loadingState, errorState, divideMemberToPosition } from "../../../Reducks/member"

const titles = [
    "id",
    "name",
    "email",
    "position",
]

export const MultiTablesContainer = () => {
    const nowMember = useSelector(divideMemberToPosition);
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchMemberItemsAsync())
    },[dispatch])

    return (
        <div className="flex-row">
            <MultiTables<user>
                items={nowMember}
                tableHeaderTitles={titles}
            />
        </div>
    )
}