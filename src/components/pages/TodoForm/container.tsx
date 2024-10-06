import { useDispatch, useSelector } from "react-redux"
import { TodoForm } from "./presenter"
import { errorState, loadingState, todoItem } from "../../../Reducks/todo/selectors"
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch } from "../../../Reducks/store"
import { deleteTodoAsync, updateTodoAsync } from "../../../Reducks/todo/slices"
import { todo } from "../../../Reducks/todo/types"


export const TodoFormContainer = () => {
    const params = useParams()
    const todoId = Number(params.id)
    const nowTodo = useSelector(todoItem(todoId))
    const loading = useSelector(loadingState)
    const error = useSelector(errorState)
    const dispatch: AppDispatch = useDispatch()
    const naviagte = useNavigate()

    const handleUpdateTodo = (todo: todo) => {
        dispatch(updateTodoAsync(todo))
        naviagte('/todo',{replace: true})
    }

    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <TodoForm todo={nowTodo} loading={loading} error={error} handleSubmit={handleUpdateTodo} handleError={handleDeleteTodo} />
    )
}
