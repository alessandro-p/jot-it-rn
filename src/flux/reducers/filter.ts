import {ActionType, getType} from 'typesafe-actions';

import * as filter_actions from '../actions/filter';

export interface Filter
{
    from_date: Date;
    to_date: Date;
}

export interface FilterReducerState
{
    from_date: Date | undefined;
    to_date: Date | undefined;
}

const INITIAL_STATE: FilterReducerState = {
    from_date: undefined,
    to_date: undefined
};

const filter_reducer = (state = INITIAL_STATE, action: ActionType<typeof filter_actions>): FilterReducerState =>
{
    switch(action.type)
    {
        case (getType(filter_actions.set_filter)):
            return {
                ...state,
                from_date: action.payload.filter.from_date,
                to_date: action.payload.filter.to_date
            };
        default:
            return state;
    }
};

export {filter_reducer};
