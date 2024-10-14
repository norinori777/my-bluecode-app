import React from 'react'
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { schema } from "./validator"
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '../../../../uiParts/TextField'
import { TextMessage } from '../../../../uiParts/TextMessage'
import { BasicButton } from '../../../../uiParts/BasicButton'
import { Selectbox } from '../../../../uiParts/Selectbox/presenter'
import { Switch } from '../../../../uiParts/Switch/presenter'
import { AddUserType } from '../../../../../Reducks/member/types'

interface AddMemberFormProps {
    name?: string | null
    email?: string | null
    position?: string | null
    status?: boolean | null
    onValid: (user: AddUserType) => void
    onInvalid: () => void
}

export const AddMemberForm = (props: AddMemberFormProps) => {
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            defaultValues: {
                name: props.name || '',
                email: props.email || '' ,
                position: props.position || undefined,
                status: props.status || undefined
            },
            resolver: yupResolver(schema)
        }
    )

    const nameRegister = register('name')
    const emailRegister = register('email')
    const positionRegister = register('position')
    const statusRegister = register('status')

    const onSubmit = (data:any) => {
        props.onValid({name: data.name, email: data.email, position: data.position, status: data.status})   
    }

    const onSubmitError = (error: any) => {
        props.onInvalid()
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onSubmitError)} noValidate>
                <div className="flex flex-col gap-4">
                    <div>
                        <Selectbox<UseFormRegisterReturn<'position'>> label={"役職選択"} items={[{text: 'admin', value: 'admin'}, {text: 'general', value: 'general'}]} noneSelectedText="役職を選択してください。" register={positionRegister} />
                        <div className="pl-4 mt-2">
                            <TextMessage text={errors.position?.message || ''} size="sm" theme="danger" />
                        </div>
                    </div>
                    <div>
                        <TextField<UseFormRegisterReturn<'name'>> id={'name'} label="名前" value={props.name || ""} placeholder="名前を入力してください。" theme="primary" description="" register={nameRegister} />
                        <div className="pl-4 -mt-4">
                            <TextMessage text={errors.name?.message || ''} size="sm" theme="danger" />
                        </div>
                    </div>
                    <div>
                        <TextField<UseFormRegisterReturn<'email'>> id={'email'} label="メールアドレス" value={props.email || ""} placeholder="メールアドレスを入力してください。" theme="primary" description="" register={emailRegister} />
                        <div className="pl-4 -mt-4">
                            <TextMessage text={errors.email?.message || ''} size="sm" theme="danger" />
                        </div>

                    </div>
                    <div>
                        <Switch<UseFormRegisterReturn<'status'>> text="アクティブ" register={statusRegister} />
                        <div className="pl-4 mt-2">
                            <TextMessage text={errors.status?.message || ''} size="sm" theme="danger" />
                        </div>
                    </div>
                    <div className="mt-7">
                        <BasicButton label="追加" type="submit" theme="primary" />
                    </div>
                </div>
            </form>
        </>
    )
}