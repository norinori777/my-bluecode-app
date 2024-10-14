import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderTitle } from './presenter';
import { Puzzle } from '../../icons/Puzzle'

describe('HeaderTitleコンポーネントのテスト', () => {
    it('タイトルが正しく表示されること', () => {
        render(<HeaderTitle title="Test Title" theme="primary" icon={Puzzle} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('テーマクラスが正しく表示されること', () => {
        const { container } = render(<HeaderTitle title="Test Title" theme="primary" icon={Puzzle} />);
        expect(screen.getByText('Test Title')).toHaveClass('text-primary-default');
    });
});