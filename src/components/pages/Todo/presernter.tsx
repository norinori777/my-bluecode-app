import { ActionTable } from "../../uiParts/ActionTable/presernter"
import { TextMessage } from "../../uiParts/TextMessage"
import { todo } from "../../../Reducks/todo/types";
import { TodoActionTableContainer } from "../../uiParts/ActionTable";
import { TodoActionTableRowContainer } from "../../uiParts/ActionTableRow";

interface TodoProps {
    todos: todo[]
    loading: boolean
    error: string | null
}


const titleHeader = ['id', 'text']

export const Todo = (props: TodoProps) => {
    return (
        <div className="p-6">
            <TextMessage text="Todo Page" size="2xl" theme="primary" underline={true} /> 
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <TextMessage text="This is a simple todo list page." size="base" theme="normal" />
                <div className="flex flex-row p-2 gap-1">
                    <TodoActionTableContainer titleHeader={titleHeader} items={props.todos} />
                </div>
            </div>}
        </div>
    )
}