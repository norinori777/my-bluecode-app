import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { TextField } from './presenter';
import { theme } from '../../../utils/theme/types';

const mockRegister = jest.fn();

describe('TextField Component', () => {
    const props = {
        id: 'test-id',
        label: 'Test Label',
        placeholder: 'Test Placeholder',
        description: 'Test Description',
        theme: 'primary' as theme,
        register: mockRegister,
    }

    it('テキストフィールドが表示されること', () => {
        render(<TextField {...props} />);
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('文字が入力できること', async() => {
        render(<TextField {...props} />)
        const input = screen.getByRole('textbox')
        await userEvent.type(input, 'test')
        await waitFor(()=>{
            expect(input).toHaveValue('test')
        })
    })
    it('文字がクリアできること', async() => {
        render(<TextField {...props} />)
        const input = screen.getByRole('textbox')
        await userEvent.clear(input)
        await waitFor(()=>{
            expect(input).toHaveValue('')
        })
    })
})