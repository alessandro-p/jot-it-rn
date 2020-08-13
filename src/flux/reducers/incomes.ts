import { ActionType, getType } from 'typesafe-actions';
import * as incomes_actions from '../actions/incomes';

export interface IncomesReducerState 
{
    incomes: Income[];
}

export interface Income 
{
    id: string;
    value: number;
    category: string;
    timestamp: number;
}

const INITIAL_STATE: IncomesReducerState = {
    incomes: []
};

const incomes_reducer = (state = INITIAL_STATE, action: ActionType<typeof incomes_actions>): IncomesReducerState => 
{
    switch (action.type)
    {
        case (getType(incomes_actions.add_income)):
            return {
                ...state,
                incomes: [...state.incomes, action.payload.income]
            };
        case (getType(incomes_actions.remove_income)):
            return {
                ...state,
                incomes: [...state.incomes.filter((income) => income.id !== action.payload)]
            };
        default:
            return state;
    }
};

export { incomes_reducer };