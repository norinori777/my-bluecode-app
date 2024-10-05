import { memberItems, loadingState, errorState } from './selectors';
import { RootState } from '../store';

describe('member selectors', () => {
    const mockState: RootState = {
        menu: { headerMenuItems: [], selectedMeneItem: { text: '', initialLink: '' } },
        contents: { contentItems: [] },
        counter: { count: 0 },
        todo: { todos:[], loading: false, error: null },
        member: {
            member: [{ id: '1', name: 'John Doe', email: 'hoge@hoge.co.jp' }],
            loading: false,
            error: null,
        },
        // other state slices if any
    };

    it('should select member items', () => {
        const selected = memberItems(mockState);
        expect(selected).toEqual([{ id: '1', name: 'John Doe', email: 'hoge@hoge.co.jp' }]);
    });

    it('should select loading state', () => {
        const selected = loadingState(mockState);
        expect(selected).toBe(false);
    });

    it('should select error state', () => {
        const selected = errorState(mockState);
        expect(selected).toBeNull();
    });
});