import {ActionType, getType} from 'typesafe-actions';

import * as expenses_actions from '../actions/expenses';

export interface ExpensesReducerState
{
    expenses: Expense[];
}

export interface Expense
{
    id: string;
    value: number;
    category: string;
    timestamp: number;
}

const INITIAL_STATE: ExpensesReducerState = {
    expenses: [
        {id: '8a8669b9-0fa6-41ab-b84b-2908d6bc450d', category: 'Caffè', timestamp: 1594598400000, value: -1},
        {id: '8a8669b9-0fa6-41ab-b84b-2908d6bc451d', category: 'Gelato', timestamp: 1595203200000, value: -3},
        {id: '8a8669b9-0fa6-41ab-b84b-2908d6bc470d', category: 'Caffè', timestamp: 1596326400000, value: -1},
        {id: '8a8669b9-0fa6-41ab-b84b-2908d6bc471d', category: 'Pizza', timestamp: 1596326400000, value: -12},
        {id: '8a8669b9-0fa6-41ab-b84b-2908d6bc472d', category: 'Caffè', timestamp: 1596585600000, value: -1},
        {id: '8a8669b9-0fa6-41ab-b84b-2908d6bc473d', category: 'Cena', timestamp: 1597276800000, value: -30},
    ]
};

const expenses_reducer = (state = INITIAL_STATE, action: ActionType<typeof expenses_actions>): ExpensesReducerState =>
{
    switch(action.type)
    {
        case (getType(expenses_actions.add_expense)):
            return {
                ...state,
                expenses: [...state.expenses, action.payload.expense]
            };
        case (getType(expenses_actions.remove_expense)):
            return {
                ...state,
                expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)]
            };
        default:
            return state;
    }
};

export {expenses_reducer};
