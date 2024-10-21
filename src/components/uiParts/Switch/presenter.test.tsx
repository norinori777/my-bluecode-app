import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Switch } from './presenter';

describe('Switch Component', () => {
    test('ラベルが正しく表示されること', () => {
        render(<Switch text="Test Switch" register={{}} />);
        expect(screen.getByText(/Test Switch/i)).toBeInTheDocument();
    });

    test('チェックボックスが表示されること', () => {
        render(<Switch text="Test Switch" register={{}} />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('チェックボックスに正しいクラスがセットされていること', () => {
        render(<Switch text="Test Switch" register={{}} />);
        expect(screen.getByRole('checkbox')).toHaveClass('sr-only peer');
    });

    test('チェックボックスをクリックするとチェック、非チェックが入ること', async() => {
        render(<Switch text="Test Switch" register={{}} />)
        await userEvent.click(screen.getByRole('checkbox'))
        await expect(screen.getByRole('checkbox')).toBeChecked()
        await userEvent.click(screen.getByRole('checkbox'))
        await expect(screen.getByRole('checkbox')).not.toBeChecked()
    });
});