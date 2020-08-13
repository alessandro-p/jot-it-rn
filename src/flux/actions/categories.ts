import { createAction } from 'typesafe-actions';

export const select_category = createAction('categories/select')<string>();
