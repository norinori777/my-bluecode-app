import { TextMessage } from "../../uiParts/TextMessage"
import { AddMemberForm } from "./components/AddMemberForm/presenter"
import { AddUserType } from "../../../Reducks/member/types"

interface AddMemberProps {
    error: string | null
    loading: boolean
    onValid: (user: AddUserType) => void
    onInvalid: () => void
}


export const AddMember = (props: AddMemberProps) => {
    return (
        <div className="p-6">
            <TextMessage text="メンバー追加・変更" size="2xl" theme="primary" underline={true} />
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <TextMessage text="メンバーを追加してください。" size="base" theme="normal" />
                <AddMemberForm name={""} email={""} onInvalid={props.onInvalid} onValid={props.onValid}  />
            </div>
            }
        </div>          
    )
}