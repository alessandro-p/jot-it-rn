import {ActionType, getType} from 'typesafe-actions';

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
    incomes: [
        {id: '8a8669b9-0fa6-41ab-b84b-1908d6bc450d', category: 'Stipendio', timestamp: 1594598400000, value: 999},
        {id: '8a8669b9-0fa6-41ab-b84b-1908d6bc471d', category: 'Stipendio', timestamp: 1596326400000, value: 999},
        {id: '8a8669b9-0fa6-41ab-b84b-1908d6bc472d', category: 'Nonna', timestamp: 1596585600000, value: 3000},
    ]
};

const incomes_reducer = (state = INITIAL_STATE, action: ActionType<typeof incomes_actions>): IncomesReducerState =>
{
    switch(action.type)
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

export {incomes_reducer};
