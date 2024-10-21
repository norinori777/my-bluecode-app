import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { EditableTableAction } from './presenter';
import { Pencil } from '../../icons/Pencil';
import { XCircle } from '../../icons/XCircle';

describe('EditableTableAction', () => {
    const mockHandleDelete = jest.fn();
    const mockHandleEdit = jest.fn();
    const target = { id: 1, name: 'Test' };

    it('Iconが表示されること', () => {
        render(
            <EditableTableAction
                target={target}
                handleDelete={mockHandleDelete}
                handleEdit={mockHandleEdit}
            />
        );

        expect(screen.getByRole('img', {name: 'Pencil Icon'})).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'Delete Icon'})).toBeInTheDocument();
    });

    it('編集ICONをクリック時にコールバック関数がコールされること', async () => {
        const { getByTestId } = render(
            <EditableTableAction
                target={target}
                handleDelete={mockHandleDelete}
                handleEdit={mockHandleEdit}
            />
        );

        await userEvent.click(screen.getByRole('button', {name: 'Edit Button'}));
        await waitFor(() => {
            expect(mockHandleEdit).toHaveBeenCalled();
        })
    });

    it('削除アイコンをクリック時にコールバック関数がコールされること', async() => {
        const { getByTestId } = render(
            <EditableTableAction
                target={target}
                handleDelete={mockHandleDelete}
                handleEdit={mockHandleEdit}
            />
        );

        await userEvent.click(screen.getByRole('button', {name: 'Delete Button'}));
        await waitFor(() => {
            expect(mockHandleDelete).toHaveBeenCalled();
        })
    });
});