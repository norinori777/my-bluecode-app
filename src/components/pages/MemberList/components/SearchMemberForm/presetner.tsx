import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { schema } from "./validators"
import { TextField } from "../../../../uiParts/TextField"
import { TextMessage } from "../../../../uiParts/TextMessage"
import { BasicButton } from "../../../../uiParts/BasicButton"

interface SearchMemberFormProps {
    searchText: string | ''
    onValid: (text: string) => void
    onInvalid: () => void
}

export const SearchMemberForm = (props: SearchMemberFormProps) => {
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            defaultValues: {
                searchText: props.searchText || ''
            },
            resolver: yupResolver(schema())
        }
    )

    const searchTextRegister = register('searchText')

    const onSubmit = (data: any) => {
        props.onValid(data.searchText || '')
    }

    const onSubmitError = (error: any) => {
        props.onInvalid()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onSubmitError)} noValidate>
                <div className="flex flex-row gap-2">
                    <div>
                        <TextField<UseFormRegisterReturn<'searchText'>> id={'name'} label="検索" placeholder="検索文字を入力してください。" theme="primary" description="" register={searchTextRegister} />
                        <div className="pl-4 -mt-4">
                            <TextMessage text={errors.searchText?.message || ''} size="sm" theme="danger" />
                        </div>
                    </div>
                    <div className="mt-7">
                        <BasicButton label="検索" type="submit" theme="primary" />
                    </div>
                </div>
            </form>
        </>
    )
}
