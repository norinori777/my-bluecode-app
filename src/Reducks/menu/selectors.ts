import { createSelector } from 'reselect';
import { RootState } from '../store';

const headerMenuSelector = (state: RootState) => state.menu;

export const headerMenuItems = createSelector(
  [headerMenuSelector],
  (state) => state.headerMenuItems
);