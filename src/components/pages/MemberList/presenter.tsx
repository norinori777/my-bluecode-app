import { user } from "../../../Reducks/member/types";
import { BasicTable } from "../../uiParts/BasicTable";
import { TextMessage } from "../../uiParts/TextMessage"

interface MemberListProps {
    memberList: user[];
    loading: boolean;
    error: string | null;
}

const titleHeader = ['id', 'name', 'email']

export const MemberList = (props: MemberListProps) => {

    return (
        <div className="p-6">
            <TextMessage text="Member List Page" size="2xl" theme="primary" underline={true} /> 
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <TextMessage text="This is a simple member list page." size="base" theme="normal" />
                <div className="flex flex-row p-2 gap-1">
                    <BasicTable<user> titleHeader={titleHeader} items={props.memberList} />
                </div>
            </div>}
        </div>
    )
}