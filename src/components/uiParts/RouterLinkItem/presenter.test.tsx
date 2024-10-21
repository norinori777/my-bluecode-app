import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouterLinkItem, RouterLinkItemProps } from './presenter'

describe('RouterLinkItem', () => {
    const defaultProps: RouterLinkItemProps = {
        text: 'Test Link',
        link: '/test',
        select: jest.fn(),
        underline: false,
        theme: 'primary',
        size: 'base',
    }

    it('リンクの文字が正しく表示されること', () => {
        render(
            <Router>
                <RouterLinkItem {...defaultProps} />
            </Router>
        )
        const linkElement = screen.getByTestId('linkItem')
        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveTextContent('Test Link')
    })

    it('リンククリック時にコールバックがコールされること', async() => {
        const selectMock = jest.fn()
        render(
            <Router>
                <RouterLinkItem {...defaultProps} select={selectMock} />
            </Router>
        )
        const linkElement = screen.getByTestId('linkItem')
        await userEvent.click(linkElement)
        await waitFor(() => {
            expect(selectMock).toHaveBeenCalledWith('Test Link')
        })
    })

    it('themeのclassが正しくセットされること', () => {
        render(
            <Router>
                <RouterLinkItem {...defaultProps} theme="danger" size="lg" />
            </Router>
        )
        const linkElement = screen.getByTestId('linkItem')
        expect(linkElement).toHaveClass('font-medium')
        const textMessageElement = screen.getByText('Test Link')
        expect(textMessageElement).toHaveClass('text-danger-dark')
        expect(textMessageElement).toHaveClass('text-lg')
    })

    it('underlineがTrueの場合、アンダーラインのクラスがセットされること', () => {
        render(
            <Router>
                <RouterLinkItem {...defaultProps} underline={true} />
            </Router>
        )
        const textMessageElement = screen.getByText('Test Link')
        expect(textMessageElement).toHaveClass('underline')
    })
})