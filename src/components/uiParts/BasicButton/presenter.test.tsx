import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BasicButton, ButtonProps } from './presenter';

describe('BasicButton', () => {
    const defaultProps: ButtonProps = {
        label: 'Click Me',
        theme: 'primary',
        type: 'button',
        action: jest.fn(),
    };
    const user = userEvent.setup();

    it('ボタンのラベルが正しく表示されること', () => {
        render(<BasicButton {...defaultProps} />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('テーマのクラスた正しく適用されること', () => {
        render(<BasicButton {...defaultProps} />);
        const button = screen.getByText('Click Me');
        expect(button).toHaveClass('text-white font-bold py-2 px-4 rounded bg-primary-default hover:bg-primary-dark');
    });

    it('クリックイベントの関数が実行されること', async () => {
        render(<BasicButton {...defaultProps} />);
        const button = screen.getByText('Click Me');
        await user.click(button);
        expect(defaultProps.action).toHaveBeenCalled();
    });
});