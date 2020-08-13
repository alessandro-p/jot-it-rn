import { ActionType, getType } from 'typesafe-actions';
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
    expenses: []
};

const expenses_reducer = (state = INITIAL_STATE, action: ActionType<typeof expenses_actions>): ExpensesReducerState => 
{
    switch (action.type)
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

export { expenses_reducer };