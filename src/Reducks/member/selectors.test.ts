import { memberItems, loadingState, errorState } from './selectors';
import { RootState } from '../store';

describe('member selectors', () => {
    const mockState: RootState = {
        menu: { headerMenuItems: [], selectedMeneItem: { text: '', initialLink: '' } },
        contents: { contentItems: [] },
        counter: { count: 0 },
        fileupload: { file: null, file2: null, loading: false, error: null },
        todo: { todos:[], loading: false, error: null },
        member: {
            searchText: '',
            member: [{ id: 1, position: 'general', name: 'John Doe', email: 'hoge@hoge.co.jp', status: true }],
            loading: false,
            error: null,
        },
        test: { test: "hoge"}
        // other state slices if any
    };

    it('should select member items', () => {
        const selected = memberItems(mockState);
        expect(selected).toEqual([{ id: 1, position: 'general', name: 'John Doe', email: 'hoge@hoge.co.jp', status: true }]);
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