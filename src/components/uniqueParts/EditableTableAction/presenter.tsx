import { Pencil } from "../../icons/Pencil";
import { XCircle } from "../../icons/XCircle";
import { Icon } from "../../uiParts/Icon";

interface EditableTableActionProps<T> {
    target: T;
    handleDelete: () => void;
    handleEdit: () => void;
}

export const EditableTableAction = <T,>(props: EditableTableActionProps<T>) => {

    return (
    <div className="flex flex-row gap-2 cursor-pointer">
      <Icon<T> target={props.target} icon={Pencil} action={props.handleEdit} theme={'primary'} ariaLabel={'Edit Button'} />
      <Icon<T> target={props.target} icon={XCircle} action={props.handleDelete} theme={'primary'} ariaLabel={'Delete Button'} />
    </div>
    )
}