import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../Reducks/store"
import { todo } from "../../../Reducks/todo/types"
import { deleteTodoAsync, updateDoneTodoAsync } from "../../../Reducks/todo/slices"
import { EditableTableAction } from "./presenter"

interface TodoTableActionContainerProps {
    target: todo
}

export const TodoEditableTableActionContainer = (props: TodoTableActionContainerProps) => {
    const dispatch: AppDispatch = useDispatch()


    const handleEdit = () => {
        dispatch(updateDoneTodoAsync(props.target.id))
    }

    const handleDelete = () => {
        dispatch(deleteTodoAsync(props.target.id))
    }
    return (
        <>
            <EditableTableAction<todo> target={props.target} handleDelete={handleDelete} handleEdit={handleEdit} />
        </>
    )
}