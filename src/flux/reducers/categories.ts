import { ActionType, getType } from 'typesafe-actions';
import * as categories_actions from '../actions/categories';

export interface CategoriesReducerState 
{
    selected_category: string;
}

const INITIAL_STATE: CategoriesReducerState = {
    selected_category: ''
};

const categories_reducer = (state = INITIAL_STATE, action: ActionType<typeof categories_actions>): CategoriesReducerState => 
{
    switch (action.type)
    {
        case (getType(categories_actions.select_category)):
            return {
                ...state,
                selected_category: action.payload
            };
        default:
            return state;
    }
};

export { categories_reducer };