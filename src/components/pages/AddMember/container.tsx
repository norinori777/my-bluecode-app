import { useDispatch, useSelector } from "react-redux"
import { AddMember } from "./presenter"
import { AppDispatch } from "../../../Reducks/store"

import { errorState, loadingState, memberItems } from "../../../Reducks/member"
import { AddUserType } from "../../../Reducks/member/types"
import { addMemberAsync } from "../../../Reducks/member/slices"
import { useLocation, useNavigate } from "react-router-dom"


export const AddMemberContainer = () => {
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddMember = (user: AddUserType) => {
        dispatch(addMemberAsync(user))
        navigate('/member',{replace: true, state: {nextLocationPath: '/member', previousLocationPath: location.pathname}})
    }
    
    return (
        <>
            <AddMember error={null} loading={false} onValid={handleAddMember} onInvalid={()=>{}}  />
        </>
    )
}