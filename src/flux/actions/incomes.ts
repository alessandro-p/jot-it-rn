import { createAction } from 'typesafe-actions';
import { Income } from '../reducers/incomes';

export const add_income = createAction('incomes/create')<{ income: Income }>();
export const remove_income = createAction('incomes/remove')<string>();
