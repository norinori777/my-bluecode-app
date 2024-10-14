import React from 'react'
import { todo } from "../../../Reducks/todo/types"
import { BasicButton } from "../../uiParts/BasicButton"
import { TextField } from "../../uiParts/TextField"
import { TextMessage } from "../../uiParts/TextMessage"
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./validator"
import { Dropdown } from '../../uiParts/Dropdown/presenter'

interface TodoFormProps {
    todo?: todo | null
    loading: boolean
    error: string | null
    handleSubmit: (todo: todo) => void
    handleError: (error: any) => void
}

export const TodoForm = (props: TodoFormProps) => {
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            defaultValues: {
                todo: props.todo?.text || '' },
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = (data: {todo: string}) => {
        props.handleSubmit({id: props.todo?.id || 0, text: data.todo, done: false})
    }
    const onSubmitError = (error: any) => {
        props.handleError(error)
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
                    <div className="flex flex-row pl-2 gap-1">
                        <TextField<UseFormRegisterReturn<'todo'>> id={'todo'} label="Todo" value={props.todo?.text || ""} placeholder="TODOを入力してください。" theme="primary" description="" register={textRegister} />
                        <div className="mt-7">
                            <BasicButton label="Create" type="submit" theme="primary" />
                        </div>
                    </div>
                    <div className="pl-4 -mt-7">
                        <TextMessage text={errors.todo?.message || ''} size="sm" theme="danger" />
                    </div>
                </form>
            </div>}
        </div>
    )
}