import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { schema } from "./validators"
import { TextField } from "../../../../uiParts/TextField"
import { TextMessage } from "../../../../uiParts/TextMessage"
import { BasicButton } from "../../../../uiParts/BasicButton"
import {DateTimePicker} from "../../../../uiParts/DateTimePicker"

interface SearchMemberFormProps {
    searchText: string | ''
    startDate: Date | null
    endDate: Date | null
    onValid: (text: string, startDate: string, endDate: string) => void
    onInvalid: () => void
}

export const SearchMemberForm = (props: SearchMemberFormProps) => {
    const { register, handleSubmit, watch, setValue, formState: {errors} } = useForm(
        {
            defaultValues: {
                searchText: props.searchText || '',
                startDate: props.startDate || undefined,
                endDate: props.endDate || undefined,
            },
            resolver: yupResolver(schema())
        }
    )

    const searchTextRegister = register('searchText')
    const startDateRegister = register('startDate')
    const endDateRegister = register('endDate')

    const onSubmit = (data: any) => {
        props.onValid(data.searchText || '', data.startDate, data.endDate)
    }

    const onSubmitError = (error: any) => {
        props.onInvalid()
    }

     // フィールドの値を監視
     const watchAllFields = watch()

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onSubmitError)} noValidate>
                <div className="flex flex-col">
                    <div>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col">
                                <DateTimePicker 
                                    id={'startDate'} 
                                    label="開始日" 
                                    placeholder="開始日を選択してください。" theme="primary" 
                                    description=""
                                    register={startDateRegister}
                                    setValue={setValue} />
                                <div className="pl-4 -mt-4">
                                    <TextMessage text={errors.startDate?.message || ''} size="sm" theme="danger" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <DateTimePicker 
                                    id={'endDate'} 
                                    label="終了日" 
                                    placeholder="終了日を選択してください。" theme="primary" 
                                    description=""
                                    register={endDateRegister}
                                    setValue={setValue} />
                                <div className="pl-4 -mt-4">
                                    <TextMessage text={errors.endDate?.message || ''} size="sm" theme="danger" />
                                </div>
                            </div>
                        </div>
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
