import React from 'react';
import { user } from '../../../Reducks/member/types';
import { MemberActionTableContainer } from '../../../components/uiParts/ActionTableDandD/MemberActionTableContainer';
import { TextMessage } from '../../../components/uiParts/TextMessage';

interface DragAndDropProps {
    users: user[]
    loading: boolean
    error: string | null
    updateUsers: (users: user[]) => void
}


export const DragAndDrop = (props: DragAndDropProps) => {

    return (
        <div className="p-6">
            <TextMessage text="Drag and Drop Page" size="2xl" theme="primary" underline={true} /> 
            <TextMessage text={props.error !== null ? props.error : ''} size="base" theme="danger" />
            {props.loading ? <div>Loading...</div> : 
            <div className="p-2">
                <TextMessage text="This is a simple Drag and Drop Table page." size="base" theme="normal" />
                <div className="flex flex-row p-2 gap-1">
            <MemberActionTableContainer 
                titleHeader={['id', 'name', 'email', 'position']}
                items={props.users}
                updateItems={props.updateUsers} />
            </div>
            </div>}
        </div>

    )
}