import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { CheckBoxTableAction } from './presenter';

describe('CheckBoxTableAction', () => {
    const handleCheckMock = jest.fn();
    it('チェックボックスが正しくチェックしていること', () => {
        render(<CheckBoxTableAction check={true} handleCheck={() => {}} />);
        expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
    });

    it('チェックイベントのコールバックがコールされること', async () => {
        render(<CheckBoxTableAction check={false} handleCheck={handleCheckMock} />);
        await userEvent.click(screen.getByRole('checkbox'));
        await waitFor(()=>{
            expect(handleCheckMock).toHaveBeenCalledTimes(1);
        })
    })

    it('チェックボックスが正しくチェックされていないこと', () => {
        render(<CheckBoxTableAction check={false} handleCheck={() => {}} />);
        expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
    });

    it('toggles the checkbox state when clicked', async() => {
        let checked = false;
        const handleCheckMock = jest.fn(() => {
            checked = !checked;
        });
        render(<CheckBoxTableAction check={checked} handleCheck={handleCheckMock} />);

        await userEvent.click(screen.getByRole('checkbox'));
        await waitFor(()=>{
            expect(handleCheckMock).toHaveBeenCalledTimes(1);
            expect(checked).toBe(true);
        })

        await userEvent.click(screen.getByRole('checkbox'));
        await waitFor(()=>{
            expect(checked).toBe(false);
        })
    });
});