import { useDispatch, useSelector } from "react-redux"
import { Todo } from "./presernter"
import { errorState, loadingState, todoItems } from "../../../Reducks/todo/selectors"
import { AppDispatch } from "../../../Reducks/store"
import { useEffect } from "react"
import { fetchTodoItemsAsync } from "../../../Reducks/todo/slices"

export const TodoContainer = () => {
    const nowTodos = useSelector(todoItems)
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTodoItemsAsync())
    },[dispatch])


    return (
        <>
            <Todo todos={nowTodos} loading={loading} error={error}  />
        </>
    )
} 