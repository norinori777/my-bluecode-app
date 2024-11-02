import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../Reducks/store"
import { EditableTableAction } from "./presenter"
import { useNavigate } from "react-router-dom"
import { user } from "../../../Reducks/member/types"
import { deleteMember } from "../../../Reducks/member/slices"

interface TestTableActionContainerProps {
    target: user
}

export const TestEditableTableActionContainer = (props: TestTableActionContainerProps) => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()


    const handleEdit = () => {
        navigate(`/member/${props.target.id}`)
    }

    const handleDelete = () => {
        dispatch(deleteMember(props.target.id))
    }
    return (
        <>
            <EditableTableAction<user> target={props.target} handleDelete={handleDelete} handleEdit={handleEdit} />
        </>
    )
}