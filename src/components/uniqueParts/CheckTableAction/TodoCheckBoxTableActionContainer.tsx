import { useDispatch } from "react-redux"
import { updateDoneTodoAsync } from "../../../Reducks/todo/slices"
import { todo } from "../../../Reducks/todo/types"
import { CheckBoxTableAction } from "./presenter"
import { AppDispatch } from "../../../Reducks/store"

interface TodoCheckBoxTableActionContainerProps {
    target: todo
}

export const TodoCheckBoxTableActionContainer = (props: TodoCheckBoxTableActionContainerProps) => {
    const dispatch: AppDispatch = useDispatch()

    const handleCheck = () => {
        dispatch(updateDoneTodoAsync(props.target.id))
    }

    return (
        <>
            <CheckBoxTableAction check={props.target.done} handleCheck={handleCheck} /> 
        </>
    )

}