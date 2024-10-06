import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {TextMessage} from './presenter';

describe('TextMessageのテスト', () => {
    it('メッセージが正しく表示されること', () => {
        render(<TextMessage text="Hello, World!" theme="primary" size="base" underline={true} />);
        expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    it('スタイルが正しく適用されること', () => {
        render(<TextMessage text="Hello, World!"  theme="primary" size="base" underline={true} />);
        const messageElement = screen.getByText('Hello, World!');
        expect(messageElement).toHaveClass('text-base text-primary-dark underline');
    });
});