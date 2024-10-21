import { useNavigate } from "react-router-dom";
import { user } from "../../../Reducks/member/types";
import { BasicTable } from "../../uiParts/BasicTable";
import { TextMessage } from "../../uiParts/TextMessage"
import { LinkWithIcon } from "../../uiParts/LinkWithIcon";
import { TableWithPagination } from "../../uniqueParts/TableWithPagination/presenter";

interface PaginationTableProps {
    memberList: user[];
    loading: boolean;
    error: string | null;
}

const titleHeader = ['id', 'position', 'name', 'email', 'status']

export const PaginationTable = (props: PaginationTableProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/member/add')
    }

    return (
        <div className="p-6">
            <TextMessage text="Pagination Table Member List Page" size="2xl" theme="primary" underline={true} /> 
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <LinkWithIcon theme="primary" text="メンバー追加" action={handleClick} />
                <TextMessage text="This is a simple Pagination Table member list page." size="base" theme="normal" />
                <div className="flex flex-row p-2 gap-1">
                    <TableWithPagination<user> titleHeader={titleHeader} items={props.memberList} itemPerPage={5}  />
                </div>
            </div>}
        </div>
    )
}