import { createAction } from 'typesafe-actions';
import { Expense } from '../reducers/expenses';

export const add_expense = createAction('expenses/create')<{ expense: Expense }>();
export const remove_expense = createAction('expenses/remove')<string>();
