import React from 'react';
import { user } from '../../../Reducks/member/types';
import { MemberActionTableContainer } from '../../../components/uiParts/ActionTableDandD/MemberActionTableContainer';
import { TextMessage } from '../../../components/uiParts/TextMessage';
import {ToolTipsContainer} from '../../uiParts/ToolTips';

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
                <div className="flex flex-col p-2 gap-1">
                    <div className="flex flex-row p-2 gap-1 items-center">
                        <TextMessage text="This is a simple Drag and Drop Table page." size="base" theme="normal" />
                        <ToolTipsContainer text="ドラッグアンドドロップ<br>ドラッグアンドドロップとアクションテーブルを組みわわせて<br>作成しました。" />
                    </div>
                    <MemberActionTableContainer 
                        titleHeader={['id', 'name', 'email', 'position']}
                        items={props.users}
                        updateItems={props.updateUsers} />
                </div>
            </div>}
        </div>

    )
}