import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LinkItem } from './presenter'

describe('LinkItemのテスト', () => {
    const mockOnClick = jest.fn()

    const defaultProps = {
        text: 'Click me',
        onClick: mockOnClick,
        underline: true,
        theme: 'primary' as const,
        size: 'base' as const,
    }
    const user = userEvent.setup();

    it('リンク文字が正しく表示されること', () => {
        const { getByText } = render(<LinkItem {...defaultProps} />)
        expect(getByText('Click me')).toBeInTheDocument()
    })

    it('クリック時にonClick関数が実行されること', async() => {
        const { getByText } = render(<LinkItem {...defaultProps} />)
        await user.click(getByText('Click me'))
        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('テーマが正しく適用されること', () => {
        const { getByText } = render(<LinkItem {...defaultProps} theme="danger" />)
        expect(getByText('Click me')).toHaveClass('text-danger-dark')
    })

    it('サイズが正しく適用されること', () => {
        const { getByText } = render(<LinkItem {...defaultProps} size="lg" />)
        expect(getByText('Click me')).toHaveClass('text-lg')
    })

    it('アンダーラインが適用されること', () => {
        const { getByText } = render(<LinkItem {...defaultProps} underline={true} />)
        expect(getByText('Click me')).toHaveClass('underline')
    })

    it('アンダーラインが適用されないこと', () => {
        const { getByText } = render(<LinkItem {...defaultProps} underline={false} />)
        expect(getByText('Click me')).not.toHaveClass('underline')
    })
})