import { useEffect, useState } from "react"
import { MemberList } from "./presenter"
import { useDispatch, useSelector } from "react-redux"
import { fetchMemberItemsAsync, partialReset, reset, updateSearchText, updateStartDate, updateEndDate } from "../../../Reducks/member/slices"
import { AppDispatch } from "../../../Reducks/store"
import { errorState, loadingState, memberItems, searchTextState, startDateState, endDateState } from "../../../Reducks/member"
import { SearchMemberForm } from "./components/SearchMemberForm/presetner"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"

export const MemberListContainer = () => {
    const nowMember = useSelector(memberItems)
    const searchText = useSelector(searchTextState)
    const startDate = useSelector(startDateState)
    const endDate = useSelector(endDateState)
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

    const handleSearch = (searchText:string, startDate: Date, endDate: Date) => {
        dispatch(updateSearchText(searchText))
        dispatch(updateStartDate(startDate))
        dispatch(updateEndDate(endDate))
    }

    useEffect(() => {
        dispatch(fetchMemberItemsAsync())
    },[dispatch])
        
    return (
        <>
            <div className="p-6">
                <SearchMemberForm searchText={searchText} startDate={startDate} endDate={endDate} onValid={handleSearch} onInvalid={()=>{}} />
            </div>
            <MemberList memberList={nowMember} loading={loading} error={error}  />
        </>
    )
}