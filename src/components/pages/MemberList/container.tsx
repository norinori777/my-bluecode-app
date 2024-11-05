import { useEffect } from "react"
import { MemberList } from "./presenter"
import { useDispatch, useSelector } from "react-redux"
import { fetchMemberItemsAsync, partialReset, reset, updateSearchText } from "../../../Reducks/member/slices"
import { AppDispatch } from "../../../Reducks/store"
import { errorState, loadingState, memberItems, searchTextState } from "../../../Reducks/member"
import { SearchMemberForm } from "./components/SearchMemberForm/presetner"
import { useLocation, useNavigation } from "react-router-dom"

export const MemberListContainer = () => {
    const nowMember = useSelector(memberItems)
    const searchText = useSelector(searchTextState)
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()
    const partialResetPath = ['/member/add']
    const location = useLocation()
    const navigatation = useNavigation()

    const handleSearch = (searchText:string) => {
        dispatch(updateSearchText(searchText))
    }

    useEffect(() => {
        dispatch(fetchMemberItemsAsync())
        return () => {
            partialResetPath.includes(navigatation.location?.pathname || '') ? dispatch(partialReset()) : dispatch(reset())
        }
    },[dispatch])
        
    return (
        <>
            <SearchMemberForm searchText={searchText} onValid={handleSearch} onInvalid={()=>{}} />
            <MemberList memberList={nowMember} loading={loading} error={error}  />
        </>
    )
}