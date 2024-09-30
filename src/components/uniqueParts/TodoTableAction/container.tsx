import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../Reducks/store"
import { todo } from "../../../Reducks/todo/types"
import { deleteTodoAsync, updateDoneTodoAsync } from "../../../Reducks/todo/slices"
import { TableAction } from "./presenter"

interface TodoTableActionContainerProps {
    target: todo
}

export const TableActionContainer = (props: TodoTableActionContainerProps) => {
    const dispatch: AppDispatch = useDispatch()


    const handleEdit = (target: todo) => {
        dispatch(updateDoneTodoAsync(target.id))
    }

    const handleDelete = (target: todo) => {
        dispatch(deleteTodoAsync(target.id))
    }
    return (
        <>
            <TableAction<todo> target={props.target} handleDelete={handleDelete} handleEdit={handleEdit} />
        </>
    )
}