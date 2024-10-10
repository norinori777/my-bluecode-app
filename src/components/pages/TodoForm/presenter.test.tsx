import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoForm } from './presenter'
import { todo } from '../../../Reducks/todo/types'

export const Setup = () => {
    const onClickButton = jest.fn()
    const onValid = jest.fn()
    const onInvalid = jest.fn()
    
    const typeTodo = async(todo:string) => {
        const textbox = screen.getByRole('textbox', {name: /todo/i})
        await userEvent.type(textbox, todo)
    }

    const typeTodoClear = async() => {
        const textbox = screen.getByRole('textbox', {name: /todo/i})
        await userEvent.clear(textbox)
    }

    const clickButton = async() => {
        await userEvent.click(screen.getByRole('button', {name: /create/i}))
    }

    const todo:todo = {id: 1, text: 'test', done: false}

    render(<TodoForm handleSubmit={onValid} handleError={onInvalid} todo={todo} loading={false} error={''} />)

    return { typeTodo, clickButton, typeTodoClear, onValid, onInvalid }
}

test("Todo文字なしでCreateボタンをクリックするとエラーメッセージが表示されること", async() => {
    const { typeTodoClear, clickButton } = Setup()
    await typeTodoClear()
    await clickButton()
    await waitFor(()=>{
        expect(screen.getByText('Todoの入力は必須です。')).toBeInTheDocument()
    })
})

test("2文字以下のTodo文字を入力してCreateボタンをクリックするとエラーメッセージが表示されること", async() => {
    const { typeTodo, clickButton, typeTodoClear } = Setup()
    await typeTodoClear()
    await typeTodo('aa')
    await clickButton()
    await waitFor(()=>{
        expect(screen.getByText('Todoは、３文字以上入力してください。')).toBeInTheDocument()
    })
})

test("101文字以上のTodo文字を入力してCreateボタンをクリックするとエラーメッセージが表示されること", async() => {
    const { typeTodo, clickButton, typeTodoClear } = Setup()
    await typeTodoClear()
    await typeTodo('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    await clickButton()
    await waitFor(()=>{
        expect(screen.getByText('Todoは、最大１００文字となります。')).toBeInTheDocument()
    })
})

test("適切な文字を入力してCreateボタンをクリックするとhandleSubmitが呼ばれること", async() => {
    const { typeTodo, clickButton, onValid, onInvalid } = Setup()
    await typeTodo('test')
    await clickButton()
    await waitFor(()=>{
        expect(onValid).toHaveBeenCalled()
        expect(onInvalid).not.toHaveBeenCalled()
    })
})

test("不適切な文字の状態でCreateボタンをクリックするとonSubmitErrorが呼ばれること", async() => {
    const { typeTodoClear, clickButton, onValid, onInvalid } = Setup()
    await typeTodoClear()
    await clickButton()
    await waitFor(()=>{
        expect(onValid).not.toHaveBeenCalled()
        expect(onInvalid).toHaveBeenCalled()
    })
})