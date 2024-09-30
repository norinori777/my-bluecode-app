import { Pencil } from "../../icons/Pencil";
import { XCircle } from "../../icons/XCircle";
import { Icon } from "../../uiParts/Icon";

interface TableActionProps<T> {
    target: T;
    handleDelete: (target: T) => void;
    handleEdit: (target: T) => void;
}

export const TableAction = <T,>(props: TableActionProps<T>) => {

    return (
    <div className="flex flex-row gap-2 cursor-pointer">
      <Icon<T> target={props.target} icon={Pencil} action={props.handleEdit} theme={'primary'} />
      <Icon<T> target={props.target} icon={XCircle} action={props.handleDelete} theme={'primary'} />
    </div>
    )
}