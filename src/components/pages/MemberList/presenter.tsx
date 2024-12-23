import { useLocation, useNavigate } from "react-router-dom";
import { user } from "../../../Reducks/member/types";
import { BasicTable } from "../../uiParts/BasicTable";
import { TextMessage } from "../../uiParts/TextMessage"
import { LinkWithIcon } from "../../uiParts/LinkWithIcon";
import { LineChartComponent } from "../../uniqueParts/LineChart";
import { BarChartComponent } from "../../uniqueParts/BarChart";

interface MemberListProps {
    memberList: user[];
    loading: boolean;
    error: string | null;
}

const titleHeader = ['id', 'position', 'name', 'email', 'status']

export const MemberList = (props: MemberListProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        navigate('/member/add',{state: {nextLocationPath: '/member/add', previousLocationPath: location.pathname}})
    }

    return (
        <div className="p-6">
            <TextMessage text="Member List Page" size="2xl" theme="primary" underline={true} /> 
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <LinkWithIcon theme="primary" text="メンバー追加" action={handleClick} />
                <TextMessage text="This is a simple member list page." size="base" theme="normal" />
                <div className="flex flex-row p-2 gap-1">
                    <BasicTable<user> titleHeader={titleHeader} items={props.memberList} />
                </div>
            </div>}
            <LineChartComponent />
            <BarChartComponent />
        </div>
    )
}