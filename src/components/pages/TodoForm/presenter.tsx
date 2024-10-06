import { todo } from "../../../Reducks/todo/types"
import { BasicButton } from "../../uiParts/BasicButton"
import { TextField } from "../../uiParts/TextField"
import { TextMessage } from "../../uiParts/TextMessage"
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./validator"

interface TodoFormProps {
    todo?: todo | null
    loading: boolean
    error: string | null
    handleSubmit: (todo: todo) => void
    handleError: (id: number) => void
}

export const TodoForm = (props: TodoFormProps) => {
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            defaultValues: { todo: props.todo?.text || '' },
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = (data: {todo: string}) => {
        props.handleSubmit({id: props.todo?.id || 0, text: data.todo, done: false})
    }
    const onSubmitError = (error: any) => {
        console.log(error)
    }

    const textRegister = register('todo')

    return (
        <div className="p-6">
            <TextMessage text="Create/Modiry Todo Page" size="2xl" theme="primary" underline={true} />
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <TextMessage text="This is a simple todo create/modify page." size="base" theme="normal" />
                <form onSubmit={handleSubmit(onSubmit, onSubmitError)} noValidate>
                    <div className="flex flex-row p-2 gap-1">
                        <TextField<UseFormRegisterReturn<"todo">> label="Todo" value={props.todo?.text || ""} placeholder="Please input task." theme="primary" description="" register={textRegister} />
                        <div>{errors.todo?.message}</div>
                        <div className="mt-8 mb-8">
                            <BasicButton label="Create" type="submit" theme="primary" />
                        </div>
                    </div>
                </form>
            </div>}
        </div>
    )
}