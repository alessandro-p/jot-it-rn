import {combineReducers} from 'redux';

import {categories_reducer, CategoriesReducerState} from './categories';
import {expenses_reducer, ExpensesReducerState} from './expenses';
import {incomes_reducer, IncomesReducerState} from './incomes';

export interface ApplicationState
{
    incomes: IncomesReducerState;
    expenses: ExpensesReducerState;
    categories: CategoriesReducerState;
}

const reducers = combineReducers<ApplicationState>({
    incomes: incomes_reducer,
    expenses: expenses_reducer,
    categories: categories_reducer
});

export default reducers;
