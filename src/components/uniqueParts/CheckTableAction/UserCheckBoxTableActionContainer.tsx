import { useDispatch } from "react-redux"
import { updateDoneTodoAsync } from "../../../Reducks/todo/slices"
import { user } from "../../../Reducks/member/types"
import { CheckBoxTableAction } from "./presenter"
import { AppDispatch } from "../../../Reducks/store"

interface UserCheckBoxTableActionContainerProps {
    target: user
}

export const UserCheckBoxTableActionContainer = (props: UserCheckBoxTableActionContainerProps) => {
    const dispatch: AppDispatch = useDispatch()

    const handleCheck = () => {
    }

    return (
        <>
            <CheckBoxTableAction check={true} handleCheck={handleCheck} /> 
        </>
    )

}