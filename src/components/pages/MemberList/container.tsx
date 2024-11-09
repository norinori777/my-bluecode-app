import { useEffect, useState } from "react"
import { MemberList } from "./presenter"
import { useDispatch, useSelector } from "react-redux"
import { fetchMemberItemsAsync, partialReset, reset, updateSearchText } from "../../../Reducks/member/slices"
import { AppDispatch } from "../../../Reducks/store"
import { errorState, loadingState, memberItems, searchTextState } from "../../../Reducks/member"
import { SearchMemberForm } from "./components/SearchMemberForm/presetner"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"

export const MemberListContainer = () => {
    const nowMember = useSelector(memberItems)
    const searchText = useSelector(searchTextState)
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()
    const partialResetPath = ['/member/add']
    const location = useLocation()
    const [isReady, setRady] = useState(false)
    
    if(!isReady) {
        const previousLocationPath = location.state?.previousLocationPath
        partialResetPath.includes(previousLocationPath) ? dispatch(partialReset()) : dispatch(reset())
        setRady(true)
    }

    const handleSearch = (searchText:string) => {
        dispatch(updateSearchText(searchText))
    }

    useEffect(() => {
        dispatch(fetchMemberItemsAsync())
    },[dispatch])
        
    return (
        <>
            <SearchMemberForm searchText={searchText} onValid={handleSearch} onInvalid={()=>{}} />
            <MemberList memberList={nowMember} loading={loading} error={error}  />
        </>
    )
}