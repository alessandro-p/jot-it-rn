import { createAction } from 'typesafe-actions';
import { Filter } from '../reducers/filter';

export const set_filter = createAction('filter/set')<{ filter: Filter }>();
