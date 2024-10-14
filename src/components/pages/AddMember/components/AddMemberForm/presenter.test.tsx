import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddUserType } from '../../../../../Reducks/member/types'
import { AddMemberForm } from './presenter'

export const Setup = () => {
    const onClickButton = jest.fn()
    const onValid = jest.fn()
    const onInvalid = jest.fn()

    const typeName = async(name:string) => {
        const textbox = screen.getByRole('textbox', {name: /名前/i})
        await userEvent.type(textbox, name)
    }

    const typeNameClear = async() => {
        const textbox = screen.getByRole('textbox', {name: /名前/i})
        await userEvent.clear(textbox)
    }  

    const typeEmail = async(email:string) => {
        const textbox = screen.getByRole('textbox', {name: /メールアドレス/i})
        await userEvent.type(textbox, email)
    }

    const typeEmailClear = async() => {
        const textbox = screen.getByRole('textbox', {name: /メールアドレス/i})
        await userEvent.clear(textbox)
    }

    const noSelectedPosition = async() => {
        const selectbox = screen.getByRole('combobox', {name: /役職選択/i})
        await userEvent.selectOptions(selectbox, '役職を選択してください。')
    }

    const selectPosition = async(position:string) => {
        const selectbox = screen.getByRole('combobox', {name: /役職選択/i})
        await userEvent.selectOptions(selectbox, position)
    }
    
    const checkStatus = async() => {
        const switchbox = screen.getByRole('checkbox', {name: /アクティブ/i})
        await userEvent.click(switchbox)
    }
    
    const clickButton = async() => {
        await userEvent.click(screen.getByRole('button', {name: /追加/i}))
    }

    const user: AddUserType = {name: 'yamada', email: 'yamada@hoge.co.jp' , position: 'admin', status: true}

    render(<AddMemberForm onValid={onValid} onInvalid={onInvalid} name={user.name} email={user.email} position={user.position} status={user.status} />)

    return { typeName, typeNameClear, typeEmail, typeEmailClear, noSelectedPosition, selectPosition, checkStatus, clickButton, onValid, onInvalid }
}


describe('メンバー追加Formのテスト', () => {
    test("名前が未入力で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeNameClear, clickButton } = Setup()
        await typeNameClear()
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Nameの入力は必須です。')).toBeInTheDocument()
        })
    })

    test("名前が2文字以下で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeName, clickButton, typeNameClear } = Setup()
        await typeNameClear()
        await typeName('a')
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Nameは、2文字以上入力してください。')).toBeInTheDocument()
        })
    })

    test("名前が20文字以上で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeName, clickButton, typeNameClear } = Setup()
        await typeNameClear()
        await typeName('aaaaaaaaaaaaaaaaaaaaa')
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Nameは、最大20文字となります。')).toBeInTheDocument()
        })
    })

    test("メールアドレスが未入力で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeEmailClear, clickButton } = Setup()
        await typeEmailClear()
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Emailの入力は必須です。')).toBeInTheDocument()
        })
    })

    test("メールアドレスの形式が不正で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeEmail, clickButton, typeEmailClear } = Setup()
        await typeEmailClear()
        await typeEmail('test')
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Emailの形式が正しくありません。')).toBeInTheDocument()
        })
    })

    test("メールアドレスが100文字以上で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeEmail, clickButton, typeEmailClear } = Setup()
        await typeEmailClear()
        await typeEmail('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@hoge.co.jp')
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Emailは、最大100文字となります。')).toBeInTheDocument()
        })
    })

    test("役職が未選択で追加ボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { clickButton, noSelectedPosition } = Setup()
        await noSelectedPosition()
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Positionは、adminかgeneralを選択してください。')).toBeInTheDocument()
        })
    })

    test("役職がadminの場合、generalに変更できること", async() => {
        const { selectPosition } = Setup()
        await selectPosition('general')
        await waitFor(()=>{
            expect(screen.getByRole('combobox', {name: /役職選択/i})).toHaveValue('general')
        })  
    })

    test("ステータスがtrueの場合、クリックするとfalseになること", async() => {
        const { checkStatus } = Setup()
        await checkStatus()
        await waitFor(()=>{
            expect(screen.getByRole('checkbox', {name: /アクティブ/i})).not.toBeChecked()
        })
    })

    test("適切な文字が入力されている場合、追加ボタンをクリックするとonValidが呼ばれること", async() => {
        const { typeName, typeEmail, selectPosition, checkStatus, clickButton, onValid, onInvalid } = Setup()
        await clickButton()
        await waitFor(()=>{
            expect(onValid).toHaveBeenCalled()
            expect(onInvalid).not.toHaveBeenCalled()
        })
    })

    test("不適切な文字が入力されている場合、追加ボタンをクリックするとonInvalidが呼ばれること", async() => {
        const { typeNameClear, typeEmailClear, noSelectedPosition, clickButton, onValid, onInvalid } = Setup()
        await typeNameClear()
        await typeEmailClear()
        await noSelectedPosition()
        await clickButton()
        await waitFor(()=>{
            expect(onValid).not.toHaveBeenCalled()
            expect(onInvalid).toHaveBeenCalled()
        })
    })
})