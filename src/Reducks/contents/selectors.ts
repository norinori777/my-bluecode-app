import { createSelector } from 'reselect';
import { RootState } from '../store';

const contentsSelector = (state: RootState) => state.contents;

export const contentItems = createSelector(
  [contentsSelector],
  (state) => state.contentItems
);